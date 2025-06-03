import { PrismaClient } from "../generated/prisma";
import { Symbolic } from "uuniq/dist/main";
import { CustomHandler } from "../types/handler";
import { CreateProductRequest, CreateProductResponse, DeleteProductResponse, GetProductResponse, GetProductsResponse, UpdateProductRequest, UpdateProductResponse } from "../models/productTypes";

const prisma = new PrismaClient();
const SymbolicID = new Symbolic();

export const getProducts: CustomHandler<{}, GetProductsResponse> = async (req, res): Promise<void> => {
    try {
        const products = await prisma.product.findMany();
        if (!products || products.length === 0) {
            res.status(400).json({
                status: "false",
                message: "Ürün bulunamadı!",
                data: null
            });
        }
        res.status(200).json({
            status: "success",
            message: "Ürünler başarıyla getirildi!",
            data: products,
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: null
        });
    }
};

export const getProduct: CustomHandler<{ id: string }, GetProductResponse> = async (req, res): Promise<void> => {
    const id = req.params.id;
    try {
        const product = await prisma.product.findFirst({
            where: { id },
        });

        if (!product) {
            res.status(400).json({
                status: "false",
                message: "Ürün bulunamadı!",
                data: null
            });

        }

        res.status(200).json({
            status: "success",
            message: "Ürün başarıyla getirildi!",
            data: product,
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: null
        });
    }
};

export const createProduct: CustomHandler<{}, CreateProductResponse, CreateProductRequest> = async (req, res): Promise<void> => {
    const { name, description, price, stock, image, categoryName } = req.body;

    try {
        const existingProduct = await prisma.product.findFirst({
            where: { name },
        });

        if (existingProduct) {
            res.status(400).json({
                status: "false",
                message: "Böyle bir ürün mevcut!",
            });

        }

        const category = await prisma.category.findFirst({
            where: { name: categoryName },
        });

        if (!category) {
            res.status(400).json({
                status: "false",
                message: "Seçtiğiniz kategori bulunamadı!",
                data: null
            });

        }

        const newProduct = await prisma.product.create({
            data: {
                id: SymbolicID.generate(),
                name,
                description,
                price,
                stock,
                image,
                categoryId: category!.id,
            },
        });

        if (!newProduct) {
            res.status(404).json({
                status: "false",
                message: "Ürün oluşturulamadı!",
            });

        }

        res.status(201).json({
            status: "success",
            message: "Ürün başarıyla oluşturuldu!",
            data: newProduct,
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: null
        });
    }
};

export const updateProduct: CustomHandler<{ id: string }, UpdateProductResponse, UpdateProductRequest> = async (req, res): Promise<void> => {
    const id = req.params.id;
    const { name, description, price, stock, image, categoryName } = req.body;

    try {
        const product = await prisma.product.findFirst({ where: { id } });
        if (!product) {
            res.status(400).json({
                status: "false",
                message: "Ürün bulunamadı!",
            });

        }

        const category = await prisma.category.findFirst({ where: { name: categoryName } });
        if (!category) {
            res.status(400).json({
                status: "false",
                message: "Kategori bulunamadı!",
            });

        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                stock,
                image,
                categoryId: category!.id,
            },
        });

        if (!updatedProduct) {
            res.status(404).json({
                status: "false",
                message: "Ürün güncellenemedi!",
            });

        }

        res.status(200).json({
            status: "success",
            message: "Ürün başarıyla güncellendi!",
            data: updatedProduct,
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

export const deleteProduct: CustomHandler<{ id: string }, DeleteProductResponse> = async (req, res): Promise<void> => {
    const id = req.params.id;

    try {
        const product = await prisma.product.findFirst({ where: { id } });
        if (!product) {
            res.status(400).json({
                status: "false",
                message: "Ürün bulunamadı!",
            });
        }
        await prisma.product.delete({ where: { id } });

        res.status(200).json({
            status: "success",
            message: "Ürün başarıyla silindi!"
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
