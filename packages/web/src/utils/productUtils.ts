import { Product } from '../typings/Product'

export const createProductUrl = (product: Product, language: string): string => {
	const shapedName = product.name.toLowerCase().replaceAll(' ', '-')
	const gender = product.gender.toLowerCase()
	const category = product.category.toLowerCase()
	return `/${language}/products/${gender}/${category}/${shapedName}`
}

export const getUserCurrencySymbol = (language: string): string => {
	const currencies = {
		pt: () => 'R$',
		en: () => '$'
	}
	return currencies[language]()
}
