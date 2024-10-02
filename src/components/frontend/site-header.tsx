'use client'

import Link from 'next/link'
import { Session } from 'next-auth'
import React, { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { getInitials } from '@/lib/generate-initials'
import { ModeToggle } from '@/components/mode-toggle'
import Logo from '../global/logo'
import AuthenticatedAvatar from '../global/authenticated-avatar'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function SiteHeader({ session }: { session: Session | null }) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const navigation = [
		{ name: 'Products', href: '/products' },
		{ name: 'Solutions', href: '/solutions' },
		{ name: 'Resources', href: '/resources' },
		{ name: 'Docs', href: '/docs' },
		{ name: 'Pricing', href: '/pricing' },
	]

	return (
		<header className='absolute inset-x-0 top-0 z-50'>
			<nav
				aria-label='Global'
				className='flex items-center justify-between p-6 lg:px-8'
			>
				<div className='flex lg:flex-1'>
					<Logo title='Next Starter Pro' href='/' />
				</div>
				<div className='flex lg:hidden'>
					<button
						type='button'
						onClick={() => setMobileMenuOpen(true)}
						className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
					>
						<span className='sr-only'>Open main menu</span>
						<Bars3Icon aria-hidden='true' className='h-6 w-6' />
					</button>
				</div>
				<div className='hidden lg:flex lg:gap-x-12'>
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className='text-sm font-semibold leading-6 text-gray-900'
						>
							{item.name}
						</Link>
					))}
				</div>
				<div className='hidden lg:flex lg:flex-1 lg:justify-end space-x-2'>
					<ModeToggle />
					{session ? (
						<AuthenticatedAvatar session={session} />
					) : (
						<Button asChild variant={'outline'}>
							<Link href='/login'>Log in</Link>
						</Button>
					)}
				</div>
			</nav>
			<Dialog
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
				className='lg:hidden'
			>
				<div className='fixed inset-0 z-50' />
				<DialogPanel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
					<div className='flex items-center justify-between'>
						<Logo href='/' labelShown={true} title='Next Starter Pro' />
						<button
							type='button'
							onClick={() => setMobileMenuOpen(false)}
							className='-m-2.5 rounded-md p-2.5 text-gray-700'
						>
							<span className='sr-only'>Close menu</span>
							<XMarkIcon aria-hidden='true' className='h-6 w-6' />
						</button>
					</div>
					<div className='mt-6 flow-root'>
						<div className='-my-6 divide-y divide-gray-500/10'>
							<div className='space-y-2 py-6'>
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
									>
										{item.name}
									</Link>
								))}
							</div>
							<div className='py-6'>
								{session ? (
									<Button asChild variant={'ghost'}>
										<Link href='/dashboard'>
											<Avatar>
												<AvatarImage
													src={session?.user?.image ?? ''}
													alt={session?.user?.name ?? ''}
												/>
												<AvatarFallback>
													{getInitials(session?.user?.name)}
												</AvatarFallback>
											</Avatar>
											<span className='ml-3'>Dashboard</span>
										</Link>
									</Button>
								) : (
									<Button asChild variant={'outline'}>
										<Link href='/login'>Log in</Link>
									</Button>
								)}
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	)
}
