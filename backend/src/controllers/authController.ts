import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { PrismaClient, User } from "../generated/prisma";
import { Symbolic } from "uuniq/dist/main";
import hashedPassword from '../utils/hashedPassword';
import { CustomHandler } from '../types/handler';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../models/authTypes';

const prisma = new PrismaClient();
const SymbolicID = new Symbolic();

export const register: CustomHandler<{}, RegisterResponse, RegisterRequest> = async (req, res): Promise<void> => {
    const { username, email, password, image } = req.body;

    try {
        const hashedPass = await hashedPassword(password);

        const user: User | any = await prisma.user.findFirst({
            where: { email: email }
        })

        if (user) res.status(400).json({
            status: 'false',
            message: 'Bu email veya username kullanılıyor!'
        })

        const newUser = await prisma.user.create({
            data: {
                id: SymbolicID.generate(),
                username: username,
                email: email,
                password: hashedPass,
                image: image,
                status: "user"
            }
        })

        if (!newUser) res.status(404).json({
            status: 'false',
            message: 'Kayıt olma başarısız!'
        })

        res.status(200).json({
            status: 'success',
            message: 'Başarıyla kayıt olundu!'
        })

    } catch (error: any) {
        res.status(500).json({
            status: 'false',
            message: error.message
        })
    }
};

export const login: CustomHandler<{}, LoginResponse, LoginRequest> = async (req, res): Promise<void> => {
    const { username, password } = req.body;

    try {
        const user: User | any = await prisma.user.findFirst({
            where: { username: username }
        });

        if (!user) res.status(404).json({
            status: 'false',
            message: 'Böyle bir kullanıcı bulunamadı!'
        });

        if (await !bcrypt.compare(password, user.password)) res.status(404).json({
            status: 'false',
            message: 'Şifre yanlış!'
        });

        const token = jwt.sign({ id: user.id, email: user.email, status: user.status }, process.env.JWT_KEY || "JWTCODE", { expiresIn: "1d" })

        res.status(200).json({
            status: 'success',
            message: 'Başarıyla giriş yapıldı!',
            token: token
        })

    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}