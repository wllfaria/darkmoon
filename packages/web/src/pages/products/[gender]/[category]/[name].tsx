import React, { useContext, useEffect, useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import mockProducts from '../../../../mocks/data/products.json'
import { Product } from '../../../../typings/Product'
import { useGetRequest } from '../../../../hooks/useGetRequest'
import { useRouter } from 'next/router'
import { HttpResponse } from '../../../../typings/HttpResponse'
import { Container } from '../../../../styles/GlobalComponents'
import { ProductImage } from '../../../../typings/ProductImage'
import {
	PreviewImg,
	PreviewImgThumbnail,
	PreviewImgWrapper,
	PreviewThumbnail,
	ProductButtonsWrapper,
	ProductDescription,
	ProductDetail,
	ProductName,
	ProductPrice,
	ProductSize,
	ProductSizeName,
	SizesWrapper,
	ThumbnailsWrapper
} from '../../../../styles/pages/products/[gender]/[category]/[name].styles'
import { useTranslation } from '../../../../../i18n'
import Button from '../../../../components/Button'
import { CartContext } from '../../../../states/cartState'
import { getUserCurrencySymbol } from '../../../../utils/productUtils'

interface ProductDetailsPageProps {
	namespacesRequired: string[]
	productResponse: HttpResponse<Product>
}

const ProductDetailsPage: NextPage<ProductDetailsPageProps> = ({ productResponse }) => {
	// const router = useRouter()
	// const { data } = useGetRequest(`/products/${router.query.name}`, productResponse)
	const product = productResponse.body
	const [previewImage, setPreviewImage] = useState<ProductImage>(productResponse.body.images[0])
	const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0])
	const { addProductToCart } = useContext(CartContext)
	const { t, i18n } = useTranslation()

	return (
		<Container>
			<ProductDetail>
				<PreviewImgWrapper>
					<PreviewImg src={previewImage.url} title={previewImage.title} alt={previewImage.alt} />
					<ThumbnailsWrapper>
						{product.images.map(image => (
							<PreviewThumbnail key={image.id} onClick={() => setPreviewImage(image)}>
								<PreviewImgThumbnail src={image.url} alt={image.alt} title={image.title} />
							</PreviewThumbnail>
						))}
					</ThumbnailsWrapper>
				</PreviewImgWrapper>
				<div>
					<ProductName>{product.name}</ProductName>
				</div>
				<div>
					<ProductDescription>{product.description}</ProductDescription>
					<ProductSizeName>{t('Available sizes')}</ProductSizeName>
					<SizesWrapper>
						{product.availableSizes.map(size => (
							<ProductSize key={size}>
								<Button
									onClick={() => setSelectedSize(size)}
									type="button"
									variant={selectedSize === size ? 'default' : 'text'}
								>
									{size}
								</Button>
							</ProductSize>
						))}
					</SizesWrapper>
					<ProductPrice>
						{getUserCurrencySymbol(i18n.language)} {product.price}
					</ProductPrice>
					<ProductButtonsWrapper>
						<Button fullWidth type="button" color="primary" size="large">
							{t('Buy now')}
						</Button>
						<Button
							onClick={() => addProductToCart(product, selectedSize)}
							fullWidth
							type="button"
							size="large"
							variant="outlined"
						>
							{t('Add to cart')}
						</Button>
					</ProductButtonsWrapper>
				</div>
			</ProductDetail>
		</Container>
	)
}

ProductDetailsPage.getInitialProps = async (_context: NextPageContext): Promise<ProductDetailsPageProps> => {
	return {
		namespacesRequired: ['common'],
		productResponse: { ok: true, body: mockProducts[0] as Product }
	}
}

export default ProductDetailsPage
