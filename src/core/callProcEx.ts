mp.events.callProcEx = async <T>(procName: string, ...args: any[]): Promise<Types.Global.IResponse<T>> => {
    try {
        const raw = (await mp.events.callProc(procName, ...args)) as string;
        const parsed = JSON.parse(raw) as Types.Global.IResponse<T>;

        return parsed;
    } catch (error) {
        console.log(`Proc "${procName}" is failed | ${JSON.stringify(error)}`);

        return { message: `Proc "${procName}" is failed`, ok: false } as Types.Global.IResponse<T>;
    }
};

export {};
