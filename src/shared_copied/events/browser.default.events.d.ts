interface IBrowserEvents {
	'chat:push': (text: string) => any;
	'chat:clear': () => any;
	'chat:activate': (toggle: boolean) => any;
	'chat:show': (toggle: boolean) => any;
}
