import IChar from "../shared/char";
import * as config from "./config";

/**
 * Sends a message to the UI in React.js
 */
const sendReactMessage = (
    action: string,
    data: object | boolean | string | number
) => {
    SendNuiMessage(
        JSON.stringify({
            action: action,
            data: data,
        })
    );
};

/**
 * Shows UI
 */
const showUi = (uiVisibilityName: string) => {
    SetNuiFocus(true, true);
    sendReactMessage(uiVisibilityName, true);
};

/**
 * Hides UI
 */
const hideUi = (uiVisibilityName: string) => {
    SetNuiFocus(false, false);
    sendReactMessage(uiVisibilityName, false);
};

let char: IChar = config.initialSkin;

let enable = true;

const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const loadAnim = async (dict: string) => {
    while (!HasAnimDictLoaded(dict)) {
        RequestAnimDict(dict);
        await Delay(10);
    }
};

const changeGender = async (gender: "male" | "female") => {
    if (gender === "male") {
        char.sex = "male";
        char.ped = "mp_m_freemode_01";
        await setModel(char.ped);
    } else {
        char.sex = "female";
        char.ped = "mp_f_freemode_01";
        await setModel(char.ped);
    }
};

const setModel = async (model: string) => {
    if (IsModelInCdimage(model) && IsModelValid(model)) {
        RequestModel(model);

        while (!HasModelLoaded(model)) {
            await Delay(500);
        }
    }

    SetPlayerModel(PlayerId(), model);

    SetPedDefaultComponentVariation(PlayerPedId());

    // set defalt values
    SetPedHeadBlendData(
        PlayerPedId(),
        char.father,
        char.mother,
        0,
        char.father,
        char.mother,
        0,
        char.heritageRessemblance,
        char.heritageSkinTone,
        0,
        true
    );

    SetPedComponentVariation(PlayerPedId(), 3, 0, 0, 2); // arms
    SetPedComponentVariation(PlayerPedId(), 11, 0, 0, 2); // torso
    SetPedComponentVariation(PlayerPedId(), 8, 0, 0, 2); // tshirt
    SetPedComponentVariation(PlayerPedId(), 4, 0, 0, 2); // pants
    SetPedComponentVariation(PlayerPedId(), 6, 0, 0, 2); // shoes

    SetModelAsNoLongerNeeded(model);
};

let camera = {
    face: { x: 402.92, y: -1000.72, z: -98.45, fov: 10.0 },
    body: { x: 402.92, y: -1000.72, z: -99.01, fov: 30.0 },
};

let cam: number | null = null,
    cam2: number | null = null,
    cam3: number | null = null,
    camSkin: number | null = null,
    isCameraActive = null;
let lastCam = "body";

const getComponentVariations = () => {
    const playerPed = PlayerPedId();

    const hairDrawableVariations = GetNumberOfPedDrawableVariations(
        playerPed,
        2
    );

    const bagVariations = GetNumberOfPedDrawableVariations(playerPed, 5);

    const shoesVariations = GetNumberOfPedDrawableVariations(playerPed, 6);

    const accessoriesVariations = GetNumberOfPedDrawableVariations(
        playerPed,
        7
    );

    const undershirtVariations = GetNumberOfPedDrawableVariations(playerPed, 8);

    const kevlarVariations = GetNumberOfPedDrawableVariations(playerPed, 9);

    const badgeVariations = GetNumberOfPedDrawableVariations(playerPed, 10);

    const blemishesVariations = GetNumHeadOverlayValues(0);

    const beardVariations = GetNumHeadOverlayValues(1);

    const eyebrowsVariations = GetNumHeadOverlayValues(2);

    const ageingVariations = GetNumHeadOverlayValues(3);

    const makeupVariations = GetNumHeadOverlayValues(4);

    const blushVariations = GetNumHeadOverlayValues(5);

    const complexionVariations = GetNumHeadOverlayValues(6);

    const sunDamageVariations = GetNumHeadOverlayValues(7);

    const lipstickVariations = GetNumHeadOverlayValues(8);

    const molesAndFrecklesVariations = GetNumHeadOverlayValues(9);

    const chestHairVariations = GetNumHeadOverlayValues(10);

    const bodyBlemishesVariations = GetNumHeadOverlayValues(11);

    return {
        hairDrawableVariations,
        bagVariations,
        shoesVariations,
        accessoriesVariations,
        undershirtVariations,
        kevlarVariations,
        badgeVariations,
        blemishesVariations,
        beardVariations,
        bodyBlemishesVariations,
        chestHairVariations,
        lipstickVariations,
        molesAndFrecklesVariations,
        sunDamageVariations,
        complexionVariations,
        blushVariations,
        makeupVariations,
        ageingVariations,
        eyebrowsVariations,
    };
};

