export declare const verifyUser: (email: string, pass: string) => Promise<{
    success: boolean;
    message?: string;
    user?: any;
}>;