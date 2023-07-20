import { AuthDto } from "../dto/auth.dto";
import { Request, Response } from "express";

export default interface AuthServiceInterface {
  signup(dto: AuthDto, res: Response): Promise<any>;
  signin(dto: AuthDto, req: Request, res: Response): Promise<any>;
  signout(req: Request, res: Response): Promise<any>;
  hashPassword(password: string): Promise<string>;
  comparePasswords(args: { hash: string; password: string }): Promise<string>;
  signToken(args: { userId: string; email: string }): Promise<string>; 
}