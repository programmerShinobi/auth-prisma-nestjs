import { SignupParamsDto } from "../dto/signup/signup.dto";
import { SigninParamsDto } from "../dto/signin/signIn.dto";
import { ItemAuthDto } from "../dto/items/itemAuth.dto";

export default interface AuthServiceInterface {
  signup(dto: SignupParamsDto): Promise<ItemAuthDto>;
  signin(dto: SigninParamsDto): Promise<ItemAuthDto>;
  hashPassword(password: string): Promise<string>;
  comparePasswords(args: { hash: string; password: string }): Promise<string>;
  signToken(args: { userId: string; email: string }): Promise<string>; 
}