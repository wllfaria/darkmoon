import * as yup from 'yup'

export type Product = {
  id: string,
  name: string,
  description: string,
  price: number
}

export const productCreateSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required()
})

export const productGetSchema = yup.object().shape({
  productId: yup.string().required()
})

export type ProductCreateResponse = {
  objectLocation: string
}