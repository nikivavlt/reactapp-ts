const Gender: { [key in Types.Customization.Genders]: boolean } = {
    Male: true,
    Female: false,
};

const fathers = [
    {
        id: 0,
        title: 'Benjamin',
    },
    {
        id: 1,
        title: 'Danien',
    },
    {
        id: 2,
        title: 'Jousha',
    },
    {
        id: 3,
        title: 'Noah',
    },
    {
        id: 4,
        title: 'Andrew',
    },
    {
        id: 5,
        title: 'Joan',
    },
    {
        id: 6,
        title: 'Alex',
    },
    {
        id: 7,
        title: 'Isaac',
    },
    {
        id: 8,
        title: 'Evan',
    },
    {
        id: 9,
        title: 'Ethan',
    },
    {
        id: 10,
        title: 'Vincent',
    },
    {
        id: 11,
        title: 'Angel',
    },
    {
        id: 12,
        title: 'Diego',
    },
    {
        id: 13,
        title: 'Adrian',
    },
    {
        id: 14,
        title: 'Gabriel',
    },
    {
        id: 15,
        title: 'Michael',
    },
    {
        id: 16,
        title: 'Santiago',
    },
    {
        id: 17,
        title: 'Kevin',
    },
    {
        id: 18,
        title: 'Louis',
    },
    {
        id: 19,
        title: 'Samuel',
    },
    {
        id: 20,
        title: 'Anthony',
    },
    {
        id: 42,
        title: 'John',
    },
    {
        id: 43,
        title: 'Niko',
    },
    {
        id: 44,
        title: 'Claude',
    },
];
const mothers = [
    {
        id: 21,
        title: 'Hannah',
    },
    {
        id: 22,
        title: 'Audrey',
    },
    {
        id: 23,
        title: 'Jasmine',
    },
    {
        id: 24,
        title: 'Giselle',
    },
    {
        id: 25,
        title: 'Amelia',
    },
    {
        id: 26,
        title: 'Isabella',
    },
    {
        id: 27,
        title: 'Zoe',
    },
    {
        id: 28,
        title: 'Ava',
    },
    {
        id: 29,
        title: 'Camilla',
    },
    {
        id: 30,
        title: 'Violet',
    },
    {
        id: 31,
        title: 'Sophia',
    },
    {
        id: 32,
        title: 'Eveline',
    },
    {
        id: 33,
        title: 'Nicole',
    },
    {
        id: 34,
        title: 'Ashley',
    },
    {
        id: 35,
        title: 'Grace',
    },
    {
        id: 36,
        title: 'Brianna',
    },
    {
        id: 37,
        title: 'Natalie',
    },
    {
        id: 38,
        title: 'Olivia',
    },
    {
        id: 39,
        title: 'Elizabeth',
    },
    {
        id: 40,
        title: 'Charlotte',
    },
    {
        id: 41,
        title: 'Emma',
    },
];

