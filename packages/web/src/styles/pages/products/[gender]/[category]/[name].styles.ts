import styled from 'styled-components'

export const ProductDetail = styled.div`
	@media (min-width: ${props => props.theme.breakpoints.md}) {
		grid-column-gap: ${props => props.theme.margins[2]};
		padding-top: ${props => props.theme.paddings[3]};
		grid-template-areas: 'name image info';
		grid-template-columns: repeat(3, 1fr);
		display: grid;
	}
`

export const PreviewImgWrapper = styled.div`
	margin-bottom: ${props => props.theme.margins[3]};

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		grid-area: image;
	}
`

export const PreviewImg = styled.img`
	width: 100%;
	margin-bottom: ${props => props.theme.margins[1]};
`

export const ThumbnailsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: ${props => props.theme.margins[1]};
	overflow: hidden;
`

export const PreviewThumbnail = styled.div`
	border-radius: ${props => props.theme.borderRadius[0]};
	max-height: 10rem;
	overflow: hidden;
`

export const PreviewImgThumbnail = styled.img`
	width: 100%;
	cursor: pointer;

	&:hover {
		opacity: 0.7;
	}
`

export const ProductName = styled.h1`
	font-size: ${props => props.theme.fontSizes[3]};
	margin-bottom: ${props => props.theme.margins[1]};

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		font-size: ${props => props.theme.fontSizes[2]};
	}

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		font-size: ${props => props.theme.fontSizes[1]};
	}
`

export const ProductDescription = styled.p`
	font-size: ${props => props.theme.fontSizes[6]};
	color: ${props => props.theme.colors.text[300]};
	margin-bottom: ${props => props.theme.margins[1]};

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		font-size: ${props => props.theme.fontSizes[5]};
	}
`

export const ProductSizeName = styled.p`
	margin-bottom: ${props => props.theme.margins[2]};
	font-size: ${props => props.theme.fontSizes[5]};
	color: ${props => props.theme.colors.text[200]};
	font-weight: bold;
`

export const SizesWrapper = styled.div`
	display: flex;
	margin-bottom: ${props => props.theme.margins[2]};
`

export const ProductSize = styled.div`
	&:not(:last-of-type) {
		margin-right: ${props => props.theme.margins[1]};
	}
`

export const ProductPrice = styled.p`
	font-size: ${props => props.theme.fontSizes[4]};
	margin-bottom: ${props => props.theme.margins[2]};

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		font-size: ${props => props.theme.fontSizes[3]};
	}

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		font-size: ${props => props.theme.fontSizes[2]};
	}
`

export const ProductButtonsWrapper = styled.div`
	button:first-of-type {
		margin-bottom: ${props => props.theme.margins[1]};
	}
`
