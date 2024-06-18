import { RevenueChartSkeleton } from '@/components/skeletons'
import { Suspense } from 'react'
import { ExpensesDataTable } from '@/components/ExpensesDataTable'

export default async function Page() {
	const res = await fetch(`${process.env.API_BASEURL}/expenses`)
	const expenses = await res.json()

	return (
		<main>
			<h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
			<div className="mt-6">
				<Suspense fallback={<RevenueChartSkeleton />}>
					{expenses && expenses.length !== 0 && <ExpensesDataTable expenses={expenses} />}
				</Suspense>
			</div>
		</main>
	)
}
