import { Response } from "express";
import { SignupParamsDto } from "../dto/signup/signup.dto";
import { AuthControllerDto } from "../dto/authController.dto";
import { SigninParamsDto } from "../dto/signin/signIn.dto";

export default interface AuthControllerInterface {
  signup(dto: SignupParamsDto, res: Response): Promise<Response<AuthControllerDto>>;
  signin(res: Response, dto: SigninParamsDto): Promise<Response<AuthControllerDto>>;
  signout(res: Response): Promise<Response>;
}