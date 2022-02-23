import * as React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import clsx from 'clsx';

// Interfaces
import { Images, User } from 'interfaces';

// Antd library
import { ShoppingOutlined } from '@ant-design/icons';
import { Badge, Input } from 'antd';

import { Divider } from 'components/divider';

const { Search } = Input;

interface Header_Props {
	custom_header_color?: string;
	setShow_ShoppingCart: React.Dispatch<React.SetStateAction<boolean>>;

	shoppinCart_items_count?: number;
	user?: User;
}

export const Header: React.FC<Header_Props> = ({
	custom_header_color = '#F8EAFF',
	setShow_ShoppingCart,

	user,
	shoppinCart_items_count = 0,
}) => {
	const onSearch = (searchValue: string) => {
		console.log('-- HEADER , search input value -- ', searchValue);
	};

	return (
		<div
			className="header flex flex-wrap justify-between items-center sticky top-0 z-50 w-full mb-14 px-25"
			style={{ background: custom_header_color }}
		>
			{/* Logo */}
			<Link href={'/'}>
				<a>
					<img src={Images.logo_letters} className="logo w-[100px] h-[70px]" />
				</a>
			</Link>

			{/* Categories */}
			<div className="categories flex flex-wrap justify-between items-center gap-2">
				<Link href={'#News'}>
					<h5 className="text-lg font-extrabold">News</h5>
				</Link>

				<Divider className="w-4" />

				<Link href={'#Women'}>
					<h5 className="text-lg font-extrabold">Women</h5>
				</Link>

				<Divider className="w-4" />

				<Link href={'#Men'}>
					<h5 className="text-lg font-extrabold">Men</h5>
				</Link>
			</div>

			{/* Icons and button */}
			<div
				className={clsx(
					'flex flex-wrap items-center',
					{ 'gap-14': !user },
					{ 'gap-4': user }
				)}
			>
				<div className="flex flex-wrap gap-4">
					<Search placeholder="Search" onSearch={onSearch} />

					<Badge count={shoppinCart_items_count} overflowCount={8}>
						<ShoppingOutlined
							className="w-6 h-6"
							onClick={() => {
								setShow_ShoppingCart(true);
							}}
						/>
					</Badge>
				</div>

				{!user && (
					<Link href={'/auth/signin'}>
						<button
							className={clsx(
								'bg-black rounded-lg',
								'text-lg font-bold text-white',
								'w-[100px] h-[50px] px-4 py-3'
							)}
						>
							Log in
						</button>
					</Link>
				)}

				{user && (
					<button
						onClick={() => signOut({ callbackUrl: '/' })}
						className={clsx(
							'text-lg font-semibold text-gray-800',
							'rounded-lg px-4 py-3'
						)}
					>
						Log out
					</button>
				)}
			</div>
		</div>
	);
};

export default Header;
