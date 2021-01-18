import styled from 'styled-components'

export const SProductCard = styled.div`
	position: relative;

	.product-card {
		&__preview-image-container {
			margin-bottom: ${props => props.theme.margins[1]};
			position: relative;

			&__preview-image {
				width: 100%;
				cursor: pointer;
			}
		}

		&__image-knobs-container {
			display: flex;
			justify-content: center;
			margin-bottom: ${props => props.theme.margins[0]};

			&__image-knob {
				width: 1rem;
				cursor: pointer;
				height: 1rem;
				border-radius: ${props => props.theme.borderRadius[1]};
				background: ${props => props.theme.colors.text[500]};
				transition: background 150ms;

				&.active {
					background: ${props => props.theme.colors.primary[500]};
					border: none;
				}

				&:hover {
					background: ${props => props.theme.colors.primary[800]};
					border: none;
				}

				&:not(:last-of-type) {
					margin-right: ${props => props.theme.margins[1]};
				}
			}
		}

		&__product-info {
			text-align: center;

			&__product-name {
				font-size: ${props => props.theme.fontSizes[6]};
				font-weight: bold;
			}

			&__product-price {
				font-size: ${props => props.theme.fontSizes[6]};
				color: ${props => props.theme.colors.text[300]};
				cursor: pointer;
			}
		}
	}
`
