import "./env.js"
import { GraphQLServer } from "graphql-yoga";
import { prisma } from "../generated/prisma-client"
import logger from "morgan";
import { passport } from "passport";
import schema from "./schema";
import "./passport";
import { authenticationJwt } from "./passport";

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({
	schema,
	context: ({request}) => ({ request }) });


server.express.use(logger("dev"));
server.express.use(authenticationJwt);

server.start({ port: PORT}, () => {
	console.log(`Server running on port ${PORT}`);
})


