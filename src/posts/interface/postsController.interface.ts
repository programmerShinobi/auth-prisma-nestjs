import { Request, Response } from 'express';
import { CreatePostDto } from '../dto/create/createPosts.dto';  
import PostsControllerDto from '../dto/postsController.dto';


export default interface PostControllerInterface {
  createPost(dto: CreatePostDto, res: Response): Promise<Response<PostsControllerDto>> ;
  getPaginatedPosts(res: Response): Promise<Response<PostsControllerDto>>;
  getFilteredPosts(searchString: string, res: Response): Promise<Response<PostsControllerDto>>;
  getPostById( idPost: string, res: Response): Promise<Response<PostsControllerDto>>;
  publishPost(idPost: string, req: Request, res: Response): Promise<Response<PostsControllerDto>>;
  deletePost(idPost: string, req: Request, res: Response): Promise<Response<PostsControllerDto>>;
}
