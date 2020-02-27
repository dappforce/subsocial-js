declare const _default: {
    types: {
        Score: string;
        BlogId: string;
        PostId: string;
        CommentId: string;
        ReactionId: string;
        IpfsHash: string;
        OptionIpfsHash: string;
        ScoringAction: {
            _enum: string[];
        };
        PostExtension: {
            _enum: {
                RegularPost: string;
                SharedPost: string;
                SharedComment: string;
            };
        };
        ReactionKind: {
            _enum: string[];
        };
        Change: {
            account: string;
            block: string;
            time: string;
        };
        VecAccountId: string;
        OptionText: string;
        OptionChange: string;
        OptionBlogId: string;
        OptionCommentId: string;
        OptionVecAccountId: string;
        Blog: {
            id: string;
            created: string;
            updated: string;
            writers: string;
            slug: string;
            ipfs_hash: string;
            posts_count: string;
            followers_count: string;
            edit_history: string;
            score: string;
        };
        BlogUpdate: {
            writers: string;
            slug: string;
            ipfs_hash: string;
        };
        Post: {
            id: string;
            blog_id: string;
            created: string;
            updated: string;
            extension: string;
            ipfs_hash: string;
            comments_count: string;
            upvotes_count: string;
            downvotes_count: string;
            shares_count: string;
            edit_history: string;
            score: string;
        };
        PostUpdate: {
            blog_id: string;
            ipfs_hash: string;
        };
        Comment: {
            id: string;
            parent_id: string;
            post_id: string;
            created: string;
            updated: string;
            ipfs_hash: string;
            upvotes_count: string;
            downvotes_count: string;
            shares_count: string;
            direct_replies_count: string;
            edit_history: string;
            score: string;
        };
        Reaction: {
            id: string;
            created: string;
            updated: string;
            kind: string;
        };
        SocialAccount: {
            followers_count: string;
            following_accounts_count: string;
            following_blogs_count: string;
            reputation: string;
            profile: string;
        };
        Profile: {
            created: string;
            updated: string;
            username: string;
            ipfs_hash: string;
            edit_history: string;
        };
        CommentUpdate: {
            ipfs_hash: string;
        };
        OptionProfile: string;
        ProfileUpdate: {
            username: string;
            ipfs_hash: string;
        };
        BlogHistoryRecord: {
            edited: string;
            old_data: string;
        };
        PostHistoryRecord: {
            edited: string;
            old_data: string;
        };
        CommentHistoryRecord: {
            edited: string;
            old_data: string;
        };
        VecCommentHistoryRecord: string;
        ProfileHistoryRecord: {
            edited: string;
            old_data: string;
        };
        VecProfileHistoryRecord: string;
        AccountId: string;
        AccountIdOf: string;
        AccountIndex: string;
        Address: string;
        AssetId: string;
        Balance: string;
        BalanceOf: string;
        Block: string;
        BlockNumber: string;
        Call: string;
        ChangesTrieConfiguration: {
            digestInterval: string;
            digestLevels: string;
        };
        ConsensusEngineId: string;
        Digest: string;
        DigestItem: {
            _enum: {
                Other: string;
                AuthoritiesChange: string;
                ChangesTrieRoot: string;
                SealV0: string;
                Consensus: string;
                Seal: string;
                PreRuntime: string;
            };
        };
        DispatchClass: {
            _enum: string[];
        };
        DispatchInfo: {
            weight: string;
            class: string;
            paysFee: string;
        };
        DispatchInfoTo190: {
            weight: string;
            class: string;
        };
        Fixed64: string;
        H160: string;
        H256: string;
        H512: string;
        Hash: string;
        Header: {
            parentHash: string;
            number: string;
            stateRoot: string;
            extrinsicsRoot: string;
            digest: string;
        };
        Index: string;
        Justification: string;
        KeyValue: string;
        KeyTypeId: string;
        LockIdentifier: string;
        LookupSource: string;
        LookupTarget: string;
        Moment: string;
        Origin: string;
        Perbill: string;
        Percent: string;
        Permill: string;
        Perquintill: string;
        Phantom: string;
        PhantomData: string;
        SignedBlock: {
            block: string;
            justification: string;
        };
        StorageData: string;
        ValidatorId: string;
        Weight: string;
        WeightMultiplier: string;
        PreRuntime: string;
        SealV0: string;
        Seal: string;
        Consensus: string;
    };
};
export default _default;
