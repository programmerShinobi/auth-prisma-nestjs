import { IsObject, IsString } from "class-validator";

export default class PostsControllerDto {
  @IsString()
  message: string;

  @IsObject()
  data: object;
}