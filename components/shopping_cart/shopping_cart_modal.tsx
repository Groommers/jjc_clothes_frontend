import * as React from 'react';
import {
	Product_Item,
	ShoppingCart,
	ShoppingCart_Update,
	User,
} from 'interfaces';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import clsx from 'clsx';
import ShoppingCart_Item from './shopping_cart_item';
import { Divider } from 'components/divider';
import { Button } from 'antd';
import Link from 'next/link';
import { patch_shoppingCart_update } from 'api';
import {
	RefetchOptions,
	RefetchQueryFilters,
	QueryObserverResult,
} from 'react-query';
import { calculate_roundUp, calculate_PriceDiscount } from 'lib';

interface ShoppingCartModal_props {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

	user?: User;

	shoppingCart_data: ShoppingCart;
	shoppingCart_refetch?: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<ShoppingCart | undefined, unknown>>;
}

export const ShoppingCart_Modal: React.FC<ShoppingCartModal_props> = ({
	isOpen,
	setIsOpen,
	user,

	shoppingCart_data,
	shoppingCart_refetch,
}) => {
	const { subtotal, items } = shoppingCart_data;
	const [current_subtotal, setCurrent_subtotal] =
		React.useState<number>(subtotal);

	const remove_from_shoppingCart = async (product_id: string) => {
		if (user && user.access_token) {
			// Filter items matching id
			const items_filtered = items.filter((item: Product_Item) => {
				return item.product._id != product_id;
			});

			const new_shoppingCart: ShoppingCart_Update = {
				items: items_filtered.map((item: Product_Item) => {
					return { quantity: item.quantity, product: item.product._id };
				}),
			};

			// Update shopping cart backend call
			const update_response = await patch_shoppingCart_update(
				user.access_token,
				user.shoppingCart._id,
				new_shoppingCart
			);

			if (shoppingCart_refetch) shoppingCart_refetch();

			if (update_response.status != 200) {
				console.log(
					'-- Shopping cart modal, remove item response --',
					update_response
				);
			}
		}
	};

	const add_quantity_from_shoppingCart = async (product_id: string) => {
		if (user && user.access_token) {
			// Filter items matching id
			const items_add = items.map((item: Product_Item) => {
				if (product_id === item.product._id) {
					return { ...item, quantity: item.quantity + 1 };
				} else {
					return item;
				}
			});

			const new_shoppingCart: ShoppingCart_Update = {
				items: items_add.map((item: Product_Item) => {
					return { quantity: item.quantity, product: item.product._id };
				}),
			};

			// Update shopping cart backend call
			const update_response = await patch_shoppingCart_update(
				user.access_token,
				user.shoppingCart._id,
				new_shoppingCart
			);

			if (shoppingCart_refetch) shoppingCart_refetch();

			if (update_response.status != 200) {
				console.log(
					'-- Shopping cart modal, remove item response --',
					update_response
				);
			}
		}
	};

	const substract_quantity_from_shoppingCart = async (product_id: string) => {
		if (user && user.access_token) {
			// Filter items matching id
			const items_substract = items.map((item: Product_Item) => {
				if (product_id === item.product._id) {
					return { ...item, quantity: item.quantity - 1 };
				} else {
					return item;
				}
			});

			const new_shoppingCart: ShoppingCart_Update = {
				items: items_substract.map((item: Product_Item) => {
					return { quantity: item.quantity, product: item.product._id };
				}),
			};

			// Update shopping cart backend call
			const update_response = await patch_shoppingCart_update(
				user.access_token,
				user.shoppingCart._id,
				new_shoppingCart
			);

			if (shoppingCart_refetch) shoppingCart_refetch();

			if (update_response.status != 200) {
				console.log(
					'-- Shopping cart modal, remove item response --',
					update_response
				);
			}
		}
	};

	// Calculate current total
	React.useEffect(() => {
		// if items is not undefined
		if (items) {
			let new_total = 0;
			items.forEach((item: Product_Item) => {
				new_total +=
					calculate_PriceDiscount(item.product.price, item.product.discount) *
					item.quantity;
			});
			setCurrent_subtotal(new_total);
		}
	}, [items]);

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-10 overflow-y-auto w-full h-full"
				onClose={() => setIsOpen(false)}
			>
				<div className="flex justify-center w-full h-full pt-[80px]">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>

					{/* Transition of content */}
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						{/* Container of the modal */}
						<div
							className={clsx(
								'transform transition-all overflow-auto ',
								'flex flex-col',
								'bg-white shadow-xl rounded-2xl w-[1120px]'
							)}
						>
							{/* Go to detail */}
							<Link href={'/shoppingCart'}>
								<h1 className="text-lg text-gray-500 font-medium underline text-right mr-6 mt-4">
									Details
								</h1>
							</Link>

							{/* Items */}
							{items.map((product_item: Product_Item, key: number) => {
								return (
									<div key={key} className="w-full">
										<ShoppingCart_Item
											product_item={product_item}
											remove_from_shoppingCart={remove_from_shoppingCart}
											add_quantity={add_quantity_from_shoppingCart}
											substract_quantity={substract_quantity_from_shoppingCart}
										/>
										<Divider
											className="self-center w-[1020px]"
											custom_divider_color="#000000"
										/>
									</div>
								);
							})}

							{/* Subtotal */}
							<div className="flex justify-end items-center gap-6 mt-10 mb-10 px-14">
								<h3 className="text-xl text-gray-701">Subtotal</h3>
								<h1 className="text-2xl font-semibold">{`${calculate_roundUp(
									current_subtotal
								)} $`}</h1>
							</div>

							{/* Button */}
							<Link href={'/payment'}>
								<div className="container-antd">
									<Button className="self-center text-center rounded-lg w-[80%] mb-10 py-4">
										Checkout
									</Button>
								</div>
							</Link>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default ShoppingCart_Modal;
