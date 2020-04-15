import { PostData } from '@subsocial/types';

export const getSharedPostId = (postData?: PostData) => {
  if (!postData) return undefined;

  const isSharedPost = postData?.struct?.extension.isSharedPost
  console.log('Is a sharing post?', isSharedPost)
  return isSharedPost ? postData?.struct?.extension.asSharedPost : undefined
}
