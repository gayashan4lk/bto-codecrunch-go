import { revalidatePath } from 'next/cache'

export default function Page() {
	async function create(formData: FormData) {
		'use server'
		const payment = formData.get('payment')

		const payload = {
			detail: formData.get('detail'),
			payment_type: formData.get('payment_type'),
			payment: payment ? parseFloat(payment as string) : 0,
			is_paid: formData.get('is_paid') ?? false,
		}
		console.log('payload', payload)

		var res = await fetch(`${process.env.API_BASEURL}/expenses`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})

		const { InsertedID } = await res.json()

		if (InsertedID) {
			console.log(InsertedID)
			revalidatePath('/dashboard')
		}
	}

	return (
		<main>
			<h1 className={`mb-4 text-xl md:text-2xl`}>Add expense</h1>

			<div className="w-80">
				<form action={create}>
					<div className="flex gap-2 flex-col">
						<label className="input input-bordered flex items-center gap-2">
							Detail
							<input type="text" name="detail" className="grow" placeholder="Your payment detail" />
						</label>

						<label className="input input-bordered flex items-center gap-2">
							Type
							<input type="text" name="payment_type" className="grow" placeholder="Your payment type" />
						</label>

						<label className="input input-bordered flex items-center gap-2">
							Payment
							<input type="text" name="payment" className="grow" placeholder="0.00" />
						</label>
					</div>

					<div className="form-control">
						<label className="label cursor-pointer">
							<span>Paid out</span>
							<input type="checkbox" name="is_paid" className="checkbox" />
						</label>
					</div>

					<div className="flex justify-end">
						<button className="btn btn-active btn-neutral btn-sm mt-2" type="submit">
							Create
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}
