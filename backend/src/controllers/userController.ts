import { PrismaClient } from "../generated/prisma";
import hashedPassword from "../utils/hashedPassword";
import { Symbolic } from "uuniq";
import { CustomHandler } from "../types/handler";
import { GetUsersResponse, GetUserResponse, CreateUserResponse, CreateUserRequest, UpdateUserResponse, UpdateUserRequest, DeleteUserResponse, GetUserByUsernameResponse } from "../models/userTypes";

const prisma = new PrismaClient();
const SymbolicID = new Symbolic();

export const getUsers: CustomHandler<{}, GetUsersResponse> = async (req, res): Promise<void> => {
    try {
        const users = await prisma.user.findMany();
        if (!users) {
            res.status(400).json({
                status: "false",
                message: "Kullanıcı bulunamadı!",
                data: null
            });
        }

        res.status(200).json({
            status: "success",
            message: "Kullanıcılar başarıyla getirildi!",
            data: users
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: null
        });
    }
};

export const getUser: CustomHandler<{ id: string }, GetUserResponse> = async (req, res): Promise<void> => {
    const id = req.params.id;

    try {
        const user = await prisma.user.findFirst({ where: { id } });

        if (!user) {
            res.status(400).json({
                status: "false",
                message: "Kullanıcı Bulunamadı!",
                data: null
            });
        }

        res.status(200).json({
            status: "success",
            message: "Kullanıcı başarıyla getirildi!",
            data: user
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: null
        });
    }
};

export const getUserByUsername: CustomHandler<{ username: string }, GetUserByUsernameResponse> = async (req, res): Promise<void> => {
    const username = req.params.username;
    try {
        const user = await prisma.user.findFirst({
            where: { username: username }
        })
        if (!user) {
            res.status(400).json({
                status: "false",
                message: "Kullanıcı bulunamadı!",
                data: null
            });
        }
        res.status(200).json({
            status: "success",
            message: "Kullanıcı başarıyla getirildi!",
            data: user
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: null
        });
    }
}

export const createUser: CustomHandler<{}, CreateUserResponse, CreateUserRequest> = async (req, res): Promise<void> => {
    const { username, email, password, image, status } = req.body;

    try {
        const hashedPass = await hashedPassword(password as string);

        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (user) {
            res.status(404).json({
                status: "false",
                message: "Kayıtlı email veya kullanıcı adı!"
            });
        }

        const newUser = await prisma.user.create({
            data: {
                id: SymbolicID.generate(),
                username: username as string,
                email: email as string,
                password: hashedPass,
                image: image as string,
                status: status || "user"
            }
        });

        res.status(201).json({
            status: "success",
            message: "Kullanıcı başarıyla oluşturuldu",
            data: newUser
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const updateUser: CustomHandler<{ id: string }, UpdateUserResponse, UpdateUserRequest> = async (req, res): Promise<void> => {
    const id = req.params.id;
    const data = req.body;

    try {
        const user = await prisma.user.findFirst({ where: { id } });

        if (!user) {
            res.status(400).json({
                status: "false",
                message: "Böyle bir kullanıcı bulunamadı!"
            });
        }

        let hashedPass: string | undefined;
        if (data.password) {
            hashedPass = await hashedPassword(data.password);
        }

        const updateUser = await prisma.user.update({
            where: { id },
            data: {
                ...data,
                password: hashedPass || data.password
            }
        });

        res.status(200).json({
            status: "success",
            message: "Kullanıcı başarıyla güncellendi!",
            data: updateUser
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const deleteUser: CustomHandler<{ id: string }, DeleteUserResponse> = async (req, res): Promise<void> => {
    const id = req.params.id;

    try {
        const user = await prisma.user.findFirst({ where: { id } });

        if (!user) {
            res.status(400).json({
                status: "false",
                message: "Kullanıcı bulunamadı!"
            });
        }

        await prisma.user.delete({ where: { id } });

        res.status(200).json({
            status: "success",
            message: "Kullanıcı başarıyla silindi!"
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};
