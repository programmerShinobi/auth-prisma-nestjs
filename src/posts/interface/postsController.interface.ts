import { Response } from 'express';
import { CreatePostParamsDto } from '../dto/create/createPosts.dto';  
import PostsControllerDto from '../dto/postsController.dto';

export default interface PostControllerInterface {
  createPost(dto: CreatePostParamsDto, userEmail: string, res: Response): Promise<Response<PostsControllerDto>> ;
  getPosts(res: Response, search: string, page: number, limit: number): Promise<Response<PostsControllerDto>>;
  getPostById( postId: string, res: Response): Promise<Response<PostsControllerDto>>;
  publishPost(postId: string, userId: string, res: Response): Promise<Response<PostsControllerDto>>;
  deletePost(postId: string,  userId: string, res: Response): Promise<Response<PostsControllerDto>>;
}
