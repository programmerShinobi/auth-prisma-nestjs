import { Response } from 'express';
import { CreatePostDto } from '../dto/create/createPosts.dto';
import { GetPosts } from '../dto/get/getPosts.dto';
import { ItemPostDto } from '../dto/items/itemsPost.dto';

export default interface PostServiceInterface {
  createPost(dto: CreatePostDto, userEmail: string): Promise<ItemPostDto>;
  getPaginatedPosts(page: number, limit: number): Promise<GetPosts>
  getFilteredPosts(page: number, limit: number, searchString: string): Promise<GetPosts>
  post(postId: string): Promise<ItemPostDto>;
  publishPost(postId: string, userId: string): Promise<ItemPostDto>;
  deletePost(postId: string, userId: string): Promise<ItemPostDto>;
}