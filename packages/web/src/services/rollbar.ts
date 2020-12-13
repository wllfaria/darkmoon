import Rollbar from 'rollbar'
import { __ROLLBAR_ENV__, __ROLLBAR_ACCESS_TOKEN__, __ENABLE_ROLLBAR__ } from '../utils/consts'

export const RollbarErrorLogger = (() => {
	function toBoolean(value: string | number | boolean | undefined): boolean {
		if (value === 'true') {
			return true
		}
		return typeof value === 'string' ? !!+value : !!value
	}

	console.log(__ROLLBAR_ACCESS_TOKEN__)
	console.log(process.env.NEXT_PUBLIC_ROLLBAR_ACCESS_TOKEN)

	const rollbar = new Rollbar({
		accessToken: __ROLLBAR_ACCESS_TOKEN__,
		environment: __ROLLBAR_ENV__,
		enabled: toBoolean(__ENABLE_ROLLBAR__),
		captureUncaught: true,
		captureUnhandledRejections: true
	})

	const logInfo = (info: Rollbar.LogArgument) => {
		rollbar.info(info)
	}

	const logError = (error: Rollbar.LogArgument) => {
		rollbar.error(error)
	}

	const logWarning = (warning: Rollbar.LogArgument) => {
		rollbar.warning(warning)
	}

	const logCritical = (critical: Rollbar.LogArgument) => {
		rollbar.critical(critical)
	}
	return { logInfo, logError, logWarning, logCritical }
})()
