import styled from 'styled-components'

export const SProfileUserInformation = styled.div`
	padding: ${props => props.theme.paddings[1]};
	border-radius: ${props => props.theme.borderRadius[0]};
	border: 1px solid ${props => props.theme.colors.background[500]};
	background: ${props => props.theme.colors.background.accent};
`

export const UserInformation = styled.p`
	margin-bottom: ${props => props.theme.margins[0]};
	font-size: ${props => props.theme.fontSizes[6]};
`
