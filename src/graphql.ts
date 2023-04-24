
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class User {
    id: string;
    email: string;
    hash: string;
    hashRt?: Nullable<string>;
    createdAt: DateTime;
}

export class CreateUser {
    email: string;
    hash: string;
    hashRt?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
}

export class SigninPayload {
    accessToken: string;
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
    abstract signinUser(email: string, hash: string, hashRt?: Nullable<string>): AuthPayload | Promise<AuthPayload>;

    abstract signoutUser(): SignoutPayload | Promise<SignoutPayload>;

    abstract refreshToken(refreshToken: string): RefreshTokenPayload | Promise<RefreshTokenPayload>;

    abstract createUser(email: string, hash: string, hashRt?: Nullable<string>): CreateUser | Promise<CreateUser>;
}

export type DateTime = any;
type Nullable<T> = T | null;
