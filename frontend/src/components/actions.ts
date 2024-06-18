import { unstable_noStore as noStore } from 'next/cache'

export async function fetchExpenses() {
	noStore()
	try {
		const res = await fetch(`${process.env.API_BASEURL}/expenses`, { method: 'get' })
		const expenses = await res.json()
		console.log('expenses', expenses)
		if (!Array.isArray(expenses)) {
			throw new Error('Expected an array but got something else')
		}
		return expenses
	} catch (error) {
		console.error('failed to fetch:', error)
		throw new Error('Failed to fetch the expenses.')
	}
}
