import jwtUser from "../models/middlewareTypes";

declare global {
    namespace Express {
        interface Request {
            user?: jwtUser
        }
    }
}

export { }