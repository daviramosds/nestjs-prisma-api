import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { CreateGroupPostDTO } from './dto/create-group-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() { userId, ...data }: CreatePostDTO) {
    return this.postsService.create(userId, data);
  }

  @Post('group')
  async createGroup(@Body() { userId, ...data }: CreateGroupPostDTO) {
    return await this.postsService.createGroupPost(userId, data);
  }

  @Get('group')
  async getGroup() {
    return await this.postsService.getGroup();
  }
}
