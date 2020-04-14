import { CommonStruct, Blog, Post, Comment } from '../substrate/interfaces';
import { CommonContent, BlogContent, PostContent, CommentContent } from '../offchain'

// TODO refactor this class to a type. No sense in a class anymore, such as 'struct' and 'content' are now public.
export abstract class CommonData<S extends CommonStruct, C extends CommonContent> {

  public struct?: S

  public content?: C

  constructor (struct?: S, content?: C) {
    this.struct = struct
    this.content = content
  }
}

export class BlogData extends CommonData<Blog, BlogContent> {}
export class PostData extends CommonData<Post, PostContent> {}
export class CommentData extends CommonData<Comment, CommentContent> {}
