import { Response } from 'express';
import { CreatePostDto } from '../dto/create/createPosts.dto';
import { GetPosts } from '../dto/get/getPosts.dto';
import { ItemPostDto } from '../dto/items/itemsPost.dto';

export default interface PostServiceInterface {
  createPost(dto: CreatePostDto, res: Response): Promise<ItemPostDto>;
  getPaginatedPosts(page: number, limit: number): Promise<GetPosts>
  getFilteredPosts(page: number, limit: number, searchString: string): Promise<GetPosts>
  post(idPost: string): Promise<ItemPostDto>;
  publishPost(idPost: string, idUser: string): Promise<ItemPostDto>;
  deletePost(idPost: string, idUser: string): Promise<ItemPostDto>;
}