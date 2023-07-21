import { Response } from 'express';
import { CreatePostDto } from '../dto/create/createPosts.dto';  
import PostsControllerDto from '../dto/postsController.dto';


export default interface PostControllerInterface {
  createPost(dto: CreatePostDto, res: Response): Promise<Response<PostsControllerDto>> ;
  getPaginatedPosts(res: Response): Promise<Response<PostsControllerDto>>;
  getFilteredPosts(searchString: string, res: Response): Promise<Response<PostsControllerDto>>;
  getPostById(id: string, res: Response): Promise<Response<PostsControllerDto>>;
  publishPost(id: string, res: Response): Promise<Response<PostsControllerDto>>;
  deletePost(id: string, res: Response): Promise<Response<PostsControllerDto>>;
}
