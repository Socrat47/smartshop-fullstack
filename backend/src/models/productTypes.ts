import { Product } from "../generated/prisma";

export type GetProductsResponse = {
    status: string;
    message: string;
    data: Product[] | null;
}

export type GetProductResponse = {
    status: string;
    message: string;
    data: Product | null;
}

export type CreateProductResponse = {
    status: string;
    message: string;
    data?: Product | null;
}

export type CreateProductRequest = {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryName: string;
}

export type UpdateProductResponse = {
    status: string;
    message: string;
    data?: Product;
}

export type UpdateProductRequest = Partial<CreateProductRequest>

export type DeleteProductResponse = {
    status: string;
    message: string;
}