import { unstable_noStore as noStore } from 'next/cache'

export async function fetchExpenses() {
	noStore()
	try {
		const res = await fetch(`${process.env.API_BASEURL}/expenses`, { next: { revalidate: 10 } })
		const expenses = await res.json()
		if (!expenses) return []
		return expenses
	} catch (error) {
		console.error('failed to fetch:', error)
		throw new Error('Failed to fetch the expenses.')
	}
}
