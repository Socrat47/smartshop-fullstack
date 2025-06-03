import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtUser from '../models/middlewareTypes';

interface AuthenticatedRequest extends Request {
    user?: jwtUser;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: 'Yetkisiz giriş!' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "JWTCODE") as jwtUser;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Geçersiz token!" });
        return
    }
};

export default authMiddleware;
