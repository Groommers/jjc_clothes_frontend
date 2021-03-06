import * as React from 'react';
import clsx from 'clsx';

// Interfaces
import { Item_Props } from 'interfaces';
import { Divider } from 'components/divider';
import Link from 'next/link';
import { calculate_roundUp, calculate_PriceDiscount } from 'lib';

export const Item_type_3: React.FC<Item_Props> = ({
	id,
	className,
	product_item,
}) => {
	const [isEnterMouse, setIsEnterMouse] = React.useState<boolean>(false);
	return (
		<Link href={`/product?product_id=${product_item._id}`}>
			<div
				className={clsx(
					`Item_1_${id}`,
					'flex flex-col max-w-[220px]',
					className
				)}
			>
				{/* image */}
				<img
					src={
						!isEnterMouse ? product_item.gallery[0] : product_item.gallery[1]
					}
					onMouseEnter={() => setIsEnterMouse(true)}
					onMouseLeave={() => setIsEnterMouse(false)}
					className="w-[220px] h-[300px]"
				/>

				{/* title */}
				<h3 className="text-xl font-medium text-gray-701 mb-2">
					{product_item.title}
				</h3>

				<div className="flex flex-wrap gap-4">
					{/* discount */}
					{product_item.discount > 0 && (
						<div className="flex flex-col relative mb-2">
							<p className="text-sm text-gray-400">{`${product_item.price} $`}</p>
							<Divider
								custom_divider_color="#D93F3F"
								className="absolute bottom-[35px] w-[40px]"
							/>
						</div>
					)}

					{/* price */}
					<h3 className="text-xl font-medium text-gray-701 mb-6">
						{calculate_roundUp(
							calculate_PriceDiscount(product_item.price, product_item.discount)
						)}{' '}
						$
					</h3>
				</div>
			</div>
		</Link>
	);
};

export default Item_type_3;