const getClothesVariation = () => {
    const masks: { [key: number]: number } = {};

    const maskDrawables = GetNumberOfPedDrawableVariations(PlayerPedId(), 1);

    for (let i = 0; i < maskDrawables; i++) {
        const variations = GetNumberOfPedTextureVariations(PlayerPedId(), 1, i);

        masks[i] = variations;
    }

    const torsoDrawables = GetNumberOfPedDrawableVariations(PlayerPedId(), 3);
    let torso: { [key: number]: number } = {};

    for (let i = 0; i < torsoDrawables; i++) {
        torso[i] = GetNumberOfPedTextureVariations(PlayerPedId(), 3, i);
    }

    const pantsDrawables = GetNumberOfPedDrawableVariations(PlayerPedId(), 4);
    const pants: { [key: number]: number } = {};

    for (let i = 0; i < pantsDrawables; i++) {
        pants[i] = GetNumberOfPedTextureVariations(PlayerPedId(), 4, i);
    }

    const bagsDrawables = GetNumberOfPedDrawableVariations(PlayerPedId(), 5);
    const bags: { [key: number]: number } = {};

    for (let i = 0; i < bagsDrawables; i++) {
        bags[i] = GetNumberOfPedTextureVariations(PlayerPedId(), 5, i);
    }

    const shoesDrawables = GetNumberOfPedDrawableVariations(PlayerPedId(), 6);
    const shoes: { [key: number]: number } = {};

    for (let i = 0; i < shoesDrawables; i++) {
        shoes[i] = GetNumberOfPedTextureVariations(PlayerPedId(), 6, i);
    }

    const accessoriesDrawables = GetNumberOfPedDrawableVariations(
        PlayerPedId(),
        7
    );
    const accessories: { [key: number]: number } = {};

    for (let i = 0; i < accessoriesDrawables; i++) {
        accessories[i] = GetNumberOfPedTextureVariations(PlayerPedId(), 7, i);
    }

    const undershirtDrawables = GetNumberOfPedDrawableVariations(
        PlayerPedId(),
        8
    );
    const undershirts: { [key: number]: number } = {};

    for (let i = 0; i < undershirtDrawables; i++) {
        undershirts[i] = GetNumberOfPedTextureVariations(PlayerPedId(), 8, i);
    }

    const kevlarDrawables = GetNumberOfPedDrawableVariations(PlayerPedId(), 9);
    const kevlar: { [key: number]: number } = {};

    for (let i = 0; i < kevlarDrawables; i++) {
        kevlar[i] = GetNumberOfPedTextureVariations(PlayerPedId(), 9, i);
    }

    const badgeDrawables = GetNumberOfPedDrawableVariations(PlayerPedId(), 10);
    const badge: { [key: number]: number } = {};

    for (let i = 0; i < badgeDrawables; i++) {
        badge[i] = GetNumberOfPedTextureVariations(PlayerPedId(), 10, i);
    }

    const torso2Drawables = GetNumberOfPedDrawableVariations(PlayerPedId(), 11);
    const torso2: { [key: number]: number } = {};

    for (let i = 0; i < torso2Drawables; i++) {
        torso2[i] = GetNumberOfPedTextureVariations(PlayerPedId(), 11, i);
    }

    const hatsDrawables = GetNumberOfPedDrawableVariations(PlayerPedId(), 0);
    const hats: { [key: number]: number } = {};

    for (let i = 0; i < hatsDrawables; i++) {
        hats[i] = GetNumberOfPedPropTextureVariations(PlayerPedId(), 0, i);
    }

    const glassesDrawables = GetNumberOfPedDrawableVariations(PlayerPedId(), 1);
    const glasses: { [key: number]: number } = {};

    for (let i = 0; i < glassesDrawables; i++) {
        glasses[i] = GetNumberOfPedPropTextureVariations(PlayerPedId(), 1, i);
    }

    const earsDrawables = GetNumberOfPedDrawableVariations(PlayerPedId(), 2);
    const ears: { [key: number]: number } = {};

    for (let i = 0; i < earsDrawables; i++) {
        ears[i] = GetNumberOfPedPropTextureVariations(PlayerPedId(), 2, i);
    }

    const watchesDrawables = GetNumberOfPedDrawableVariations(PlayerPedId(), 6);
    const watches: { [key: number]: number } = {};

    for (let i = 0; i < watchesDrawables; i++) {
        watches[i] = GetNumberOfPedPropTextureVariations(PlayerPedId(), 6, i);
    }

    const braceletsDrawables = GetNumberOfPedDrawableVariations(
        PlayerPedId(),
        6
    );
    const bracelets: { [key: number]: number } = {};

    for (let i = 0; i < braceletsDrawables; i++) {
        bracelets[i] = GetNumberOfPedPropTextureVariations(PlayerPedId(), 6, i);
    }

    return {
        masks,
        torso,
        pants,
        bags,
        shoes,
        accessories,
        undershirts,
        kevlar,
        badge,
        torso2,
        hats,
        glasses,
        ears,
        watches,
        bracelets,
    };
};

