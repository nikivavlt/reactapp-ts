declare namespace Types {
    namespace Customization {
        type Genders = 'Male' | 'Female';
        type Category = 'GENETIC' | 'APPERANCE' | 'PECULIARITIES' | 'CLOTHES';

        enum eFaceFeatures {
            noseWidth = 0,
            noseHeight = 1,
            noseLength = 2,
            noseBridge = 3,
            noseTip = 4,
            noseBridgeShift = 5,
            browHeight = 6,
            browWidth = 7,
            cheekboneHeight = 8,
            cheekboneWidth = 9,
            cheeksWidth = 10,
            eyes = 11,
            lips = 12,
            jawWidth = 13,
            jawHeight = 14,
            chinLength = 15,
            chinPosition = 16,
            chinWidth = 17,
            chinShape = 18,
            neckWidth = 19,
        }

        type ClothesType = 'HAT' | 'TOP' | 'LEGS' | 'SHOES';
        interface IClothesItem {
            gender: boolean;
            type: ClothesType;
            id: string;
        }

        interface ICustomization {
            gender: boolean;
            shapeFirst: number;
            shapeSecond: number;
            shapeThird: number;
            skinFirst: number;
            skinSecond: number;
            skinThird: number;
            shapeMix: number;
            skinMix: number;
            thirdMix: number;
            eyeColor: number;
            hairStyle: number;
            hairColor: number;
            hightlightColor: number;

            // number (float) array of 20 elems "eFaceFeatures"
            faceFeatures: number[];

            // array of 13 params IHeadOverlayItem
            headOverlays: IHeadOverlayItem[];
        }

        type HeadOverlayType =
            | 'Blemishes'
            | 'Facial Hair'
            | 'Eyebrows'
            | 'Ageing'
            | 'Makeup'
            | 'Blush'
            | 'Complexion'
            | 'Sun Damage'
            | 'Lipstick'
            | 'Moles/Frecles'
            | 'Chest Hair'
            | 'Body Blemishes'
            | 'Add Body Blemishes';
        interface IHeadOverlayItem {
            type: HeadOverlayType;
            overlayID: number;
            // 255 idx is disabled (aka "None")
            idx: number;
            opacity: number;
            firstColor: number;
            secondColor: number;
        }

        interface ICustomizationLimits {
            shapeFirst?: number[];
            shapeSecond?: number[];
            eyeColor?: number[];
            hairColor?: number[];
            hightlightColor?: number[];
            hairStyle?: {
                male?: number[];
                female?: number[];
            };
            headOverlays?: {
                type: HeadOverlayType;
                values: number[];
            }[];

            [key: string]: any;
        }
    }
}
