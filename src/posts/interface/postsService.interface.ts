import { CreatePostParamsDto } from '../dto/create/createPosts.dto';
import { GetPostsFunctionDto, GetPostsParamsDto } from '../dto/get/getPosts.dto';
import { ItemPostDto } from '../dto/items/itemsPost.dto';

export default interface PostServiceInterface {
  getPosts(dto: GetPostsParamsDto): Promise<GetPostsFunctionDto>;
  getPostById(postId: string): Promise<ItemPostDto>;
  createPost(dto: CreatePostParamsDto, userEmail: string): Promise<ItemPostDto>;
  publishPost(postId: string, userId: string): Promise<ItemPostDto>;
  deletePost(postId: string, userId: string): Promise<ItemPostDto>;
}