const startCharCreation = async () => {
    DisplayRadar(false);

    enable = true;

    visible();

    await changeGender("male");

    const playerPed = PlayerPedId();

    DisableIdleCamera(true);

    DoScreenFadeOut(1000);

    await Delay(3000);

    DestroyAllCams(true);

    cam2 = CreateCamWithParams(
        "DEFAULT_SCRIPTED_CAMERA",
        camera["body"].x,
        camera["body"].y,
        camera["body"].z,
        0.0,
        0.0,
        0.0,
        camera["body"].fov,
        false,
        0
    );

    SetCamActive(cam2, true);

    RenderScriptCams(true, false, 2000, true, true);

    await Delay(500);

    SetEntityCoords(
        playerPed,
        405.59,
        -997.18,
        -99.0,
        false,
        false,
        false,
        true
    );
    SetEntityHeading(playerPed, 90.0);

    DoScreenFadeIn(2000);

    cam3 = CreateCamWithParams(
        "DEFAULT_SCRIPTED_CAMERA",
        402.99,
        -998.02,
        -99.0,
        0.0,
        0.0,
        0.0,
        50.0,
        false,
        0
    );

    PointCamAtCoord(cam3, 402.99, -998.02, -99.0);

    SetCamActiveWithInterp(cam2, cam3, 5000, 0, 1);

    await loadAnim("mp_character_creation@customise@male_a");

    TaskPlayAnim(
        playerPed,
        "mp_character_creation@customise@male_a",
        "intro",
        1.0,
        1.0,
        4000,
        0,
        1,
        false,
        false,
        false
    );

    await Delay(5000);

    const coords = GetEntityCoords(playerPed, true);
    if (
        GetDistanceBetweenCoords(
            coords[0],
            coords[1],
            coords[2],
            402.89,
            -996.87,
            -99.0,
            true
        ) > 0.5
    ) {
        SetEntityCoords(
            playerPed,
            402.89,
            -996.87,
            -100.0,
            false,
            false,
            false,
            true
        );
        SetEntityHeading(playerPed, 173.97);
    }

    showUi("charcreation:show");

    sendReactMessage("charcreator:set-data", {
        char,
        fathers: config.fathers,
        mothers: config.mothers,
    });

    sendReactMessage(
        "charcreator:set-drawable-variations",
        getComponentVariations()
    );

    FreezeEntityPosition(playerPed, true);
};

