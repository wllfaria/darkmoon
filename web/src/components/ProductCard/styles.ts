import styled from 'styled-components'

export const SProductCard = styled.div`
	position: relative;

	.product-card {
		&__preview-image-container {
			margin-bottom: ${props => props.theme.margins[1]};
			position: relative;

			&__add-to-cart {
				display: none;
				color: white;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
				z-index: 5;
			}

			&:hover {
				.product-card__preview-image-container__add-to-cart {
					display: block;
				}

				&::before {
					opacity: 1;
				}
			}

			&::before {
				content: '';
				width: 100%;
				height: 100%;
				position: absolute;
				opacity: 0;
				transition: opacity 150ms;
				top: 0;
				left: 0;
				background: rgba(0, 0, 0, 0.4);
			}

			&__preview-image {
				width: 100%;
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
			}
		}
	}
`
