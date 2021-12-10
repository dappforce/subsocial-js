import {buildTypes} from "./utils";

const v0 = buildTypes({
    min: 15,
    types: {
        ReportId: 'u64',
        ModerationEntityId: {
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
            reportedEntity: 'ModerationEntityId',
            reportedWithin: 'SpaceId',
            reason: 'Content'
        },
        SuggestedStatus: {
            suggested: 'WhoAndWhen',
            status: 'Option<EntityStatus>',
            reportId: 'Option<ReportId>'
        },
        SpaceModerationSettings: {
            autoblockThreshold: 'Option<u16>'
        },
        SpaceModerationSettingsUpdate: {
            autoblockThreshold: 'Option<Option<u16>>'
        },
    }})

export default [ v0 ]
