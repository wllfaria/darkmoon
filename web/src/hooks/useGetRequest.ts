import useSWR from 'swr'
import axios from '../services/axios'

export function useGetRequest<Data = unknown, Error = unknown>(
	route: string
): { data: Data | undefined; error: Error | undefined; mutate: typeof mutate } {
	const { data, error, mutate } = useSWR<Data, Error>(route, async (route: string) => {
		const response = await axios.get(route)
		return response.data
	})
	return { data, error, mutate }
}
