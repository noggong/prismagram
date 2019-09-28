import { prisma } from "../../../../generated/prisma-client";

export default {
	Query: {
			seeUser: async (_, args) => {
				return {
					user: await prisma.user({id: args.id}),
					posts: await prisma.user({id: args.id}).posts(),
			}
		}
	}
}
