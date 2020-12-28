import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { NextPage } from 'next'
import React, { useContext, useMemo, useRef, useState } from 'react'
import { useTranslation } from '../../../../i18n'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import withPrivateRoute from '../../../components/PrivateRoute'
import ProfileLayout from '../../../components/ProfileLayout'
import { Address, AddressSchema } from '../../../typings/Address'
import { ViaCepResponse } from '../../../typings/ViaCep'
import axios from '../../../services/axios'
import { AuthContext } from '../../../states/authState'
import { useRouter } from 'next/router'
import { ValidationError } from 'yup'
import mapYupErrors from '../../../utils/yupUtils'
import { ProfileSectionWrapper } from '../../../styles/GlobalComponents'
import { HttpResponse } from '../../../typings/HttpResponse'
import { User } from '../../../typings/User'
import Alert from '../../../components/Alert'

interface EditAddressPageProps {
	namespacesRequired: string[]
}

const EditAddressPage: NextPage<EditAddressPageProps> = () => {
	const [addressIndex, setAddressIndex] = useState<number>(null)
	const [requestError, setRequestError] = useState('')
	const [loading, setLoading] = useState(false)
	const formRef = useRef<FormHandles>(null)
	const { user, updateUser } = useContext(AuthContext)
	const { t, i18n } = useTranslation()
	const router = useRouter()

	const initialFormData = useMemo(() => {
		return user?.addresses?.reduce((initial, current, i) => {
			if (current?.addressName === router.query.name) {
				initial = current
				setAddressIndex(i)
			}
			return initial
		}, {} as Address)
	}, [user, router.query])

	const handleSaveAddress = async (data: Address) => {
		try {
			setLoading(true)
			await AddressSchema.validate(data, { abortEarly: false })
			const dataToSend = { email: user?.email, addresses: [...user?.addresses] }
			dataToSend.addresses[addressIndex] = { ...dataToSend.addresses[addressIndex], ...data }
			const response = await axios.patch<HttpResponse<User>>('users/address', dataToSend)
			updateUser(response.data.body)
			router.push(`/${i18n.language}/profile/addresses`)
		} catch (err) {
			if (err instanceof ValidationError) formRef.current.setErrors(mapYupErrors(err.inner))
			setRequestError(`An address with the name '${data.addressName}' already exists.`)
		} finally {
			setLoading(false)
		}
	}

	const getZipCodeInformation = async (zipCode: string) => {
		const response = await axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${zipCode}/json/`)
		formRef.current.setData({
			neighborhood: response.data.bairro,
			publicPlace: response.data.logradouro,
			city: response.data.localidade,
			state: response.data.uf
		})
	}

	const handleCepChange = async () => {
		const zipCode: string = formRef.current.getFieldValue('zipCode')
		zipCode.length === 8 && getZipCodeInformation(zipCode)
		zipCode.length > 8 && formRef.current.setFieldValue('zipCode', zipCode.substring(0, 8))
	}

	const deleteAddress = async () => {
		try {
			setLoading(true)
			const response = await axios.patch<HttpResponse<User>>(`users/address/${router.query.name}`, {
				email: user.email,
				addressName: router.query.name
			})
			updateUser(response.data.body)
			router.push(`/${i18n.language}/profile/addresses`)
		} catch (err) {
			if (err instanceof ValidationError) formRef.current.setErrors(mapYupErrors(err.inner))
			setRequestError('An error ocurred while processing your request, please try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<ProfileLayout>
			<ProfileSectionWrapper>
				{requestError && <Alert message={requestError} variant="danger" />}
				<h3>{initialFormData?.addressName}</h3>
			</ProfileSectionWrapper>
			<Form initialData={initialFormData} onSubmit={handleSaveAddress} ref={formRef}>
				<fieldset disabled={loading}>
					<Input name="addressName" label={t('Name')} fullWidth />
					<Input
						name="zipCode"
						label={t('Zip code')}
						fullWidth
						onChange={handleCepChange}
						labelDescription={t('Numbers only')}
					/>
					<Input name="number" label={t('Number')} fullWidth />
					<Input name="complement" label={t('Complement')} fullWidth />
					<Input name="publicPlace" label={t('Street')} fullWidth readOnly />
					<Input name="neighborhood" label={t('Neighborhood')} fullWidth readOnly />
					<Input name="city" label={t('City')} fullWidth readOnly />
					<Input name="state" label={t('State')} fullWidth readOnly />
				</fieldset>
				<Button loading={loading} type="submit" color="primary" size="large">
					{t('Save')}
				</Button>{' '}
				<Button onClick={deleteAddress} loading={loading} type="button" color="danger" size="large">
					{t('Delete')}
				</Button>
			</Form>
		</ProfileLayout>
	)
}

EditAddressPage.getInitialProps = async (): Promise<EditAddressPageProps> => ({
	namespacesRequired: ['common']
})

export default withPrivateRoute(EditAddressPage)
