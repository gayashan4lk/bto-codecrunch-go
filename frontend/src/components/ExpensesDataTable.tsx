'use client'

import { useEffect, useState } from 'react'

export function ExpensesDataTable({ expenses }: any) {
	const [items, setItems] = useState([])

	useEffect(() => {
		if (expenses) {
			setItems(expenses)
		}
	}, [])

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
					{items.map((item: any) => (
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
