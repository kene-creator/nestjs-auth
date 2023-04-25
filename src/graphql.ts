
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    email: string;
    hash: string;
    createdAt?: Nullable<DateTime>;
}

export class SigninUser {
    email: string;
    password: string;
}

export class User {
    id: string;
    email: string;
    hash: string;
    hashRt?: Nullable<string>;
    createdAt: DateTime;
}

export class SigninPayload {
    access_token: string;
    refresh_token: string;
}

export class SignoutPayload {
    message: string;
}

export class RefreshTokenPayload {
    accessToken: string;
}

export class AuthPayload {
    accessToken: string;
    refreshToken: string;
}

export abstract class IQuery {
    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;
}

export abstract class IMutation {
    abstract signinUser(signinUser: SigninUser): SigninPayload | Promise<SigninPayload>;

    abstract signoutUser(): SignoutPayload | Promise<SignoutPayload>;

    abstract refreshToken(refreshToken: string): RefreshTokenPayload | Promise<RefreshTokenPayload>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;
}

export type DateTime = any;
type Nullable<T> = T | null;
