import { RevenueChartSkeleton } from '@/components/skeletons'
import { Suspense } from 'react'
import { ExpensesList } from '@/components/ExpensesList'

export default async function Page() {
	return (
		<main>
			<h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
			<div className="mt-6">
				<Suspense fallback={<RevenueChartSkeleton />}>
					<ExpensesList />
				</Suspense>
			</div>
		</main>
	)
}
