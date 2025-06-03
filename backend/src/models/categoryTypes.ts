import { Category } from "../generated/prisma";

export type GetCategoriesResponse = {
    status: string;
    message: string;
    data: Category[] | null;
}

export type GetCategoryResponse = {
    status: string;
    message: string;
    data: Category | null;
}

export type CreateCategoryResponse = {
    status: string;
    message: string;
    data?: Category;
}

export type CreateCategoryRequest = {
    name: string;
}

export type UpdateCategoryResponse = {
    status: string;
    message: string;
    data?: Category;
}

export type UpdateCategoryRequest = {
    name?: string;
}

export type DeleteCategoryResponse = {
    status: string;
    message: string;
}