import { Response } from 'express';
import { CreatePostDto } from '../dto/posts.dto'; 

export default interface PostControllerInterface {
  createPost(dto: CreatePostDto, res: Response): Promise<any>;
  getPaginatedPosts(res: Response): Promise<any>;
  getFilteredPosts(searchString: string, res: Response): Promise<any>;
  getPostById(id: string, res: Response): Promise<any>;
  publishPost(id: string, res: Response): Promise<any>;
  deletePost(id: string, res: Response): Promise<any>;
}
