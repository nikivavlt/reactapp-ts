export const convertUnixToDate = (unix: number) => {
	const date = new Date(unix);

	return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${
		date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
	}.${date.getFullYear()}`;
};
