import { Response } from "express";
import { SignupDto } from "../dto/signup/signup.dto";
import { AuthControllerDto } from "../dto/authController.dto";
import { SigninDto } from "../dto/signin/signIn.dto";

export default interface AuthControllerInterface {
  signup(dto: SignupDto, res: Response): Promise<Response<AuthControllerDto>>;
  signin(res: Response, dto: SigninDto): Promise<Response<AuthControllerDto>>;
  signout(res: Response): Promise<Response>;
}