on("charcreation:show", () => {
    startCharCreation();
});

RegisterCommand(
    "charcreation-hide",
    () => {
        hideUi("charcreation:show");
    },
    true
);

RegisterNuiCallbackType("charcreator:set-chardata");

on(
    "__cfx_nui:charcreator:set-chardata",
    async (chardata: IChar, cb: Function) => {
        char = chardata;

        sendReactMessage("charcreator:update-chardata", char);

        cb(char);
    }
);

RegisterNuiCallbackType("charcreation:setSex");

on(
    "__cfx_nui:charcreation:setSex",
    async ({ sex }: { sex: "male" | "female" }, cb: Function) => {
        await changeGender(sex);

        cb({ sex, ped: char.ped });
    }
);

RegisterNuiCallbackType("charcreation:set-father");

on(
    "__cfx_nui:charcreation:set-father",
    async ({ father }: { father: number }, cb: Function) => {
        char.father = father;

        SetPedHeadBlendData(
            PlayerPedId(),
            char.father,
            char.mother,
            0,
            char.father,
            char.mother,
            0,
            char.heritageRessemblance,
            char.heritageSkinTone,
            0,
            true
        );

        cb({ father });
    }
);

RegisterNuiCallbackType("charcreation:set-mother");

on(
    "__cfx_nui:charcreation:set-mother",
    async ({ mother }: { mother: number }, cb: Function) => {
        char.mother = mother;

        SetPedHeadBlendData(
            PlayerPedId(),
            char.mother,
            char.father,
            0,
            char.mother,
            char.father,
            0,
            char.heritageRessemblance,
            char.heritageSkinTone,
            0,
            true
        );

        cb({ mother });
    }
);

RegisterNuiCallbackType("charcreator:set-resemblance");

on(
    "__cfx_nui:charcreator:set-resemblance",
    async ({ resemblance }: { resemblance: number }, cb: Function) => {
        char.heritageRessemblance = resemblance;

        SetPedHeadBlendData(
            PlayerPedId(),
            char.mother,
            char.father,
            0,
            char.mother,
            char.father,
            0,
            char.heritageRessemblance,
            char.heritageSkinTone,
            0,
            true
        );

        cb({ resemblance });
    }
);

RegisterNuiCallbackType("charcreator:set-skinTone");

on(
    "__cfx_nui:charcreator:set-skinTone",
    async ({ skinTone }: { skinTone: number }, cb: Function) => {
        char.heritageSkinTone = skinTone;

        SetPedHeadBlendData(
            PlayerPedId(),
            char.mother,
            char.father,
            0,
            char.mother,
            char.father,
            0,
            char.heritageRessemblance,
            char.heritageSkinTone,
            0,
            true
        );

        cb({ skinTone });
    }
);

RegisterNuiCallbackType("charcreator:set-faceFeature");

