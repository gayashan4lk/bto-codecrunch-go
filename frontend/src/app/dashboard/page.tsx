import { RevenueChartSkeleton } from '@/components/skeletons'
import ExpensesTable from '@/components/ExpensesTable'
import { Suspense } from 'react'

export default async function Page() {
	const res = await fetch(`${process.env.API_BASEURL}/expenses`)
	const expenses = await res.json()

	return (
		<main>
			<h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
			<div className="mt-6">
				<Suspense fallback={<RevenueChartSkeleton />}>
					<div className="overflow-x-auto">
						<ExpensesTable expenses={expenses} />
					</div>
				</Suspense>
			</div>
		</main>
	)
}
