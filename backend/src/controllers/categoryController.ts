import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import { Symbolic } from "uuniq/dist/main";
import { CustomHandler } from "../types/handler";
import { CreateCategoryRequest, CreateCategoryResponse, DeleteCategoryResponse, GetCategoriesResponse, GetCategoryResponse, UpdateCategoryRequest, UpdateCategoryResponse } from "../models/categoryTypes";

const prisma = new PrismaClient();
const SymbolicID = new Symbolic();

export const getCategories: CustomHandler<{}, GetCategoriesResponse> = async (req, res): Promise<void> => {
    try {
        const categories = await prisma.category.findMany({ include: { products: true } });

        if (!categories) res.status(400).json({
            status: 'false',
            message: 'Kategori bulunamadı!',
            data: null
        });

        res.status(200).json({
            status: 'success',
            message: "Kategoriler başarıyla getirildi!",
            data: categories
        })
    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: 'Kategori Bulunamadı!',
            data: null
        })
    }
}

export const getCategory: CustomHandler<{ id: string }, GetCategoryResponse> = async (req, res): Promise<void> => {
    const id = req.params.id;
    try {
        const category = await prisma.category.findFirst({
            where: { id: id }
        })

        if (!category) res.status(400).json({
            status: 'false',
            message: 'Kategori bulunamadı!',
            data: null
        })

        res.status(200).json({
            status: 'success',
            message: "Kategori başarıyla getirildi!",
            data: category
        })
    } catch (error: any) {
        res.status(200).json({
            status: 'error',
            message: error.message,
            data: null
        })
    }
}

export const createCategory: CustomHandler<{}, CreateCategoryResponse, CreateCategoryRequest> = async (req, res): Promise<void> => {
    const { name } = req.body;
    try {
        const category = await prisma.category.findFirst({
            where: { name: name }
        })

        if (category) res.status(400).json({
            status: 'false',
            message: 'Böyle bir kategori mevcut!'
        })

        const newCategory = await prisma.category.create({
            data: {
                id: SymbolicID.generate(),
                name: name
            }
        })

        if (!newCategory) res.status(400).json({
            status: 'false',
            message: 'Kategori oluşturulurken bir hata oluştu!'
        })

        res.status(201).json({
            status: 'success',
            message: 'Kategori başarıyla oluşturuldu!',
            data: newCategory
        })
    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }

}

export const updateCategory: CustomHandler<{ id: string }, UpdateCategoryResponse, UpdateCategoryRequest> = async (req, res): Promise<void> => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        const category = await prisma.category.findFirst({
            where: {
                id: id
            }
        })

        if (!category) res.status(400).json({
            status: 'false',
            message: 'Kategori Bulunamadı!'
        })

        const updateCategory = await prisma.category.update({
            where: { id: id },
            data: {
                name: name
            }
        })

        if (!updateCategory) res.status(400).json({
            status: 'false',
            message: 'Kategori oluşturulamadı!'
        })

        res.status(200).json({
            status: 'success',
            message: 'Kategori başarıyla güncellendi!',
            data: updateCategory
        })

    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

export const deleteCategory: CustomHandler<{ id: string }, DeleteCategoryResponse> = async (req, res): Promise<void> => {
    const id = req.params.id;
    try {
        const category = await prisma.category.findFirst({
            where: { id: id }
        })

        if (!category) res.status(400).json({
            status: 'false',
            message: 'Kategori bulunamadı!'
        })

        const deleteCategory = await prisma.category.delete({
            where: { id: id }
        })

        if (!deleteCategory) res.status(400).json({
            status: 'false',
            message: 'Kategori silinemedi!'
        })

        res.status(200).json({
            status: 'success',
            message: 'Kategori başarıyla silindi!'
        })
    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}