on(
    "__cfx_nui:charcreator:set-faceFeature",
    async (
        { index, scale }: { index: number; scale: number },
        cb: Function
    ) => {
        switch (index) {
            case 0:
                char.faceFeatures.noseWidth = scale;
                break;
            case 1:
                char.faceFeatures.nosePeak = scale;
                break;
            case 2:
                char.faceFeatures.noseLength = scale;
                break;
            case 3:
                char.faceFeatures.noseBoneCurveness = scale;
                break;
            case 4:
                char.faceFeatures.noseTip = scale;
                break;
            case 5:
                char.faceFeatures.noseBoneTwist = scale;
                break;
            case 6:
                char.faceFeatures.eyebrownX = scale;
                break;
            case 7:
                char.faceFeatures.eyebrownZ = scale;
                break;
            case 8:
                char.faceFeatures.cheekBones = scale;
                break;
            case 9:
                char.faceFeatures.cheekSidewaysBoneSize = scale;
                break;
            case 10:
                char.faceFeatures.cheekWidth = scale;
                break;
            case 11:
                char.faceFeatures.eyeOpening = scale;
                break;
            case 12:
                char.faceFeatures.lipThickness = scale;
                break;
            case 13:
                char.faceFeatures.jawBoneWidth = scale;
                break;
            case 14:
                char.faceFeatures.jawBoneShape = scale;
                break;
            case 15:
                char.faceFeatures.chinBone = scale;
                break;
            case 16:
                char.faceFeatures.chinBoneLength = scale;
                break;
            case 17:
                char.faceFeatures.chinBoneShape = scale;
                break;
            case 18:
                char.faceFeatures.chinHole = scale;
                break;
            case 19:
                char.faceFeatures.neckThickness = scale;
                break;
        }

        SetPedFaceFeature(PlayerPedId(), index, scale);

        cb({ index, scale });
    }
);

RegisterNuiCallbackType("charcreator:set-camera-position");

on(
    "__cfx_nui:charcreator:set-camera-position",
    async (position: "face" | "body", cb: Function) => {
        if (camSkin) {
            const newCam = CreateCamWithParams(
                "DEFAULT_SCRIPTED_CAMERA",
                camera[position].x,
                camera[position].y,
                camera[position].z,
                0.0,
                0.0,
                0.0,
                camera[position].fov,
                false,
                0
            );
            PointCamAtCoord(
                newCam,
                camera[position].x,
                camera[position].y,
                camera[position].z
            );
            SetCamActiveWithInterp(newCam, camSkin, 2000, 1, 1);
            camSkin = newCam;
        } else {
            camSkin = CreateCamWithParams(
                "DEFAULT_SCRIPTED_CAMERA",
                camera[position].x,
                camera[position].y,
                camera[position].z,
                0.0,
                0.0,
                0.0,
                camera[position].fov,
                false,
                0
            );
            if (cam2) SetCamActive(cam2, true);
            RenderScriptCams(true, false, 2000, true, true);
        }
        cb({});
    }
);

RegisterNuiCallbackType("charcreator:set-eye-color");

on(
    "__cfx_nui:charcreator:set-eye-color",
    async (color: number, cb: Function) => {
        SetPedEyeColor(PlayerPedId(), color);

        char.eyeColor = color;

        cb(color);
    }
);

RegisterNuiCallbackType("charcreator:set-component-variation");

on(
    "__cfx_nui:charcreator:set-component-variation",
    async (
        {
            componentId,
            drawableId,
            textureId = 0,
            palleteId = 2,
        }: {
            componentId: number;
            drawableId: number;
            textureId: number;
            palleteId: number;
        },
        cb: Function
    ) => {
        switch (componentId) {
            case 1: // mask
                char.clothes.mask.style = componentId;
                char.clothes.mask.texture = textureId;
                break;
            case 2: // hair
                char.hair.style = componentId;
            case 3: // torso
                char.clothes.gloves.style = componentId;
                char.clothes.gloves.texture = textureId;
                break;
            case 4: // leg
                char.clothes.pants.style = componentId;
                char.clothes.pants.texture = textureId;
                break;
            case 5: // bag
                char.clothes.bag.style = componentId;
                char.clothes.bag.texture = textureId;
                break;
            case 6: // shoes
                char.clothes.shoes.style = componentId;
                char.clothes.shoes.texture = textureId;
                break;
            case 7: // accessory
                char.clothes.accessory.style = componentId;
                char.clothes.accessory.texture = textureId;
                break;
            case 8: // undershirts
                char.clothes.underShirt.style = componentId;
                char.clothes.underShirt.texture = textureId;
                break;
            case 9: // kevlar
                char.clothes.bodyArmor.style = drawableId;
                char.clothes.bodyArmor.texture = textureId;
                break;
            case 10: // badge
                char.clothes.badge.style = componentId;
                char.clothes.badge.texture = textureId;
                break;
            case 11: // torso 2
                char.clothes.shirtAndJackets.style = componentId;
                char.clothes.shirtAndJackets.texture = textureId;
                break;
        }

        SetPedComponentVariation(
            PlayerPedId(),
            componentId,
            drawableId,
            textureId,
            palleteId
        );

        cb({ componentId, drawableId, textureId, palleteId });
    }
);

