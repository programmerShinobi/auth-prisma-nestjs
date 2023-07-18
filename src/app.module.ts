import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from 'prisma/prisma.module';
@Module({
  imports: [AuthModule, UsersModule, PostsModule, PrismaModule]
})
export class AppModule {}
