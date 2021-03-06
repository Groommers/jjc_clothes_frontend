import * as React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

// local components
import { Divider } from 'components/divider';

// interfaces
import { Images, Product, ShoppingCart, User } from 'interfaces';

// antd
import { Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { patch_shoppingCart_add_product } from 'api';
import {
	RefetchOptions,
	RefetchQueryFilters,
	QueryObserverResult,
} from 'react-query';

export interface Home_banner_props {
	product: Product;
	user: User;
	shoppingCart_refetch?: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<ShoppingCart | undefined, unknown>>;
}

const Home_banner: React.FC<Home_banner_props> = ({
	product,
	user,
	shoppingCart_refetch,
}) => {
	const add_to_shoppingCart = async () => {
		const product_data = { quantity: 1, product: product._id };

		if (user && user.access_token) {
			const add_response = await patch_shoppingCart_add_product(
				user.access_token,
				user.shoppingCart._id,
				product_data
			);

			if (shoppingCart_refetch) {
				shoppingCart_refetch();
			}

			if (add_response.status != 200) {
				console.log(
					'-- Banner component, add to shopping cart response --',
					add_response
				);
			}
		}
	};

	return (
		<div
			className={clsx(
				'banner flex justify-between w-full bg-orange-101 rounded-lg',
				'mb-28 xl:mb-36 2xl:mb-72 pr-28 py-8'
			)}
		>
			{/* Imagen */}
			<Link href={`/product?product_id=${product._id}`}>
				<div className="relative flex justify-center w-1/2">
					<img
						src={product.gallery[4]}
						className={clsx(
							'absolute xl:top-[10%] 2xl:top-0',
							'w-[300px] h-[400px] lg:w-[324px] lg:h-[466px] xl:w-[348px] xl:h-[532px] 2xl:w-[396px] 2xl:h-[600px]'
						)}
					/>
				</div>
			</Link>

			{/* Text info */}
			<div className="relative flex flex-col w-1/2">
				{/* Background images */}
				<img src={Images.lines_banner} className="absolute right-0 top-0 z-0" />

				{/* Name */}
				<h1 className="text-[60px] font-medium z-10">{product.title}</h1>

				<Divider
					className="w-[100px] mb-6 z-10"
					custom_divider_color="#000000"
				/>

				{/* Description */}
				<h4 className="text-base mb-4 z-10">{product.description}</h4>

				<Divider
					className="w-[100px] mb-8 z-10"
					custom_divider_color="#000000"
				/>

				{/* Buttons */}
				<div className="container-antd flex flex-wrap gap-14 z-10">
					<Button
						icon={<ShoppingCartOutlined />}
						onClick={add_to_shoppingCart}
						className={clsx(
							'flex justify-center items-center gap-2',
							'text-xl text-white text-bold',
							'p-4'
						)}
					>
						Add to Cart
					</Button>

					<Link href={`/product?product_id=${product._id}`}>
						<Button
							ghost
							className="text-xl text-bold text-center bg-orange-101 px-9"
						>
							Details
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home_banner;
