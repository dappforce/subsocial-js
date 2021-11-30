import {buildTypes} from "./utils";

const v0 = buildTypes({
    min: 15,
    types: {
        ReportId: 'u64',
        EntityId: {
            _enum: {
                Content: 'Content',
                Account: 'AccountId',
                Space: 'SpaceId',
                Post: 'PostId'
            }
        },
        EntityStatus: {
            _enum: [
                'Allowed',
                'Blocked'
            ]
        },
        Report: {
            id: 'ReportId',
            created: 'WhoAndWhen',
            reported_entity: 'EntityId',
            reported_within: 'SpaceId',
            reason: 'Content'
        },
        SuggestedStatus: {
            suggested: 'WhoAndWhen',
            status: 'Option<EntityStatus>',
            report_id: 'Option<ReportId>'
        },
        SpaceModerationSettings: {
            autoblock_threshold: 'Option<u16>'
        },
        SpaceModerationSettingsUpdate: {
            autoblock_threshold: 'Option<Option<u16>>'
        },
    }})

export default [ v0 ]
