import { Order, OrderItem } from "../generated/prisma";

export type GetOrdersResponse = {
    status: "success" | "false" | "error";
    message: string;
    data: Order[] | null;
}

export type CreateOrderResponse = {
    status: "success" | "false" | "error";
    message: string;
    data: Order | null;
};

export type CreateOrderRequest = {
    tableName: string;
    items: OrderItem[];
};

export type PaymentOrderResponse = {
    status: "success" | "false" | "error";
    message: string;
}

export type PaymentOrderRequest = {
    status: string;
}