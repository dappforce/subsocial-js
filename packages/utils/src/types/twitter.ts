//Ref: https://github.com/PLhery/node-twitter-api-v2/blob/master/src/types/v2/tweet.definition.v2.ts
interface ReferencedTweetV2 {
    type: 'retweeted' | 'quoted' | 'replied_to'
    id: string
}
  
interface TweetAttachmentV2 {
    media_keys?: string[]
    poll_ids?: string[]
}
  
export type TweetPostContent = {
    id: string
    edit_history_tweet_ids: string[]
    username: string
    created_at?: string
    author_id?: string
    conversation_id?: string
    in_reply_to_user_id?: string
    referenced_tweets?: ReferencedTweetV2[]
    attachments?: TweetAttachmentV2
    lang?: string
}
  