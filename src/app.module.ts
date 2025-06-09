import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, PostsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
