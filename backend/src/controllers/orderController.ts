import { PrismaClient } from "../generated/prisma";
import { Symbolic } from "uuniq/dist/main";
import { CustomHandler } from "../types/handler";
import { CreateOrderRequest, CreateOrderResponse, GetOrdersResponse, PaymentOrderRequest, PaymentOrderResponse } from "../models/orderTypes";
import { Request, Response } from "express";
import jwtUser from "../models/middlewareTypes";

const prisma = new PrismaClient();
const symbolicID = new Symbolic();


interface AuthenticatedRequest extends Request {
    user?: jwtUser;
}

export const getOrders: CustomHandler<{}, GetOrdersResponse> = async (req, res): Promise<void> => {
    try {
        const orders = await prisma.order.findMany({ include: { items: { include: { product: true } }, user: true, table: true, } });
        if (!orders || orders.length == 0) {
            res.status(400).json({
                status: "false",
                message: "Siparişler bulunamadı!",
                data: null
            });
        };

        res.status(200).json({
            status: "success",
            message: "Siparişler başarıyla getirildi!",
            data: orders
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: null
        });
    }
}

export const createOrder = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const user = req.user;
    try {
        const { tableName, items } = req.body;
        const total = items.reduce((sum: any, item: any) => sum + item.quantity * item.price, 0);
        const table = await prisma.table.findFirst({ where: { name: tableName } });

        if (!table) {
            res.status(400).json({
                status: "false",
                message: "Böyle bir masa bulunamadı!",
                data: null
            })
        };

        const tableUpdated = await prisma.table.update({
            where: { id: table?.id },
            data: {
                name: table?.name,
                status: "full"
            }
        })

        if (!tableUpdated) {
            res.status(400).json({
                status: "false",
                message: "Masa güncellenemedi!",
                data: null
            });
        };
        console.log(user?.id)

        const newOrder = await prisma.order.create({
            data: {
                id: symbolicID.generate(),
                userId: user?.id as string,
                tableId: table?.id as string,
                status: "pending",
                total: total,
                items: {
                    create: items.map((item: { productId: any; quantity: any; price: any; }) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: { items: true }
        });

        if (!newOrder) {
            res.status(400).json({
                status: "false",
                message: "Sipariş oluşturulurken bir hata oluştu!",
                data: null
            });
        };

        res.status(201).json({
            status: "success",
            message: "Başarıyla sipariş oluşturuldu!",
            data: newOrder
        });

    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: null
        });
    }
}

export const paymentOrder: CustomHandler<{ id: string }, PaymentOrderResponse, PaymentOrderRequest> = async (req, res): Promise<void> => {
    const id = req.params.id;
    try {
        const { status } = req.body;
        const order = await prisma.order.update({
            where: { id: id },
            data: {
                status: status
            }
        });

        if (!order) {
            res.status(400).json({
                status: "false",
                message: "Böyle bir sipariş bulunamadı!"
            });
        };

        const table = await prisma.table.update({
            where: { id: order.tableId },
            data: {
                status: "empty"
            }
        });

        if (!table) {
            res.status(400).json({
                status: "false",
                message: "Masa durumu güncellenemedi!"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Başarıyla sipariş ödendi!"
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}