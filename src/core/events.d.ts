declare global {
    interface EventMpPool {
        callProcEx<T = any>(procName: string, ...args: any[]): Promise<Types.Global.IResponse<T>>;
    }
}

export {};
