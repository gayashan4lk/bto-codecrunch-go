export function TestForm() {
	async function create(formData: FormData) {
		'use server'
		console.log('formData', formData)
		const fields = {
			test: formData.get('test'),
		}
		console.log('fields', fields)

		// Logic to mutate data...
	}
	return (
		<div>
			<h1>Basic form</h1>{' '}
			<form action={create}>
				<label htmlFor="test" className="mb-2 block text-sm font-medium">
					Test
				</label>
				<input id="test" name="test" placeholder="Test" type="text" />
				<button type="submit">Create</button>
			</form>
		</div>
	)
}
