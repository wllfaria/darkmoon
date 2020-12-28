import styled from 'styled-components'

export const AppearanceOptionsList = styled.ul`
	list-style: none;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: ${props => props.theme.margins[1]};
	}

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		grid-template-columns: repeat(3, 1fr);
		grid-column-gap: ${props => props.theme.margins[2]};
	}
`

export const AppearanceImgWrapper = styled.li`
	border: 1px solid ${props => props.theme.colors.background[500]};
	border-radius: ${props => props.theme.borderRadius[0]};
	padding: ${props => props.theme.paddings[1]};
	background: ${props => props.theme.colors.background.accent};
	margin-bottom: ${props => props.theme.margins[1]};
`

export const AppearanceImg = styled.img`
	width: 100%;
`

export const AppearanceInputWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: ${props => props.theme.paddings[0]} 0;
`

export const AppearanceName = styled.p`
	font-size: ${props => props.theme.fontSizes[6]};
	line-height: 1;
	margin-left: ${props => props.theme.margins[1]};
`
