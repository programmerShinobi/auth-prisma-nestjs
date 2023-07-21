
import { Request, Response } from "express";
import { SignupDto } from "../dto/signup/signup.dto";
import { SigninDto } from "../dto/signin/signIn.dto";
import { ItemAuthDto } from "../dto/items/itemAuth.dto";

export default interface AuthServiceInterface {
  signup(dto: SignupDto): Promise<ItemAuthDto>;
  signin(dto: SigninDto): Promise<ItemAuthDto>;
  hashPassword(password: string): Promise<string>;
  comparePasswords(args: { hash: string; password: string }): Promise<string>;
  signToken(args: { userId: string; email: string }): Promise<string>; 
}