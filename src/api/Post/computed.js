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
			.count(),

		commentCount:  parent => prisma.commentsConnection({
				where: { post: { id: parent.id } }
			})
				.aggregate()
				.count(),
		user: ({ id }) => prisma.post({ id }).user(),
		files: ({ id }) => prisma.post({ id }).files(),
		comments: ( {id} ) => prisma.post( { id }).comments(),
		likes: ( {id} ) => prisma.post( { id }).likes()
	},

}
