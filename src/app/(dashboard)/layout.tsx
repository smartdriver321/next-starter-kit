import React, { ReactNode } from 'react'

import SidebarV2 from '@/components/dashboard/sidebar-v2'
import Navbar from '@/components/dashboard/navbar'

export default async function DashboardLayout({
	children,
}: {
	children: ReactNode
}) {
	const session = null

	return (
		<div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
			<SidebarV2 />
			<div className='flex flex-col'>
				<Navbar session={session} />
				{children}
			</div>
		</div>
	)
}
