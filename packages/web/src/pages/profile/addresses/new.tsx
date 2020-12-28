import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useRef, useState } from 'react'
import { ValidationError } from 'yup'
import { useTranslation } from '../../../../i18n'
import Alert from '../../../components/Alert'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import withPrivateRoute from '../../../components/PrivateRoute'
import ProfileLayout from '../../../components/ProfileLayout'
import axios from '../../../services/axios'
import { AuthContext } from '../../../states/authState'
import { ProfileSectionWrapper } from '../../../styles/GlobalComponents'
import { AddressPayload, AddressSchema } from '../../../typings/Address'
import { HttpResponse } from '../../../typings/HttpResponse'
import { User } from '../../../typings/User'
import { ViaCepResponse } from '../../../typings/ViaCep'
import mapYupErrors from '../../../utils/yupUtils'

interface NewAddressPageProps {
	namespacesRequired: string[]
}

const NewAddressPage: NextPage<NewAddressPageProps> = () => {
	const [loading, setLoading] = useState(false)
	const [requestError, setRequestError] = useState('')
	const { user, updateUser } = useContext(AuthContext)
	const formRef = useRef<FormHandles>(null)
	const { t, i18n } = useTranslation()
	const router = useRouter()

	const handleAddAddress = async (data: AddressPayload) => {
		try {
			setLoading(true)
			await AddressSchema.validate(data, { abortEarly: false })
			const addressPayload = AddressSchema.cast(data)
			const response = await axios.patch<HttpResponse<User>>('users/address/create', {
				...addressPayload,
				email: user.email
			})
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

	return (
		<ProfileLayout>
			<ProfileSectionWrapper>
				{requestError && <Alert message={t(requestError)} variant="danger" />}
				<h3>{t('Adresses')}</h3>
			</ProfileSectionWrapper>
			<Form onSubmit={handleAddAddress} ref={formRef}>
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
				<Button loading={loading} color="primary" type="submit" size="large">
					{t('Add')}
				</Button>
			</Form>
		</ProfileLayout>
	)
}

NewAddressPage.getInitialProps = async (): Promise<NewAddressPageProps> => ({
	namespacesRequired: ['common']
})

export default withPrivateRoute(NewAddressPage)
