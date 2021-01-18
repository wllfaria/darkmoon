import React, { createContext, useEffect, useReducer } from 'react'
import { Product } from '../typings/Product'

interface CartState {
	products: CartProducts
	addProductToCart: (product: Product, selectedSize: string) => void
	removeProductFromCart: (productName: string) => void
}

type CartProducts = {
	[key: string]: CartProduct
}

export type CartProduct = {
	quantity: number
	selectedSize: string
	product: Product
}

const initialState: CartState = {
	products: {},
	addProductToCart: () => null,
	removeProductFromCart: () => null
}

type ActionTypes = 'INCREASE_PRODUCT_QUANTITY' | 'ADD_NEW_PRODUCT' | 'LOAD_SAVED_CART' | 'REMOVE_PRODUCT'

type CartAction = {
	type: ActionTypes
	payload: string | CartProducts | CartProduct
}

type ReducerHandler = {
	[key in ActionTypes]: (action: CartAction) => CartState
}

const reducer = (state: CartState, action: CartAction) => {
	const reducerHandler: ReducerHandler = {
		INCREASE_PRODUCT_QUANTITY: action => {
			const products = { ...state.products }
			products[action.payload as string].quantity++
			return { ...state, products }
		},
		ADD_NEW_PRODUCT: action => {
			const products = { ...state.products }
			const productInfo = action.payload as CartProduct
			const key = `${productInfo.product.name} - ${productInfo.selectedSize}`
			products[key] = {
				quantity: productInfo.quantity,
				selectedSize: productInfo.selectedSize,
				product: productInfo.product
			}
			return { ...state, products }
		},
		LOAD_SAVED_CART: action => ({
			...state,
			products: action.payload as CartProducts
		}),
		REMOVE_PRODUCT: action => {
			const products = { ...state.products }
			delete products[action.payload as string]
			return { ...state, products }
		}
	}
	return reducerHandler[action.type](action)
}

export const CartContext = createContext(initialState)

const CartState: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const increaseProductQuantity = (productName: string) => {
		dispatch({ type: 'INCREASE_PRODUCT_QUANTITY', payload: productName })
	}

	const addNewProduct = (product: Product, selectedSize: string) => {
		dispatch({ type: 'ADD_NEW_PRODUCT', payload: { selectedSize, product, quantity: 1 } })
	}

	const loadSavedCart = (savedProducts: CartProducts) => {
		dispatch({ type: 'LOAD_SAVED_CART', payload: savedProducts })
	}

	const getProductFromLocalStorage = (): CartProducts => {
		return JSON.parse(localStorage.getItem('darkmooncart'))
	}

	useEffect(() => {
		const savedProducts = getProductFromLocalStorage()
		savedProducts && loadSavedCart(savedProducts)
	}, [])

	const addProductToCart = (product: Product, selectedSize: string) => {
		const key = `${product.name} - ${selectedSize}`
		const productAlreadyOnCart = state.products[key]
		!!productAlreadyOnCart && increaseProductQuantity(key)
		!!productAlreadyOnCart === false && addNewProduct(product, selectedSize)
	}

	const removeProductFromCart = (productName: string) => {
		dispatch({ type: 'REMOVE_PRODUCT', payload: productName })
	}

	useEffect(() => {
		localStorage.setItem('darkmooncart', JSON.stringify(state.products))
	}, [state.products])

	const contextValue: CartState = {
		...state,
		addProductToCart,
		removeProductFromCart
	}

	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export default CartState
