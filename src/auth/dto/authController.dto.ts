import { IsObject, IsString } from "class-validator";

export class AuthControllerDto {
  @IsString()
  message: string;

  @IsObject()
  data: object;
}