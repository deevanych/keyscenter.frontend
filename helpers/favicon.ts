import {Link} from '@unhead/schema';

const appleFaviconSizes = [
    '180'
]

const faviconSizes = [
    '16',
    '32',
]

const androidFaviconSizes = [
    '192',
    '512'
]

export const faviconLinks = (): Link[] => {
    const links: Link[] = []

    appleFaviconSizes.forEach(size => {
        const fullSize = `${size}x${size}`

        links.push({
            rel: 'apple-touch-icon',
            sizes: fullSize,
            href: `/apple-icon-${fullSize}.png`
        })
    })

    faviconSizes.forEach(size => {
        const fullSize = `${size}x${size}`

        links.push({
            rel: 'icon',
            type: 'image/png',
            sizes: fullSize,
            href: `/favicon-${fullSize}.png`
        })
    })

    androidFaviconSizes.forEach(size => {
        const fullSize = `${size}x${size}`

        links.push({
            rel: 'icon',
            type: 'image/png',
            sizes: fullSize,
            href: `/android-icon-${fullSize}.png`
        })
    })

    return links
}
