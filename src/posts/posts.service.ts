import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: Prisma.PostCreateWithoutUserInput) {
    const newPost = await this.prisma.post.create({
      data: {
        ...data,
        userId,
      },
    });

    return newPost;
  }

  async createGroupPost(
    userId: number[],
    data: Prisma.GroupPostCreateWithoutUsersInput,
  ) {
    return await this.prisma.groupPost.create({
      data: {
        ...data,
        users: {
          create: userId.map((userId) => ({ userId })),
        },
      },
    });
  }

  async getGroup() {
    return await this.prisma.groupPost.findMany({
      include: {
        users: {
          select: {
            user: true,
          },
        },
      },
    });
  }
}
