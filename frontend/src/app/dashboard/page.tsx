import { RevenueChartSkeleton } from '@/components/skeletons'
import { Suspense } from 'react'

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

function ExpensesDataTable({ expenses }: any) {
	return (
		<div className="overflow-x-auto">
			<table className="table table-zebra">
				{/* head */}
				<thead>
					<tr>
						<th>Date</th>
						<th>Payment Type</th>
						<th>Detail</th>
						<th>Paid In</th>
						<th>Paid Out</th>
					</tr>
				</thead>
				<tbody>
					{expenses.map((item: any) => (
						<tr key={item._id}>
							<td>{item.date}</td>
							<td>{item.payment_type}</td>
							<td>{item.detail}</td>
							<td>{item.is_paid ? item.payment : ''}</td>
							<td>{item.is_paid ? '' : item.payment}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