RegisterNuiCallbackType("charcreator:set-head-overlay");

on(
    "__cfx_nui:charcreator:set-head-overlay",
    async (
        {
            overlayId,
            index,
            opacity = 1,
        }: {
            overlayId: number;
            index: number;
            opacity: number;
        },
        cb: Function
    ) => {
        switch (overlayId) {
            case 0: // blemishes
                char.blemishes.style = index;
                char.blemishes.opacity = opacity;
                break;
            case 1: // facial hair
                char.beard.style = index;
                char.beard.opacity = opacity;
                break;
            case 2: // eyebrows
                char.eyebrows.style = index;
                char.eyebrows.opacity = opacity;
                break;
            case 3: // ageing
                char.skinAgeing.style = index;
                char.skinAgeing.opacity = opacity;
                break;
            case 4: // makeup
                char.makeup.style = index;
                char.makeup.opacity = opacity;
                break;
            case 5: // blush
                char.blush.style = index;
                char.blush.opacity = opacity;
                break;
            case 6: // complexion
                char.skinComplexion.style = index;
                char.skinComplexion.opacity = opacity;
                break;
            case 7: // sun damage
                char.skinDamage.style = index;
                char.skinDamage.opacity = opacity;
                break;
            case 8: // lipstick
                char.lipstick.style = index;
                char.lipstick.opacity = opacity;
                break;
            case 9: // moles / freckles
                char.molesAndFreckles.style = index;
                char.molesAndFreckles.opacity = opacity;
                break;
            case 10: // chest hair
                char.chestHair.style = index;
                char.chestHair.opacity = opacity;
                break;
            case 11: // body blemishes
                char.bodyBlemishes.style = index;
                char.bodyBlemishes.opacity = opacity;
                break;
            case 12: // add body blemishes
                break;
        }

        SetPedHeadOverlay(PlayerPedId(), overlayId, index, opacity);

        cb({ overlayId, index, opacity });
    }
);

RegisterNuiCallbackType("charcreator:set-head-overlay-color");

on(
    "__cfx_nui:charcreator:set-head-overlay-color",
    async (
        {
            overlayID,
            colorID,
        }: {
            overlayID: number;
            colorID: number;
        },
        cb: Function
    ) => {
        let colorType: number = 0;

        switch (overlayID) {
            case 0: // blemishes
                char.blemishes.color = colorID;
                colorType = 0;
                break;
            case 1: // facial hair
                char.beard.color = colorID;
                colorType = 1;
                break;
            case 2: // eyebrows
                char.eyebrows.color = colorID;
                colorType = 1;
                break;
            case 3: // ageing
                break;
            case 4: // makeup
                char.makeup.color = colorID;
                colorType = 2;
                break;
            case 5: // blush
                char.blush.color = colorID;
                colorType = 2;
                break;
            case 6: // complexion
                break;
            case 7: // sun damage
                break;
            case 8: // lipstick
                char.lipstick.color = colorID;
                colorType = 2;
                break;
            case 9: // moles / freckles
                break;
            case 10: // chest hair
                char.chestHair.color = colorID;
                colorType = 1;
                break;
            case 11: // body blemishes
                char.bodyBlemishes.color = colorID;
                colorType = 0;
                break;
            case 12: // add body blemishes
                break;
        }

        SetPedHeadOverlayColor(PlayerPedId(), overlayID, colorType, colorID, 0);

        cb({ overlayID, colorID });
    }
);

