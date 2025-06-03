import { Table } from "../generated/prisma";

export type GetTablesResponse = {
    status: string;
    message: string;
    data: Table[] | null;
};

export type GetTableResponse = {
    status: string;
    message: string;
    data: Table | null;
};

export type CreateTableResponse = {
    status: string;
    message: string;
    data?: Table | null
};

export type CreateTableRequest = {
    name: string;
    status: string;
};

export type UpdateTableResponse = {
    status: "success" | "false" | "error"
    message: string;
    data?: Table | null;
};

export type UpdateTableRequest = {
    name: string;
    status: string;
};

export type DeleteTableResponse = {
    status: "success" | "false" | "error"
    message: string;
};