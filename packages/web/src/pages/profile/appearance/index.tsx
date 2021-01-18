import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { NextPage } from 'next'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from '../../../../i18n'
import Alert from '../../../components/Alert'
import Button from '../../../components/Button'
import withPrivateRoute from '../../../components/PrivateRoute'
import ProfileLayout from '../../../components/ProfileLayout'
import RadioInput from '../../../components/RadioInput'
import { AppThemeContext } from '../../../states/appThemeState'
import { ProfileSectionWrapper } from '../../../styles/GlobalComponents'
import {
	AppearanceImg,
	AppearanceImgWrapper,
	AppearanceInputWrapper,
	AppearanceName,
	AppearanceOptionsList
} from '../../../styles/pages/profile/appearance/index.styles'

interface AppearancePageProps {
	namespacesRequired: string[]
}

const AppearancePage: NextPage<AppearancePageProps> = () => {
	const { config, updateUserPreference, switchToDarkMode, switchToLightMode, switchToSystemDefault } = useContext(
		AppThemeContext
	)
	const [requestSuccess, setRequestSuccess] = useState('')
	const [requestError, setRequestError] = useState('')
	const inputRefs = useRef<HTMLInputElement[]>([])
	const [loading, setLoading] = useState(false)
	const formRef = useRef<FormHandles>(null)
	const { t } = useTranslation()

	const handleSaveTheme = (data: { theme: ['Dark' | 'Light' | 'System'] }) => {
		try {
			setLoading(true)
			updateUserPreference(data.theme[0])
			setRequestSuccess('Appearance configuration saved succesfully.')
		} catch (err) {
			setRequestError('An error ocurred while processing your request, please try again.')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		inputRefs.current.filter(input => input.value === config).forEach(input => (input.checked = true))
	}, [config])

	return (
		<ProfileLayout>
			{requestError && <Alert message={requestError} variant="danger" />}
			{requestSuccess && <Alert message={requestSuccess} variant="success" />}
			<ProfileSectionWrapper>
				<h3>{t('Appearance')}</h3>
			</ProfileSectionWrapper>
			<Form ref={formRef} onSubmit={handleSaveTheme}>
				<AppearanceOptionsList>
					<AppearanceImgWrapper>
						<label htmlFor="System" onClick={switchToSystemDefault}>
							<AppearanceImg src="/static/vectors/systemDefault.svg" />
							<AppearanceInputWrapper>
								<RadioInput refs={inputRefs} index={0} id="System" value="System" name="theme" />
								<AppearanceName>{t('Default to system')}</AppearanceName>
							</AppearanceInputWrapper>
						</label>
					</AppearanceImgWrapper>
					<AppearanceImgWrapper>
						<label htmlFor="Light" onClick={() => switchToLightMode('Light')}>
							<AppearanceImg src="/static/vectors/lightMode.svg" />
							<AppearanceInputWrapper>
								<RadioInput refs={inputRefs} index={1} id="Light" value="Light" name="theme" />
								<AppearanceName>{t('Light mode')}</AppearanceName>
							</AppearanceInputWrapper>
						</label>
					</AppearanceImgWrapper>
					<AppearanceImgWrapper>
						<label htmlFor="Dark" onClick={() => switchToDarkMode('Dark')}>
							<AppearanceImg src="/static/vectors/darkMode.svg" />
							<AppearanceInputWrapper>
								<RadioInput refs={inputRefs} index={2} id="Dark" value="Dark" name="theme" />
								<AppearanceName>{t('Dark mode')}</AppearanceName>
							</AppearanceInputWrapper>
						</label>
					</AppearanceImgWrapper>
				</AppearanceOptionsList>
				<Button loading={loading} type="submit" color="primary">
					salvar
				</Button>
			</Form>
		</ProfileLayout>
	)
}

AppearancePage.getInitialProps = async (): Promise<AppearancePageProps> => ({
	namespacesRequired: ['common']
})

export default withPrivateRoute(AppearancePage)
