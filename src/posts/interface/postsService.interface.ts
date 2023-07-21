import { Response } from 'express';
import { CreatePostDto } from '../dto/create/createPosts.dto';
import { GetPosts } from '../dto/get/getPosts.dto';
import { ItemPostDto } from '../dto/items/itemsPost.dto';

export default interface PostServiceInterface {
  createPost(dto: CreatePostDto, res: Response): Promise<any>;
  getPaginatedPosts(page: number, limit: number): Promise<GetPosts>
  getFilteredPosts(page: number, limit: number, searchString: string): Promise<GetPosts>
  post(idString: string): Promise<ItemPostDto>;
  publishPost(idString: string): Promise<any>;
  deletePost(idString: string): Promise<any>;
}