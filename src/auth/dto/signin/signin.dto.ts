import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SigninParamsDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
  
}
