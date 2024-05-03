import { UserService } from './users.service';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UsersResponseDto } from './users.response.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    this.logger.log('Get all users');
    const users = await this.userService.findAll();
    return users.map((user) => UsersResponseDto.fromUsersEntity(user));
  }

  @Get('pages')
  async getUsersByPage(@Query('page') page: number = 1, @Query('limit') limit: number = 1) {
    this.logger.log(`Get users by page: ${page} and limit: ${limit}`);

    const { users, totalPages } = await this.userService.findUsersByPage(page, limit);
    const usersData = users.map((user) => UsersResponseDto.fromUsersEntity(user));
    return { usersData, totalPages };
  }
}
