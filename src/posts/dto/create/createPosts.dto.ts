import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePostParamsDto {
  @IsNotEmpty()
  @IsString()    
  @Length(20, 50, { message: 'Title has to be at between 20 and 50 chars' })
  title: string;

  @IsString()
  @Length(20, 1000, { message: 'Content has to be at between 20 and 1000 chars' })
  content?: string;
}
