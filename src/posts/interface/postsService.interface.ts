import { CreatePostDto } from '../dto/create/createPosts.dto';
import { GetPostsFunction } from '../dto/get/getPosts.dto';
import { ItemPostDto } from '../dto/items/itemsPost.dto';

export default interface PostServiceInterface {
  createPost(dto: CreatePostDto, userEmail: string): Promise<ItemPostDto>;
  getPosts(search: string, page: number, limit: number): Promise<GetPostsFunction>;
  getPostById(postId: string): Promise<ItemPostDto>;
  publishPost(postId: string, userId: string): Promise<ItemPostDto>;
  deletePost(postId: string, userId: string): Promise<ItemPostDto>;
}