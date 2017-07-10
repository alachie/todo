import express    from 'express'
import mongoose   from 'mongoose'
import bodyParser from 'body-parser'
import cors       from 'cors'
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';

const app = express();

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`🚫  → ${err.message}`);
});
mongoose.connection.on('connected', () => {
	console.log('✅  connected to database');
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send("hello");
})

const typeDefs = `
	type Todo {
		id: Int!
		title: String!
		completed: Boolean
	}
	type Query {
		hi(name: String): String!
		hello: String!
		todos: [Todo]
	}
`;

const resolvers = {
	Query: {
		hi: (parent, { name }) => (name) ? `👋🏻 ${name}` : `👋🏻🌏`,
		todos: () => [{id: 10, title: 'hello', completed: false}]
	},
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

app.use(
	'/graphiql', 
	graphiqlExpress({
		endpointURL: '/gql',
	})
);

app.use(
	'/gql', 
	bodyParser.json(), 
	graphqlExpress({ schema })
);

app.listen(8082, () => {
	console.log("http://localhost:" + 8082)
})