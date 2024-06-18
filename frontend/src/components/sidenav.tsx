'use client'

import { PowerIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { UserGroupIcon, HomeIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { AppLogo } from './AppLogo'

const links = [
	{ name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
	{ name: 'Add Expense', href: '/dashboard/add-expense', icon: DocumentDuplicateIcon },
	// { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
]

export default function SideNav() {
	const pathName = usePathname()

	return (
		<div className="flex h-full flex-col px-3 py-4 md:px-2">
			<Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40" href="/">
				<div className="w-32 text-white md:w-40">
					<AppLogo />
				</div>
			</Link>
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
				{links.map((link) => {
					const LinkIcon = link.icon
					return (
						<Link
							key={link.name}
							href={link.href}
							className={clsx(
								'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
								{ 'bg-sky-100 text-blue-600': pathName === link.href },
							)}
						>
							<LinkIcon className="w-6" />
							<p className="hidden md:block">{link.name}</p>
						</Link>
					)
				})}
				<div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
				<form
				// action={async () => {
				//   'use server';
				//   await signOut();
				// }}
				>
					<button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
						<PowerIcon className="w-6" />
						<div className="hidden md:block">Sign Out</div>
					</button>
				</form>
			</div>
		</div>
	)
}
