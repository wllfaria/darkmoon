import { ValidationError } from 'yup'

interface IMappedErrors {
	[key: string]: string
}

export default function mapYupErrors(errors: ValidationError[]): IMappedErrors {
	const mappedErrors: IMappedErrors = errors.reduce((prev, curr) => {
		prev[curr.path] = curr.message
		return prev
	}, {})
	return mappedErrors
}
