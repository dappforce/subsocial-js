export function extractVideoId(url: string): string | false {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

export const allowEmbedList = [ 'vimeo', 'youtube', 'youtu.be', 'soundcloud' ]

export const getEmbedUrl = (url: string, embed: string | undefined) => {
    if (!embed) return

    const urls: Record<string, string> = {
        vimeo: `https://player.vimeo.com/video/${url.split('/').pop()}`,
        youtube: `https://www.youtube.com/embed/${url.split('=').pop()}`,
        'youtu.be': `https://www.youtube.com/embed/${url.split('/').pop()}`,
        soundcloud: `https://w.soundcloud.com/player/
      ?url=${url}&amp;auto_play=false&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true`,
    }

    return urls[embed]
}

type SocialBrand =
    'facebook' |
    'twitter' |
    'medium' |
    'linkedIn' |
    'gitHub' |
    'instagram' |
    'youTube' |
    'reddit' |
    'telegram'

export type LinkLabel = SocialBrand | 'website'

const linkPrefix = '^(https?:\/\/)?([a-z0-9-]+\.)?'

const newSocialLinkRegExp = (brandDomain: string): RegExp => {
    return new RegExp(linkPrefix + brandDomain)
}

const socialLinksRegExp: Record<SocialBrand, RegExp[]> = {
    facebook: [
        newSocialLinkRegExp('facebook.com'),
        newSocialLinkRegExp('fb.me'),
        newSocialLinkRegExp('fb.com'),
        newSocialLinkRegExp('facebook.me')
    ],
    twitter: [
        newSocialLinkRegExp('twitter.com')
    ],
    medium: [
        newSocialLinkRegExp('medium.com')
    ],
    linkedIn: [
        newSocialLinkRegExp('linkedin.com'),
        newSocialLinkRegExp('linked.in')
    ],
    gitHub: [
        newSocialLinkRegExp('github.com')
    ],
    instagram: [
        newSocialLinkRegExp('instagram.com'),
        newSocialLinkRegExp('instagr.am')
    ],
    youTube: [
        newSocialLinkRegExp('youtube.com'),
        newSocialLinkRegExp('youtu.be')
    ],
    telegram: [
        newSocialLinkRegExp('t.me'),
        newSocialLinkRegExp('telegram.me')
    ],
    reddit: [
        newSocialLinkRegExp('reddit.com'),
    ]
}

export const isSocialBrandLink = (brand: SocialBrand, link: string): boolean => {
    if (!link) {
        return false
    }

    link = link.trim().toLowerCase()
    return !!socialLinksRegExp[brand].find(r => r.test(link))
}

export const getLinkBrand = (link: string): LinkLabel | undefined => {
    for (const key in socialLinksRegExp) {
        const brand = key as SocialBrand
        if (isSocialBrandLink(brand, link)) {
            return brand
        }
    }
    return 'website'
}