import styled from 'styled-components'

export const SAlert = styled.div`
	width: 100%;
	border-width: 1px;
	border-style: dotted;
	padding: ${props => props.theme.paddings[0]} ${props => props.theme.paddings[1]};
	border-radius: ${props => props.theme.borderRadius[0]};
	font-size: ${props => props.theme.fontSizes[5]};
	margin-bottom: ${props => props.theme.margins[2]};
	font-weight: bold;
	color: ${props => props.theme.colors.text.black};

	&.success {
		border-color: ${props => props.theme.colors.success[300]};
		background: ${props => props.theme.colors.success[500]};
	}

	&.danger {
		border-color: ${props => props.theme.colors.danger[300]};
		background: ${props => props.theme.colors.danger[500]};
	}
`
