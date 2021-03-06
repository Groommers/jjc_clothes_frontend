// Backend Structure

import {
	RefetchOptions,
	RefetchQueryFilters,
	QueryObserverResult,
} from 'react-query';
import { ShoppingCart } from './shopping_cart';
import { User } from './user';

// Tag
export type Tags = {
	name: string;

	_id: string;
	__v: number;
};

// Category values
export enum Category_Values {
	WOMEN = '620460960c63b0ec8e82d1ca',
	MEN = '620460a40c63b0ec8e82d1cc',
}

// Category
export type Category = {
	name: string;

	_id: string;
	__v: number;
};

// Product
export type Product = {
	title: string;
	price: number;
	discount: number;
	new_item?: boolean;
	description: string;
	composition: string[];
	gallery: string[];
	initial_stock: number;
	stock: number;

	// Relations
	category: Category;
	tags: Tags[];

	_id: string;
	__v: number;
};

// Product item, shopping cart
export type Product_Item = {
	quantity: number;

	// Relations
	product: Product;

	_id?: string;
	__v?: number;
};

// Frontend structure, components
// Item Props
export interface Item_Props {
	id: number;
	className?: string;
	product_item: Product;
	user?: User;
	shoppingCart_refetch?: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<ShoppingCart | undefined, unknown>>;
}
