import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserSettingsDto } from './dto/update-user-setting.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async find() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getUserById(id);
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.usersService.createUser(data);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.usersService.updateUserById(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return await this.usersService.deleteUserById(id);
  }

  @Patch(':id/settings')
  async updateSettings(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserSettingsDto,
  ) {
    return await this.usersService.updateUserSetting(id, data);
  }
}
