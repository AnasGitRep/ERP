export interface ResponseModel<T> {
    items: T[];
    item: T;
    token: string | null;
    isOk: boolean;
    message: string | null;
    refreshToken:string|null;
}