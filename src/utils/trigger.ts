const _trigger = <E extends keyof Events.Client>(eventName: E, ...args: any[]) => {
	try {
		// @ts-ignore
		mp.trigger(eventName, ...args);
	} catch (error) {
	} finally {
		console.info(`Trigger event ${eventName} with args ${args}`);
	}
};

export { _trigger };
