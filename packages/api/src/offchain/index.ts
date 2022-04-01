import { Activity } from '@subsocial/types';

type EntityIds = {
  spaceIds: string[];
  postIds: string[];
  profileIds: string[];
}

export const extractEntityIdsFromActivities = (activities: Activity[]): EntityIds => {
  const spaceIdsSet = new Set<string>();
  const postIdsSet = new Set<string>();
  const profileIdsSet = new Set<string>();

  activities.forEach((activity) => {
    activity.space_id && spaceIdsSet.add(activity.space_id);
    activity.post_id && postIdsSet.add(activity.post_id);
    activity.comment_id && postIdsSet.add(activity.comment_id);
    activity.account && profileIdsSet.add(activity.account);
  });

  const spaceIds = Array.from(spaceIdsSet);
  const postIds = Array.from(postIdsSet);
  const profileIds = Array.from(profileIdsSet);
  
  return { spaceIds, postIds, profileIds } as EntityIds;
}