import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
	Query: {
		seeRoom: async(_, args, { request, isAuthenticated }) => {
			console.log("Start")
			isAuthenticated(request);
			console.log("1")
			const { id } = args;
			const { user } = request;
			console.log("2")
			const canSee = await prisma.$exists.room({
				participants_some: {
					id: user.id
				}
			});
			console.log("3")
			if (canSee) {
				console.log("4")
				return prisma.room({ id }).$fragment(ROOM_FRAGMENT);
			} else {
				throw new Error("You can`t see this");
			}

		}
	}
}