const getDefaultCustomizeLimits = () => {
    const fathersList = fathers.map((x) => x.id);
    const mothersList = mothers.map((x) => x.id);

    const limits: Types.Customization.ICustomizationLimits = {
        shapeFirst: mothersList,
        shapeSecond: fathersList,
        eyeColor: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        hairColor: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
            29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
            56, 57, 58, 59, 60, 61, 62, 63,
        ],
        hightlightColor: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
            29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
            56, 57, 58, 59, 60, 61, 62, 63,
        ],
        hairStyle: {
            male: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28,
                29, 30,
            ],
            female: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28,
                29, 30,
            ],
        },
        headOverlays: [
            {
                type: 'Blemishes',
                values: [255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            },
            {
                type: 'Facial Hair',
                values: [
                    255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                    26, 27, 28,
                ],
            },
            {
                type: 'Eyebrows',
                values: [
                    255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                    26, 27, 28, 29, 30, 31, 32, 33,
                ],
            },
            {
                type: 'Ageing',
                values: [255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            },
            {
                type: 'Makeup',
                values: [
                    255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                    26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
                ],
            },
            {
                type: 'Blush',
                values: [
                    255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                    26, 27, 28, 29, 30, 31, 32,
                ],
            },
            {
                type: 'Complexion',
                values: [255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            },
            {
                type: 'Sun Damage',
                values: [255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
            {
                type: 'Lipstick',
                values: [255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            },
            {
                type: 'Moles/Frecles',
                values: [255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
            },
            {
                type: 'Chest Hair',
                values: [255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            },
            {
                type: 'Body Blemishes',
                values: [255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            },
            {
                type: 'Add Body Blemishes',
                values: [0, 1],
            },
        ],
    };

    return limits;
};

const getDefaultCustomizeData = () => {
    const customize: Types.Customization.ICustomization = {
        gender: true,
        shapeFirst: 21,
        shapeSecond: 0,
        shapeThird: 0,
        skinFirst: 14, // ALWAYS 14
        skinSecond: 33, // ALWAYS 33
        skinThird: 0, // ALWAYS 0
        shapeMix: 0.5, // 0.0 - 1.0 | step is .05
        skinMix: 0.5, // 0.0 - 1.0 | step is .05
        thirdMix: 0, // ALWAYS 0
        eyeColor: 0,
        hairColor: 0,
        hightlightColor: 0,
        hairStyle: 0,
        faceFeatures: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // -1.0 to 1.0
        headOverlays: [
            {
                type: 'Blemishes',
                overlayID: 0,
                idx: 255, // 0	Blemishes	0-23
                opacity: 1, // 0.0 - 1.0
                firstColor: 0,
                secondColor: 0,
            },
            {
                type: 'Facial Hair',
                overlayID: 1,
                idx: 255,
                opacity: 1,
                firstColor: 0,
                secondColor: 0,
            },
            {
                type: 'Eyebrows',
                overlayID: 2,
                idx: 255,
                opacity: 1,
                firstColor: 0,
                secondColor: 0,
            },
            {
                type: 'Ageing',
                overlayID: 3,
                idx: 255,
                opacity: 1,
                firstColor: 0,
                secondColor: 0,
            },
            {
                type: 'Makeup',
                overlayID: 4,
                idx: 255,
                opacity: 1,
                firstColor: 0,
                secondColor: 0,
            },
            {
                type: 'Blush',
                overlayID: 5,
                idx: 255,
                opacity: 1,
                firstColor: 0,
                secondColor: 0,
            },
            {
                type: 'Complexion',
                overlayID: 6,
                idx: 255,
                opacity: 1,
                firstColor: 0,
                secondColor: 0,
            },
            {
                type: 'Sun Damage',
                overlayID: 7,
                idx: 255,
                opacity: 1,
                firstColor: 0,
                secondColor: 0,
            },
            {
                type: 'Lipstick',
                overlayID: 8,
                idx: 255,
                opacity: 1,
                firstColor: 0,
                secondColor: 0,
            },
            {
                type: 'Moles/Frecles',
                overlayID: 9,
                idx: 255,
                opacity: 1,
                firstColor: 0,
                secondColor: 0,
            },
            {
                type: 'Chest Hair',
                overlayID: 10,
                idx: 255,
                opacity: 1,
                firstColor: 0,
                secondColor: 0,
            },
            {
                type: 'Body Blemishes',
                overlayID: 11,
                idx: 255,
                opacity: 1,
                firstColor: 0,
                secondColor: 0,
            },
            {
                type: 'Add Body Blemishes',
                overlayID: 11,
                idx: 255,
                opacity: 1,
                firstColor: 0,
                secondColor: 0,
            },
        ] as Types.Customization.IHeadOverlayItem[],
    };

    return customize;
};

const eFaceFeautures = {
    noseWidth: 0,
    noseHeight: 1,
    noseLength: 2,
    noseBridge: 3,
    noseTip: 4,
    noseBridgeShift: 5,
    browHeight: 6,
    browWidth: 7,
    cheekboneHeight: 8,
    cheekboneWidth: 9,
    cheeksWidth: 10,
    eyes: 11, // opened-closed
    lips: 12,
    jawWidth: 13,
    jawHeight: 14,
    chinLength: 15,
    chinPosition: 16,
    chinWidth: 17,
    chinShape: 18,
    neckWidth: 19,
};

const Parents = {
    Fathers: fathers,
    Mothers: mothers,
};

export const _customize = {
    Gender,
    Parents,
    getDefaultCustomizeData,
    getDefaultCustomizeLimits,
    eFaceFeautures,
};
