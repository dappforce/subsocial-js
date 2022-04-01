
export const ReactionKinds: { [key: string]: string } = {
  Upvote: 'Upvote',
  Downvote: 'Downvote'
};

type ReactionKindType = 'Upvote' | 'Downvote'

export function ReactionKind (value: ReactionKindType) {
  return value
}
