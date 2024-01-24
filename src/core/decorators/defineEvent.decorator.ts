/**
 * @description Метод должен быть статическим
 * @param eventName string
 * @returns
 */
function onEvent<E extends keyof Events.Browser>(eventName: E) {
	return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Events.Browser[E]>) => {
		if (target.constructor.name === 'Function') {
			const callback = (...args: any[]) => {
				(target[propertyKey] as Function).apply(target, args);

				console.log(`Called event "${eventName}" with args: ${JSON.stringify(args)}`);
			};

			try {
				// @ts-ignore
				mp.events.add(eventName, callback);

				console.log(`Registred event "${eventName}"`);
			} catch (error) {
				console.log(`[Catch] Registred event "${eventName}"`);
			}
		}
	};
}

export { onEvent };
