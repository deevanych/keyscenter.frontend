import { Link } from '@unhead/schema';

const appleFaviconSizes = [
	'57',
	'60',
	'72',
	'76',
	'114',
	'120',
	'144',
	'152',
	'180'
]

const faviconSizes = [
	'16',
	'32',
	'96'
]

const androidFaviconSizes = [
	'192'
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
