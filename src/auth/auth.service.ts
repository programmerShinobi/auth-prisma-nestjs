import { Injectable } from '@nestjs/common';
import { retry } from 'rxjs';

@Injectable()
export class AuthService {
  constructor() { }
  async signup() {
    return { message: "Successfull" };
  }

  async signin() {
    return { message: "Wellcome.." };
  }

  async signout() {
    return { message: "See you.." };
  }
}
