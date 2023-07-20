import { Request, Response } from "express";
import { AuthDto } from "../dto/auth.dto";

export default interface AuthControllerInterface {
  signup(dto: AuthDto, res: Response): Promise<any>;
  signin(req: Request, res: Response, dto: AuthDto): Promise<any>;
  signout(req: Request, res: Response): Promise<any>;
}