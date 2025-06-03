import { PrismaClient } from "../generated/prisma";
import { Symbolic } from "uuniq/dist/main";
import { CustomHandler } from "../types/handler";
import { CreateTableRequest, CreateTableResponse, DeleteTableResponse, GetTableResponse, GetTablesResponse, UpdateTableRequest, UpdateTableResponse } from "../models/tableTypes";

const prisma = new PrismaClient();
const symbolicID = new Symbolic();

export const getTables: CustomHandler<{}, GetTablesResponse> = async (req, res): Promise<void> => {
    try {
        const tables = await prisma.table.findMany({
            include: {
                orders: {
                    include: {
                        items: {
                            include: { product: true }
                        },
                        user: true
                    }
                }
            }
        });
        if (!tables || tables.length === 0) {
            res.status(400).json({
                status: "false",
                message: "Masa bulunamadı!",
                data: null
            })
        };

        res.status(200).json({
            status: "success",
            message: "Masalar başarıyla getirildi!",
            data: tables
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: null
        })
    }
};

export const getTable: CustomHandler<{ id: string }, GetTableResponse> = async (req, res): Promise<void> => {
    const id = req.params.id;
    try {
        const table = await prisma.table.findFirst({ where: { id: id } });
        if (!table) {
            res.status(400).json({
                status: "false",
                message: "Masa bulunamadı!",
                data: null
            })
        };

        res.status(200).json({
            status: "success",
            message: "Masa başarıyla bulundu!",
            data: table
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: null
        });
    }
}

export const createTable: CustomHandler<{}, CreateTableResponse, CreateTableRequest> = async (req, res): Promise<void> => {
    try {
        const { name, status } = req.body;
        const table = await prisma.table.findFirst({ where: { name: name } });
        if (table) {
            res.status(400).json({
                status: "false",
                message: "Böyle bir masa mevcut",
            })
        };

        const newTable = await prisma.table.create({
            data: {
                id: symbolicID.generate(),
                name: name,
                status: status
            }
        });

        if (!newTable) {
            res.status(400).json({
                status: "false",
                message: "Masa oluşturulamadı!"
            })
        }

        res.status(201).json({
            status: "success",
            message: "Masa başarıyla oluşturuldu!",
            data: newTable
        })
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message,
        })
    }
};

export const updateTable: CustomHandler<{ id: string }, UpdateTableResponse, UpdateTableRequest> = async (req, res) => {
    const id = req.params.id;
    try {
        const { name, status } = req.body;
        const table = await prisma.table.findFirst({ where: { id: id } });
        if (!table) {
            res.status(400).json({
                status: "false",
                message: "Böyle bir masa bulunamadı!",
            })
        };

        const updatedTable = await prisma.table.update({
            where: { id: id },
            data: { name: name, status: status }
        });

        if (!updatedTable) {
            res.status(400).json({
                status: "false",
                message: "Masa güncellenirken bir hata oluştu!"
            })
        };

        res.status(200).json({
            status: "success",
            message: "Masa başarıyla güncellendi!",
            data: updatedTable
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const deleteTable: CustomHandler<{ id: string }, DeleteTableResponse> = async (req, res): Promise<void> => {
    const id = req.params.id
    try {
        const table = await prisma.table.findFirst({ where: { id: id } });
        if (!table) {
            res.status(400).json({
                status: "false",
                message: "Masa bulunamadı!"
            });
        };

        const deletedTable = await prisma.table.delete({ where: { id: id } });

        if (!deletedTable) {
            res.status(400).json({
                status: "false",
                message: "Masa silinirken bir hata oluştu!"
            });
        };

        res.status(200).json({
            status: "success",
            message: "Masa başarıyla silindi!"
        })
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}