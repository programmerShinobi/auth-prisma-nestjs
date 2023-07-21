import { IsBoolean, IsString, IsUUID } from "class-validator";

export class ItemPostDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  published: boolean;

  @IsString()
  @IsUUID()
  authorId: string;

  @IsString()
  createdAt: Date;

  @IsString()
  updateAt: Date;
}
