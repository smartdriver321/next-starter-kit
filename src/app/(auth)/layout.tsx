import React, { ReactNode } from 'react'

import SiteHeader from '@/components/frontend/site-header'

export default function AuthLayout({ children }: { children: ReactNode }) {
	const session = null
	return (
		<div className='bg-white'>
			<SiteHeader session={session} />
			<div className='relative isolate px-6 pt-14 lg:px-8'>{children}</div>
		</div>
	)
}
