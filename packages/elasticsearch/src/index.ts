
import { ElasticIndex, ElasticIndexName, ElasticPostDoc, ElasticSpaceDoc } from './types'
import {isEmptyObj, newLogger} from '@subsocial/utils'
import { Client } from '@elastic/elasticsearch'

const log = newLogger('Elastic')

export type SubsocialElasticApiProps = {
 url: string,
 auth: {
    username: string,
     password: string
 }
 ssl: boolean
}

type CommonIndexProps<T extends ElasticSpaceDoc | ElasticPostDoc> = {
    id: string,
    content: T,
}

type AnyElasticDoc =
    ElasticSpaceDoc |
    ElasticPostDoc

type IndexContentProps = {
    index: ElasticIndexName
    id: string
    body: AnyElasticDoc
}

export class SubsocialElasticApi {
    private readonly _client: Client

    constructor({ url, auth, ssl: enableSsl }: SubsocialElasticApiProps) {
        const ssl = {
            ca: enableSsl ? '' : undefined,
            rejectUnauthorized: enableSsl, // <-- this is important
        }

        this._client = new Client({ node: url, auth, ssl })
        log.log(`Elasticsearch client is created with url: ${url}`)
    }

    get client () {
        return this._client
    }

    async indexContent({ index, id, body }: IndexContentProps) {
        if (isEmptyObj(body)) return undefined

        return this.client.index({
            index,
            id: id?.toString(),
            body
        })
    }

    async indexSpaceContent({ id, content: c }: CommonIndexProps<ElasticSpaceDoc>) {
        return this.indexContent({
            index: ElasticIndex.spaces,
            id,
            body: {
                name: c.name,
                about: c.about,
                tags: c.tags,
                handle: c.handle
            }
        })
    }

    async indexPostContent({ id, content: c }: CommonIndexProps<ElasticPostDoc>) {
        return this.indexContent({
            index: ElasticIndex.posts,
            id,
            body: {
                spaceId: c.spaceId,
                title: c.title,
                body: c.body,
                tags: c.tags
            }
        })
    }

}



