import {
  Controller,
  Post,
  Body
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string; hashedPassword: string },
  ): Promise<UserModel> {
    return this.usersService.createUser(userData);
  }
}
