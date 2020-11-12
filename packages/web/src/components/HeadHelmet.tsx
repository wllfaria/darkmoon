import React from 'react'
import Head from 'next/head'

interface HeadHelmetProps {
	title: string
	description: string
	imageAlt: string
	image: string
	url: string
	tags: string
}

const HeadHelmet: React.FC<HeadHelmetProps> = ({ title, description, imageAlt, url, tags }) => {
	return (
		<Head>
			<title>{title}</title>

			{/* General Tags */}
			<meta name="description" content={description} />
			<link rel="canonical" href={`${url}`} />
			<meta charSet="utf-8" />
			<meta name="robots" content="index,follow" />
			<meta name="googlebot" content="index,follow" />
			<meta name="owner" content="Darkmoon" />
			<meta name="url" content="" />
			<meta name="identifier-URL" content="" />
			<meta name="revisit-after" content="7 days" />
			<meta name="keywords" content={tags} />
			<meta name="author" content="" />
			<meta name="reply-to" content="" />
			<meta name="rating" content="General" />
			<meta name="referrer" content="no-referrer" />

			{/* Open Graph Tags */}
			<meta property="og:type" content="website" />
			<meta property="og:image" content="" />
			<meta name="og:title" property="og:title" content={title} />
			<meta name="og:description" property="og:description" content={description} />
			<meta property="og:site_name" content="Darkmoon" />
			<meta property="og:url" content={`${url}`} />

			{/* Twitter Tags */}
			<meta name="twitter:image" content="" />
			<meta name="twitter:image:alt" content={imageAlt} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:site" content="" />
			<meta name="twitter:creator" content="" />

			{/* Favicons */}
			<link rel="icon" href="" sizes="32x32" />
			<link rel="icon" href="" sizes="57x57" />
			<link rel="icon" href="" sizes="76x76" />
			<link rel="icon" href="" sizes="96x96" />
			<link rel="icon" href="" sizes="128x128" />
			<link rel="icon" href="" sizes="192x192" />
			<link rel="icon" href="" sizes="228x228" />
			<link rel="shortcut icon" sizes="196x196" href="" />
			<link rel="apple-touch-icon" href="" sizes="120x120" />
			<link rel="apple-touch-icon" href="" sizes="152x152" />
			<link rel="apple-touch-icon" href="" sizes="180x180" />
			<meta name="msapplication-TileColor" content="#9038FD" />
			<meta name="msapplication-TileImage" content="" />
			<meta name="msapplication-config" content="" />

			{/* Apple Tags */}
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta content="yes" name="apple-touch-fullscreen" />
			<meta name="apple-mobile-web-app-status-bar-style" content="black" />
			<meta name="format-detection" content="telephone=no" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			{/* IE Tags */}
			<meta httpEquiv="Page-Enter" content="RevealTrans(Duration=2.0,Transition=2)" />
			<meta httpEquiv="Page-Exit" content="RevealTrans(Duration=3.0,Transition=12)" />
			<meta name="mssmarttagspreventparsing" content="true" />
			<meta httpEquiv="X-UA-Compatible" content="chrome=1" />
			<meta name="application-name" content="Darkmoon" />
		</Head>
	)
}

export default HeadHelmet
