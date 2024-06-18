import { GlobeAltIcon } from '@heroicons/react/24/outline'

export function AppLogo() {
	return (
		<div className={`flex flex-row items-center leading-none text-white`}>
			<GlobeAltIcon className="rotate-[15deg]" />
			<p className="text-[20px] ml-2">Acme Personal Finance</p>
		</div>
	)
}
