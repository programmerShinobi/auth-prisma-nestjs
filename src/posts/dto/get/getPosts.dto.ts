import { IsArray, IsNumber } from "class-validator";
import { ItemPostDto } from "../items/itemsPost.dto";

export class GetPosts {
  @IsArray()
  items: ItemPostDto[];

  @IsNumber()
  totalItems: number;
  
  @IsNumber()
  pageCount: number;
}