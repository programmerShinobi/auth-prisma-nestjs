import { IsArray, IsNumber } from "class-validator";
import { ItemPostDto } from "../items/itemsPost.dto";

export class GetPostsFunction {
  @IsArray()
  items: ItemPostDto[];

  @IsNumber()
  totalItems: number;
  
  @IsNumber()
  pageCount: number;
}