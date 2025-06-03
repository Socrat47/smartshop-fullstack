export type RegisterResponse = {
    status: string;
    message: string;
}

export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
    image: string;
}

export type LoginResponse = {
    status: string;
    message: string;
    token?: string;
}

export type LoginRequest = {
    username: string;
    password: string;
}