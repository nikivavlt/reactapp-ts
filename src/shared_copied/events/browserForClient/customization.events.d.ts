interface ICustomizationEvents_BFC {
    'BFC::customization.enable': () => any;
    'BFC::customization.disable': () => any;
    // Types.Customization.ICustomization
    'BFC::customization.sendCustomization': (data: string) => any;
    // Types.Customization.ICustomizationLimits
    'BFC::customization.sendCustomizationLimits': (data: string) => any;
    // number[]
    'BFC::customization.sendCustomizationFaceFeatures': (data: string) => any;
    // Types.Customization.IHeadOverlayItem[]
    'BFC::customization.sendCustomizationHeadOverlays': (data: string) => any;
}
