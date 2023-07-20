import { Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import AuthControllerInterface from './interface/authController.interface';

@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController implements AuthControllerInterface {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: AuthDto, @Res() res: Response): Promise<any> {
    return this.authService.signup(dto, res);
  }

  @Post('signin')
  async signin(@Req() req: Request, @Res() res: Response, @Body() dto: AuthDto): Promise<any> {
    return this.authService.signin(dto, req, res);
  }

  @Get('signout')
  async signout(@Req() req: Request, @Res() res: Response): Promise<any>{
    return this.authService.signout(req, res);
  }
}
