import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { AppLogo } from '../components/AppLogo'

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col p-6">
			<div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
				<AppLogo />
			</div>
			<div className="mt-4 flex grow flex-col gap-4 md:flex-row">
				<div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
					<div className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent" />
					<p className={`text-xl text-gray-800 md:text-xl md:leading-normal antialiased`}>
						The <strong>easy-to-use</strong> zero-based budgeting app that helps you keep tabs on your money at a glance
						anytime, anywhere.
					</p>
					<Link
						href="/dashboard"
						className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
					>
						<span>Go to Dashboard</span> <ArrowRightIcon className="w-5 md:w-6" />
					</Link>
				</div>
			</div>
		</main>
	)
}
