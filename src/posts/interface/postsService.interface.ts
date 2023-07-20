import { Response } from 'express';
import { CreatePostDto } from '../dto/posts.dto';

export default interface PostServiceInterface {
  createPost(
    dto: CreatePostDto,
    res: Response
  ): Promise<any>;
  getPaginatedPosts(
    page: number,
    limit: number,
    res: Response
  ): Promise<any>;
  getFilteredPosts(
    page: number,
    limit: number,
    searchString: string,
    res: Response
  ): Promise<any>;
  post(
    idString: string,
    res: Response
  ): Promise<any>;
  publishPost(
    idString: string,
    res: Response
  ): Promise<any>;
  deletePost(idString: string, res: Response): Promise<any>;
}