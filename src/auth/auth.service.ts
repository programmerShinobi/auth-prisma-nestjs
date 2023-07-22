import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ItemAuthDto } from './dto/items/itemAuth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';
import AuthServiceInterface from './interface/authService.interface';
import { SignupDto } from './dto/signup/signup.dto';
import { SigninDto } from './dto/signin/signIn.dto';

@Injectable()
export class AuthService implements AuthServiceInterface{
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(dto: SignupDto): Promise<ItemAuthDto> {
    const { name, email, password } = dto;
    try {
      const userExists = await this.prisma.user.findUnique({
        where: { email },
      });
  
      if (userExists) throw new BadRequestException('Email already exists');
  
      const hashedPassword = await this.hashPassword(password);
  
      const result: ItemAuthDto = await this.prisma.user.create({
        data: {
          name,
          email,
          hashedPassword,
        },
      });

      if (!result) throw new BadRequestException();
      return result;

    } catch (err) {
      throw new BadRequestException(err.response);
    }
  }

  async signin(dto: SigninDto): Promise<ItemAuthDto> {
    const { email, password } = dto;

    const foundUser: ItemAuthDto = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!foundUser) throw new BadRequestException('Wrong credentials (email)');

    const compareSuccess = await this.comparePasswords({
      password,
      hash: foundUser.hashedPassword,
    });

    if (!compareSuccess) throw new BadRequestException('Wrong credentials (password)');

    return foundUser;
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: { hash: string; password: string }): Promise<string> {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { userId: string; email: string }): Promise<string> {
    const payload = {
      id: args.userId,
      email: args.email,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: jwtSecret,
    });
    
    return token;
  }
}
