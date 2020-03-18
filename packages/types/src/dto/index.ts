import { CommonStruct, Blog, Post, Comment } from '../substrate/interfaces';
import { CommonContent, BlogContent, PostContent, CommentContent } from '../offchain'

export abstract class CommonData<S extends CommonStruct, C extends CommonContent> {

  private _struct?: S

  private _content?: C

  constructor (struct?: S, content?: C) {
    this._struct = struct
    this._content = content
  }

  public get struct () {
    return this._struct
  }

  public get content () {
    return this._content
  }
}

export class BlogData extends CommonData<Blog, BlogContent> {}
export class PostData extends CommonData<Post, PostContent> {}
export class CommentData extends CommonData<Comment, CommentContent> {}
