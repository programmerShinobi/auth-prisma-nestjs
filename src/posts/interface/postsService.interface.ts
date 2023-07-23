import { CreatePostDto } from '../dto/create/createPosts.dto';
import { GetPosts } from '../dto/get/getPosts.dto';
import { ItemPostDto } from '../dto/items/itemsPost.dto';

export default interface PostServiceInterface {
  createPost(dto: CreatePostDto, userEmail: string): Promise<ItemPostDto>;
  getPosts(search: string, page: number, limit: number): Promise<GetPosts>;
  post(postId: string): Promise<ItemPostDto>;
  publishPost(postId: string, userId: string): Promise<ItemPostDto>;
  deletePost(postId: string, userId: string): Promise<ItemPostDto>;
}