RegisterNuiCallbackType("charcreator:set-hair-color");

on(
    "__cfx_nui:charcreator:set-hair-color",
    async (
        {
            colorID,
            highlightColorID,
        }: {
            colorID: number;
            highlightColorID: number;
        },
        cb: Function
    ) => {
        SetPedHairColor(PlayerPedId(), colorID, highlightColorID);

        char.hair.color = colorID;
        char.hair.highlight = highlightColorID;

        cb({ colorID, highlightColorID });
    }
);

RegisterNuiCallbackType("charcreator:get-clothes-variation");

on(
    "__cfx_nui:charcreator:get-clothes-variation",
    async (_params: void, cb: Function) => {
        const clothesVariation = getClothesVariation();

        cb(clothesVariation);
    }
);

RegisterNuiCallbackType("charcreator:set-prop-index");

on(
    "__cfx_nui:charcreator:set-prop-index",
    async (
        {
            componentID,
            drawableID,
            textureID,
            attach = true,
        }: {
            componentID: number;
            drawableID: number;
            textureID: number;
            attach: boolean;
        },
        cb: Function
    ) => {
        switch (componentID) {
            case 0:
                char.clothes.hat.style = drawableID;
                char.clothes.hat.texture = textureID;
                break;
            case 1:
                char.clothes.glasses.style = drawableID;
                char.clothes.glasses.texture = textureID;
                break;
            case 2:
                char.clothes.ears.style = drawableID;
                char.clothes.ears.texture = textureID;
                break;

            case 6:
                char.clothes.watch.style = drawableID;
                char.clothes.watch.texture = textureID;
                break;
            case 7:
                char.clothes.bracelet.style = drawableID;
                char.clothes.bracelet.texture = textureID;
                break;
        }

        SetPedPropIndex(
            PlayerPedId(),
            componentID,
            drawableID,
            textureID,
            attach
        );

        cb({ componentID, drawableID, textureID, attach });
    }
);

const closeCharCreator = async (char: IChar) => {
    hideUi("charcreation:show");

    const playerPed = PlayerPedId();
    DoScreenFadeOut(1000);
    await Delay(1000);

    if (camSkin) SetCamActive(camSkin, false);

    RenderScriptCams(false, false, 0, true, true);

    enable = false;

    EnableAllControlActions(0);

    FreezeEntityPosition(playerPed, false);

    SetEntityCoords(
        playerPed,
        config.playerSpawnLocation.x,
        config.playerSpawnLocation.y,
        config.playerSpawnLocation.z,
        true,
        false,
        false,
        false
    );

    SetEntityHeading(playerPed, config.playerSpawnLocation.h);

    Wait(1000);

    DisplayRadar(true);

    DoScreenFadeIn(1000);

    await Delay(1000);

    emitNet("codex-charcreator:finish", GetPlayerServerId(PlayerId()), char);
};

RegisterNuiCallbackType("codex-charcreator:finish");

on("__cfx_nui:codex-charcreator:finish", async (char: IChar, cb: Function) => {
    await closeCharCreator(char);

    cb(true);
});

// Hide Player

const avoidCollision = () => {
    for (let i = 0; i < 256; i++) {
        if (NetworkIsPlayerActive(i)) {
            SetEntityVisible(GetPlayerPed(i), false, false);
            SetEntityVisible(PlayerPedId(), true, true);
            SetEntityNoCollisionEntity(
                GetPlayerPed(i),
                GetPlayerPed(-1),
                false
            );
        }
    }
};

const visible = async () => {
    while (enable === true) {
        await Delay(1);
        DisableAllControlActions(0);
        avoidCollision();
    }
};

// Open Menu

onNet("codex-charcreator", () => {
    startCharCreation();
});
