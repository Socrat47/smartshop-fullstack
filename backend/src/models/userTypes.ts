import { User } from "../generated/prisma"

export type GetUsersResponse = {
    status: string;
    data: User[] | null;
    message: string;
}

export type GetUserResponse = {
    status: string;
    data: User | null;
    message: string;
}

export type GetUserByUsernameResponse = {
    status: string;
    data: User | null;
    message: string;
}

export type CreateUserResponse = {
    status: string;
    data?: User;
    message: string;
}

export type CreateUserRequest = {
    username: string;
    email: string;
    password: string;
    image: string;
    status: string;
}

export type UpdateUserResponse = {
    status: string;
    data?: User;
    message: string;
};

export type UpdateUserRequest = {
    username?: string;
    email?: string;
    password?: string;
    image?: string;
    status?: string;
}

export type DeleteUserResponse = {
    status: string;
    message: string;
}