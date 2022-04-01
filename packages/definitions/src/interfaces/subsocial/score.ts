import {buildTypes} from './utils';

const v0 = buildTypes({
    max: 14,
    types: {
      ScoringAction: {
        _enum: [
          'UpvotePost',
          'DownvotePost',
          'SharePost',
          'CreateComment',
          'UpvoteComment',
          'DownvoteComment',
          'ShareComment',
          'FollowSpace',
          'FollowAccount'
        ]
      }
    }})

export default [ v0 ]
