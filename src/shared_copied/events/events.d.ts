declare namespace Events {
	interface Browser extends EventsBrowserForClient, IBrowserEvents {}
	interface Client extends EventsClientForBrowser {}

	interface All extends Events.Browser, Events.Client {}
}
