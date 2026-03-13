import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PostRepository {
  async createPost(userId: number, title: string, description: string) {
    return prisma.post.create({
      data: { title, description, userId },
    });
  }

  async getFeed() {
    return prisma.post.findMany({
      orderBy: { postedAt: 'desc' },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, username: true },
        },
        likes: true,
        comments: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true } },
          },
        },
        files: true,
      },
    });
  }

  async getPostById(id: number) {
    return prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, username: true },
        },
        likes: true,
        comments: true,
        files: true,
      },
    });
  }

  async getPostByAuthorAndId(id: number, userId: number) {
    return prisma.post.findFirst({
      where: { id, userId },
    });
  }

  async deletePost(id: number) {
    return prisma.post.delete({ where: { id } });
  }

  async addComment(
    userId: number,
    postId: number,
    text: string,
    parentId?: number | null,
  ) {
    return prisma.postComment.create({
      data: { postId, text, userId, parentId: parentId || null },
    });
  }

  async findLike(postId: number, userId: number) {
    return prisma.postLike.findUnique({
      where: { postId_userId: { postId, userId } },
    });
  }

  async addLike(postId: number, userId: number) {
    return prisma.postLike.create({ data: { postId, userId } });
  }

  async removeLike(likeId: number) {
    return prisma.postLike.delete({ where: { id: likeId } });
  }
}

export const postRepository = new PostRepository();
