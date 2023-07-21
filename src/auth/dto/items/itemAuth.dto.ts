import { IsDate, IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUUID } from "class-validator";

export class ItemAuthDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  hashedPassword: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updateAt: Date;
}