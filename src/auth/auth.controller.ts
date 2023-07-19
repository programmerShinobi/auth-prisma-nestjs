import { Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';

interface AuthControllerInterface {
  signup(dto: AuthDto, res: Response): Promise<void>;
  signin(req: Request, res: Response, dto: AuthDto): Promise<void>;
  signout(req: Request, res: Response): Promise<void>;
}

@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController implements AuthControllerInterface {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: AuthDto, @Res() res: Response): Promise<void> {
    await this.authService.signup(dto, res);
  }

  @Post('signin')
  async signin(@Req() req: Request, @Res() res: Response, @Body() dto: AuthDto): Promise<void> {
    await this.authService.signin(dto, req, res);
  }

  @Get('signout')
  async signout(@Req() req: Request, @Res() res: Response): Promise<void>{
    await this.authService.signout(req, res);
  }
}
