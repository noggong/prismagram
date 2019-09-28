import { prisma } from "../../../generated/prisma-client";

export default {
	Post: {
		isLiked: (parent, _, { request }) => prisma.$exists.like({
			AND: [
				{ user: { id: request.user.id } },
				{ post: { id: parent.id } }
			]
		}),

		likeCount: parent => prisma.likesConnection({
			where: { post: { id: parent.id } }
		})
			.aggregate()
			.count()
	}
}
