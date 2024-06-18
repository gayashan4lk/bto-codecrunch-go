"use client"

import { TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface Expense {
	_id: string
	date: string
	payment_type: string
	detail: string
	is_paid: boolean
	payment: number
}

interface ExpensesTableProps {
	expenses: Expense[]
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses }) => {
	const [data, setData] = useState(expenses)

	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(`${process.env.API_BASEURL}/expenses/${id}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error('Failed to delete expense')
			}

			// Remove the deleted item from the state
			setData(data.filter(item => item._id !== id))
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<table className="table table-zebra">
			<thead>
				<tr>
					<th>Date</th>
					<th>Payment Type</th>
					<th>Detail</th>
					<th>Paid In</th>
					<th>Paid Out</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{data.map(item => (
					<tr key={item._id}>
						<td>{item.date}</td>
						<td>{item.payment_type}</td>
						<td>{item.detail}</td>
						<td>{item.is_paid ? item.payment : ''}</td>
						<td>{item.is_paid ? '' : item.payment}</td>
						<td>
							<button onClick={() => handleDelete(item._id)}>
								<TrashIcon className="w-5 h-5 text-red-500" />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default ExpensesTable
