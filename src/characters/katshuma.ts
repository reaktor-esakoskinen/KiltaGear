import { Character } from "../types";
import { generateAttack, createHitbox } from "../utilities";

export const Katshuma: Character = {
    name: 'Katshuma',
    id: 'katshuma',
    maxHealth: 100,
    walkSpeed: 7,
    airSpeed: 8,
    weight: 1,
    maxJumps: 2,
    jumpStrength: 1,
    hurtboxRadius: 20,
    attacks: {
        LightNeutral: {
            ...generateAttack([
                { ...createHitbox(4, 12, 5), radius: 123 },
                { ...createHitbox(12, 20, 10) }
            ]),
            projectile: false
        },
        LightForward: {
            ...generateAttack([
                {
                    damage: 4,
                    radius: 20,
                    knockbackBase: 6,
                    knockbackGrowth: 2,
                    knockbackX: 0.5, // NEEDS TO TAKE FACING INTO ACCOUNT
                    knockbackY: -1,
                    hitstunBase: 20,
                    hitstunGrowth: 1,
                    hitLag: 30,
                    // characterSpecific: ,
                    movesWithCharacter: true,
                    x: 5, // NEEDS TO TAKE FACING INTO ACCOUNT
                    y: 5,
                    framesUntilActivation: 0,
                    framesUntilEnd: 40,
                    // onStart: () => {},
                    onActivation: () => {},
                    onHit: () => {},
                    onEnd: () => {},
                }
            ])
        },
        LightDown: {
            ...generateAttack([
                {
                    damage: 6,
                    radius: 20,
                    knockbackBase: 15,
                    knockbackGrowth: 5,
                    knockbackX: 1, // NEEDS TO TAKE FACING INTO ACCOUNT
                    knockbackY: 1,
                    hitstunBase: 20,
                    hitstunGrowth: 1,
                    hitLag: 30,
                    // characterSpecific: ,
                    movesWithCharacter: true,
                    x: 30, // NEEDS TO TAKE FACING INTO ACCOUNT
                    y: 30,
                    framesUntilActivation: 0,
                    framesUntilEnd: 40,
                    // onStart: () => {},
                    onActivation: () => {},
                    onHit: () => {},
                    onEnd: () => {},
                }
            ])
        },
        airLightNeutral: {
            ...generateAttack([
                {
                    damage: 9,
                    radius: 20,
                    knockbackBase: 1,
                    knockbackGrowth: 1,
                    knockbackX: 1, // NEEDS TO TAKE FACING INTO ACCOUNT
                    knockbackY: -1,
                    hitstunBase: 20,
                    hitstunGrowth: 1,
                    hitLag: 30,
                    // characterSpecific: ,
                    movesWithCharacter: true,
                    x: 0, // NEEDS TO TAKE FACING INTO ACCOUNT
                    y: -5,
                    framesUntilActivation: 0,
                    framesUntilEnd: 40,
                    // onStart: () => {},
                    onActivation: () => {},
                    onHit: () => {},
                    onEnd: () => {},
                }
            ])
        },
        airLightUp: {
            ...generateAttack([
                {
                    damage: 4,
                    radius: 20,
                    knockbackBase: 12,
                    knockbackGrowth: 2,
                    knockbackX: 0, // NEEDS TO TAKE FACING INTO ACCOUNT
                    knockbackY: -1,
                    hitstunBase: 10,
                    hitstunGrowth: 1,
                    hitLag: 30,
                    // characterSpecific: ,
                    movesWithCharacter: true,
                    x: 10, // NEEDS TO TAKE FACING INTO ACCOUNT
                    y: -50,
                    framesUntilActivation: 0,
                    framesUntilEnd: 40,
                    // onStart: () => {},
                    onActivation: () => {},
                    onHit: () => {},
                    onEnd: () => {},
                }
            ]),
            ...generateAttack([
                {
                    damage: 4,
                    radius: 20,
                    knockbackBase: 18,
                    knockbackGrowth: 2,
                    knockbackX: 0, // NEEDS TO TAKE FACING INTO ACCOUNT
                    knockbackY: -1,
                    hitstunBase: 10,
                    hitstunGrowth: 1,
                    hitLag: 30,
                    // characterSpecific: ,
                    movesWithCharacter: true,
                    x: -10, // NEEDS TO TAKE FACING INTO ACCOUNT
                    y: -50,
                    framesUntilActivation: 0,
                    framesUntilEnd: 40,
                    // onStart: () => {},
                    onActivation: () => {},
                    onHit: () => {},
                    onEnd: () => {},
                }
            ])
        },
        airLightDown: {
            ...generateAttack([
                {
                    damage: 10,
                    radius: 30,
                    knockbackBase: 30,
                    knockbackGrowth: 3,
                    knockbackX: 0, // NEEDS TO TAKE FACING INTO ACCOUNT
                    knockbackY: 1,
                    hitstunBase: 10,
                    hitstunGrowth: 1,
                    hitLag: 30,
                    // characterSpecific: ,
                    movesWithCharacter: true,
                    x: 0, // NEEDS TO TAKE FACING INTO ACCOUNT
                    y: 50,
                    framesUntilActivation: 0,
                    framesUntilEnd: 40,
                    // onStart: () => {},
                    onActivation: () => {},
                    onHit: () => {},
                    onEnd: () => {},
                }
            ])
        },
        airLightForward: {
            ...generateAttack([
                {
                    damage: 5,
                    radius: 10,
                    knockbackBase: 10,
                    knockbackGrowth: 2,
                    knockbackX: 1, // NEEDS TO TAKE FACING INTO ACCOUNT
                    knockbackY: -0.2,
                    hitstunBase: 10,
                    hitstunGrowth: 1,
                    hitLag: 30,
                    // characterSpecific: ,
                    movesWithCharacter: true,
                    x: 15, // NEEDS TO TAKE FACING INTO ACCOUNT
                    y: -5,
                    framesUntilActivation: 0,
                    framesUntilEnd: 40,
                    // onStart: () => {},
                    onActivation: () => {},
                    onHit: () => {},
                    onEnd: () => {},
                }
            ])
        },
        airLightBack: {
            ...generateAttack([
                {
                    damage: 8,
                    radius: 20,
                    knockbackBase: 30,
                    knockbackGrowth: 5,
                    knockbackX: 1, // NEEDS TO TAKE FACING INTO ACCOUNT
                    knockbackY: -0.4,
                    hitstunBase: 25,
                    hitstunGrowth: 1,
                    hitLag: 30,
                    // characterSpecific: ,
                    movesWithCharacter: true,
                    x: 30, // NEEDS TO TAKE FACING INTO ACCOUNT
                    y: 0,
                    framesUntilActivation: 0,
                    framesUntilEnd: 40,
                    // onStart: () => {},
                    onActivation: () => {},
                    onHit: () => {},
                    onEnd: () => {},
                }
            ])
        },
        SpecialNeutral: {
            ...generateAttack([])
        },
        SpecialDown: {
            ...generateAttack([])
        },
        airSpecialNeutral: {
            ...generateAttack([])
        },
        airSpecialUp: {
            ...generateAttack([])
        },
        airSpecialDown: {
            ...generateAttack([])
        },
        airSpecialForward: {
            ...generateAttack([])
        },
        airSpecialBack: {
            ...generateAttack([])
        },
        MeterNeutral: {
            ...generateAttack([])
        },
        MeterForward: {
            ...generateAttack([])
        },
        MeterDown: {
            ...generateAttack([])
        },
        airMeterNeutral: {
            ...generateAttack([])
        },
        airMeterUp: {
            ...generateAttack([])
        },
        airMeterDown: {
            ...generateAttack([])
        },
        airMeterForward: {
            ...generateAttack([])
        },
        airMeterBack: {
            ...generateAttack([])
        }
    },
}
