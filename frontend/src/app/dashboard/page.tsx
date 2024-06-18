import { TestForm } from '@/components/TestForm'
import ExpensesDataGrid from '@/components/expenses-datagrid'
import { RevenueChartSkeleton } from '@/components/skeletons'
import { Suspense } from 'react'

export default async function Page() {
	const res = await fetch(`${process.env.API_BASEURL}/expenses`)
	const expenses = await res.json()
	console.log(expenses)

	return (
		<main>
			<h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
			<div className="mt-6">
				<Suspense fallback={<RevenueChartSkeleton />}>
					{/* <ExpensesDataGrid expenses={expenses} /> */}
					<div className="flex gap-2">
						<h6 className="">Date</h6>
						<h6 className="">Payment Type</h6>
						<h6 className="">Detail</h6>
						<h6 className="">Paid In</h6>
						<h6 className="">Paid Out</h6>
					</div>

					<div className="flex gap-2">
						{expenses.map((item: any) => (
							<div key={item._id}>
								<h6 className="">{item.date}</h6>
								<h6 className="">{item.payment_type}</h6>
								<h6 className="">{item.detail}</h6>
								<h6 className="">{item.is_paid ? item.payment : ''}</h6>
								<h6 className="">{item.is_paid ? '' : item.payment}</h6>
							</div>
						))}
					</div>
				</Suspense>
			</div>
			{/* {expenses.map((item: any) => (
				<div key={item._id}>{item.detail}</div>
			))} */}

			{/* This is dashboard
			<TestForm /> */}
		</main>
	)
}
