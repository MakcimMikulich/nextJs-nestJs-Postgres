import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) {}

  // get list of all users
  async findAll(): Promise<UsersEntity[]> {
    console.log(this.usersRepo.find);

    return await this.usersRepo.find();
  }

  async countUsers(): Promise<number> {
    return this.usersRepo.count();
  }

  async findUsersByPage(page: number, limit: number): Promise<{ users: UsersEntity[]; totalPages: number }> {
    console.log(page);
    const skip = (page - 1) * limit;
    const users = await this.usersRepo.find({ skip, take: limit });
    const totalUsers = await this.countUsers();
    const totalPages = Math.ceil(totalUsers / limit);
    return { users, totalPages };
  }
}
