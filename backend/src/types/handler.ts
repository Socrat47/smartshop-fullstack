import { Request, Response, NextFunction } from 'express';

export type CustomHandler<
    Params = {},
    ResBody = any,
    ReqBody = {},
    ReqQuery = {},
    Locals extends Record<string, any> = {}
> = (
    req: Request<Params, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction
) => any;
