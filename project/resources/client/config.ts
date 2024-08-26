import IChar from "@shared/char";

export const playerSpawnLocation = {
    x: -1042.635,
    y: -2745.828,
    z: 21.359,
    h: -30.0,
};

export const mothers = [
    "Hannah",
    "Aubrey",
    "Jasmine",
    "Gisele",
    "Amelia",
    "Isabella",
    "Zoe",
    "Ava",
    "Camila",
    "Violet",
    "Sophia",
    "Evelyn",
    "Nicole",
    "Ashley",
    "Gracie",
    "Brianna",
    "Natalie",
    "Olivia",
    "Elizabeth",
    "Charlotte",
    "Emma",
];

export const fathers = [
    "Benjamin",
    "Daniel",
    "Joshua",
    "Noah",
    "Andrew",
    "Juan",
    "Alex",
    "Isaac",
    "Evan",
    "Ethan",
    "Vincent",
    "Angel",
    "Diego",
    "Adrian",
    "Gabriel",
    "Michael",
    "Santiago",
    "Kevin",
    "Louis",
    "Samuel",
    "Anthony",
    "Claude",
    "Niko",
];

export const initialSkin: IChar = {
    name: "",
    lastName: "",
    birthday: "",
    sex: "male",
    father: 0,
    mother: 0,
    heritageRessemblance: 0.5,
    heritageSkinTone: 0.5,
    ped: "mp_m_freemode_01",
    faceFeatures: {
        noseWidth: 0,
        nosePeak: 0,
        noseLength: 0,
        noseBoneCurveness: 0,
        noseTip: 0,
        noseBoneTwist: 0,

        eyebrownX: 0,
        eyebrownZ: 0,

        cheekBones: 0,
        cheekSidewaysBoneSize: 0,
        cheekWidth: 0,

        eyeOpening: 0,

        lipThickness: 0,

        jawBoneWidth: 0,
        jawBoneShape: 0,

        chinBone: 0,
        chinBoneLength: 0,
        chinBoneShape: 0,
        chinHole: 0,

        neckThickness: 0,
    },
    hair: {
        style: 0,
        color: 0,
        highlight: 0,
    },
    eyebrows: {
        style: 0,
        color: 0,
        opacity: 1,
    },
    beard: {
        style: 0,
        color: 0,
        opacity: 1,
        secundaryColor: 0,
    },
    blemishes: {
        style: 0,
        color: 0,
        opacity: 1,
    },
    bodyBlemishes: {
        style: 0,
        color: 0,
        opacity: 1,
    },
    skinAgeing: {
        style: 0,
        opacity: 1,
    },
    skinComplexion: {
        style: 0,
        opacity: 1,
    },
    molesAndFreckles: {
        style: 0,
        opacity: 1,
    },
    skinDamage: {
        style: 0,
        opacity: 1,
    },
    eyeColor: 0,
    makeup: {
        color: 0,
        style: 0,
        opacity: 1,
    },
    lipstick: {
        color: 0,
        style: 0,
        opacity: 1,
    },
    chestHair: {
        style: 0,
        color: 0,
        opacity: 1,
    },
    blush: {
        style: 0,
        color: 0,
        opacity: 1,
    },
    clothes: {
        mask: { style: 0, texture: 0 },
        gloves: { style: 0, texture: 0 },
        pants: { style: 0, texture: 0 },
        bag: { style: 0, texture: 0 },
        shoes: { style: 0, texture: 0 },
        accessory: { style: 0, texture: 0 },
        underShirt: { style: 0, texture: 0 },
        bodyArmor: { style: 0, texture: 0 },
        badge: { style: 0, texture: 0 },
        shirtAndJackets: { style: 0, texture: 0 },
        hat: { style: 0, texture: 0 },
        glasses: { style: 0, texture: 0 },
        ears: { style: 0, texture: 0 },
        watch: { style: 0, texture: 0 },
        bracelet: { style: 0, texture: 0 },
    },
};
