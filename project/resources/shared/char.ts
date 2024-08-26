interface IChar {
    name: string;
    lastName: string;
    birthday: string;
    sex: "male" | "female";
    father: number;
    mother: number;
    heritageRessemblance: number;
    heritageSkinTone: number;
    ped: string;
    faceFeatures: {
        noseWidth: number;
        nosePeak: number;
        noseLength: number;
        noseBoneCurveness: number;
        noseTip: number;
        noseBoneTwist: number;

        eyebrownX: number;
        eyebrownZ: number;

        cheekBones: number;
        cheekSidewaysBoneSize: number;
        cheekWidth: number;

        eyeOpening: number;

        lipThickness: number;

        jawBoneWidth: number;
        jawBoneShape: number;

        chinBone: number;
        chinBoneLength: number;
        chinBoneShape: number;
        chinHole: number;

        neckThickness: number;
    };
    hair: {
        style: number;
        color: number;
        highlight: number;
    };
    eyebrows: {
        style: number;
        color: number;
        opacity: number;
    };
    beard: {
        style: number;
        color: number;
        secundaryColor: number;
        opacity: number;
    };
    blemishes: {
        style: number;
        color: number;
        opacity: number;
    };
    bodyBlemishes: {
        style: number;
        color: number;
        opacity: number;
    };
    skinAgeing: {
        style: number;
        opacity: number;
    };
    skinComplexion: {
        style: number;
        opacity: number;
    };
    molesAndFreckles: {
        style: number;
        opacity: number;
    };
    skinDamage: {
        style: number;
        opacity: number;
    };
    eyeColor: number;
    makeup: {
        style: number;
        color: number;
        opacity: number;
    };
    lipstick: {
        style: number;
        color: number;
        opacity: number;
    };
    chestHair: {
        style: number;
        color: number;
        opacity: number;
    };
    blush: {
        style: number;
        color: number;
        opacity: number;
    };
    clothes: {
        mask: {
            style: number;
            texture: number;
        };
        hat: {
            style: number;
            texture: number;
        };
        gloves: {
            style: number;
            texture: number;
        };
        pants: {
            style: number;
            texture: number;
        };
        bag: {
            style: number;
            texture: number;
        };
        shoes: {
            style: number;
            texture: number;
        };
        accessory: {
            style: number;
            texture: number;
        };
        underShirt: {
            style: number;
            texture: number;
        };
        bodyArmor: {
            style: number;
            texture: number;
        };
        badge: {
            style: number;
            texture: number;
        };
        shirtAndJackets: {
            style: number;
            texture: number;
        };
        glasses: {
            style: number;
            texture: number;
        };
        ears: {
            style: number;
            texture: number;
        };
        watch: {
            style: number;
            texture: number;
        };
        bracelet: {
            style: number;
            texture: number;
        };
    };
}

export default IChar;
