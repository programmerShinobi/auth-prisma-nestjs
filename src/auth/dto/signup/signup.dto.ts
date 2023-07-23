import { IsNotEmpty, IsString, IsEmail, Length, IsStrongPassword } from 'class-validator';

export class SignupParamsDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
  public password: string;
  
}
