'use client'

import Link from 'next/link'
import { Session } from 'next-auth'

import { getInitials } from '@/lib/generate-initials'
import LogoutBtn from './logout-btn'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function AuthenticatedAvatar({
	session,
}: {
	session: Session | null
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='cursor-pointer' asChild>
				<Avatar>
					<AvatarImage
						src={session?.user.image ?? ''}
						alt={session?.user.name ?? ''}
					/>
					<AvatarFallback>{getInitials(session?.user?.name)}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>
					<p>{session?.user?.name}</p>
					<p className=' text-xs text-muted-foreground'>
						{session?.user?.email}
					</p>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href='/dashboard'>Dashboard</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>Services</DropdownMenuItem>
				{/* <DropdownMenuItem>Team</DropdownMenuItem> */}
				<DropdownMenuItem>
					<LogoutBtn />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
