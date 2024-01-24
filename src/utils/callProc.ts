// const _trigger = <E extends keyof Events.Client>(eventName: E, ...args: any[]) => {
// 	try {
// 		// @ts-ignore
// 		mp.trigger(eventName, ...args);
// 	} catch (error) {
// 	} finally {
// 		console.info(`Trigger event ${eventName} with args ${args}`);
// 	}
// };

// export { _trigger };

const callProc = async <T>(procName: keyof Procs.Client, ...args: any[]) => {
    try {
        // @ts-ignore
        // return await mp.events.callProcEx<T>(procName, ...args);

        const raw = (await mp.events.callProc(procName, ...args)) as string;
        const parsed = JSON.parse(raw) as Types.Global.IResponse<T>;

        return parsed;
    } catch (error) {
        console.log(`[Proc][Error] Proc ${procName} returned with error ${error}`);
    } finally {
        console.info(`Call proc ${procName} with args ${args}`);
    }
};

export { callProc };
