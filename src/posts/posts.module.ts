import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, JwtStrategy]
})
export class PostsModule {}
