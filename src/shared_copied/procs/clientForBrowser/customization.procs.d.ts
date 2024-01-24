interface ICustomizationProcs_CFB {
    // Types.Global.IResponse
    'CFBProc::customization.action.complete': (gender: boolean) => Promise<string>;

    'CFBProc::customization.req.customization': () => Promise<string>;
    'CFBProc::customization.req.customizationLimits': () => Promise<string>;
    'CFBProc::customization.req.clothes.list': () => Promise<string>;
}
