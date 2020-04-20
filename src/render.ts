import * as PIXI from 'pixi.js'
import { characters } from './kiltagear'
import { GameState } from './types'
import { hasHitboxEnded, isHitboxActive } from './utilities'

var type = 'WebGL'
if (!PIXI.utils.isWebGLSupported()) {
    type = 'canvas'
}

const app = new PIXI.Application({backgroundColor: 0x7799FF, width: 1200, height: 675})
const windowWidth = window.innerWidth
const windowHeight = window.innerHeight

app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'
app.renderer.autoResize = false
app.renderer.resize(windowWidth, windowHeight)

document.body.appendChild(app.view)

const middleX = app.renderer.width / 2
const middleY = app.renderer.height / 2



/*
 * Assets
 */
var titleBeam1Url = require('./assets/sprites/title-2.png')
var titleBeam2Url = require('./assets/sprites/title-3.png')
var titleBeam3Url = require('./assets/sprites/title-4.png')
var titleHoverUrl = require('./assets/sprites/title.png')

var UrlKatshuma = require('./assets/sprites/character-select-katshuma.jpg')
var UrlmmKALLL = require('./assets/sprites/character-select-mmkalll.jpg')
var UrlTruemmKALLL = require('./assets/sprites/character-select-true-mmkalll.jpg')

var characterBaseUrl = require('./assets/sprites/character.png')
var UrlKatshumaSmall = require('./assets/sprites/in-game-katshuma.jpg')
var UrlmmKALLLSmall = require('./assets/sprites/in-game-mmkalll.jpg')
var UrlTruemmKALLLSmall = require('./assets/sprites/in-game-true-mmkalll.jpg')

var red = require('./assets/sprites/color-red.png')
var yellow = require('./assets/sprites/color-yellow.png')



/*
 * Title screen
 */
const titleBeam1 = PIXI.Sprite.from(titleBeam1Url)
const titleBeam2 = PIXI.Sprite.from(titleBeam2Url)
const titleBeam3 = PIXI.Sprite.from(titleBeam3Url)
const titleEsa = PIXI.Sprite.from(titleHoverUrl)

titleBeam1.anchor.set(0.5, 0.5)
titleBeam2.anchor.set(0.5, 0.5)
titleBeam3.anchor.set(0.5, 0.5)

const titleTextStyle = new PIXI.TextStyle({
    fontFamily: 'Arial', fontSize: 108, fontWeight: 'bold',
    fill: ['#FF0000', '#FFFFFF', '#FFFF00'], stroke: '#000000',
    strokeThickness: 4, dropShadow: true, dropShadowColor: '#000000'
})

const pressAnyKeyTextStyle = new PIXI.TextStyle({
    fontSize: 30
})

const titleText = new PIXI.Text('KiltaGear', titleTextStyle)
titleText.anchor.set(0.5)
const versionNumber = new PIXI.Text('v0.5', new PIXI.TextStyle({fontSize: 22}))
versionNumber.x = 195
versionNumber.y = 45
const pressAnyKeyText = new PIXI.Text('Press any key to continue', pressAnyKeyTextStyle)
pressAnyKeyText.anchor.set(0.5)
pressAnyKeyText.y = 190
const titleContainer = new PIXI.Container()
titleBeam1.x, titleBeam2.x, titleBeam3.x = middleX
titleBeam1.y, titleBeam2.y, titleBeam3.y = middleY
titleContainer.addChild(titleText, versionNumber, pressAnyKeyText)
titleContainer.x = middleX
titleContainer.y = middleY



/*
 * Character select
 */
const characterGridKatshuma = PIXI.Sprite.from(UrlKatshumaSmall)
const characterGridmmKALLL = PIXI.Sprite.from(UrlmmKALLLSmall)
const characterGridTruemmKALLL = PIXI.Sprite.from(UrlTruemmKALLLSmall)
characterGridKatshuma.width = 80
characterGridKatshuma.height = 80
characterGridmmKALLL.width = 80
characterGridmmKALLL.height = 80
characterGridTruemmKALLL.width = 80
characterGridTruemmKALLL.height = 80

var characterSelectionSize = Math.min(app.renderer.width / 4.1, app.renderer.height / 3)

const characterSelectionKatshuma1 = PIXI.Sprite.from(UrlKatshuma)
const characterSelectionmmKALLL1 = PIXI.Sprite.from(UrlmmKALLL)
const characterSelectionTruemmKALLL1 = PIXI.Sprite.from(UrlTruemmKALLL)
characterSelectionKatshuma1.width = characterSelectionSize
characterSelectionKatshuma1.height = characterSelectionSize
characterSelectionmmKALLL1.width = characterSelectionSize
characterSelectionmmKALLL1.height = characterSelectionSize
characterSelectionTruemmKALLL1.width = characterSelectionSize
characterSelectionTruemmKALLL1.height = characterSelectionSize

const characterSelectionKatshuma2 = PIXI.Sprite.from(UrlKatshuma)
const characterSelectionmmKALLL2 = PIXI.Sprite.from(UrlmmKALLL)
const characterSelectionTruemmKALLL2 = PIXI.Sprite.from(UrlTruemmKALLL)
characterSelectionKatshuma2.width = characterSelectionSize
characterSelectionKatshuma2.height = characterSelectionSize
characterSelectionmmKALLL2.width = characterSelectionSize
characterSelectionmmKALLL2.height = characterSelectionSize
characterSelectionTruemmKALLL2.width = characterSelectionSize
characterSelectionTruemmKALLL2.height = characterSelectionSize

const characterGrid = new PIXI.Container()
characterGrid.addChild(
    characterGridKatshuma,
    characterGridmmKALLL,
    characterGridTruemmKALLL
)
// Prevent images from overlapping
for (var i = 0; i < characterGrid.children.length; i++) {
    characterGrid.children[i].x = i * 80
}
characterGrid.x = middleX - (characterGrid.width / 2)
characterGrid.y = middleY / 2

const characterSelection1 = new PIXI.Container()
const characterSelection2 = new PIXI.Container()
const characterSelection3 = new PIXI.Container()
const characterSelection4 = new PIXI.Container()
characterSelection2.addChild(characterSelectionKatshuma1, characterSelectionmmKALLL1, characterSelectionTruemmKALLL1)
characterSelection3.addChild(characterSelectionKatshuma2, characterSelectionmmKALLL2, characterSelectionTruemmKALLL2)

characterSelection1.x = app.renderer.width * 0 / 4 + ((app.renderer.width / 4 - characterSelectionSize) / 2)
characterSelection1.y = middleY
characterSelection2.x = app.renderer.width * 1 / 4 + ((app.renderer.width / 4 - characterSelectionSize) / 2)
characterSelection2.y = middleY
characterSelection3.x = app.renderer.width * 2 / 4 + ((app.renderer.width / 4 - characterSelectionSize) / 2)
characterSelection3.y = middleY
characterSelection4.x = app.renderer.width * 3 / 4 + ((app.renderer.width / 4 - characterSelectionSize) / 2)
characterSelection4.y = middleY

const characterNameStyle1 = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: ['#FF0000'],
    stroke: '#000000',
    strokeThickness: 4,
    dropShadow: true, dropShadowColor: '#000000', dropShadowAngle: 0, dropShadowDistance: 1
})
const characterNameStyle2 = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: ['#FFFF00'],
    stroke: '#000000',
    strokeThickness: 4,
    dropShadow: true, dropShadowColor: '#000000', dropShadowAngle: 0, dropShadowDistance: 1
})

const characterName1 = new PIXI.Text('Katshuma', characterNameStyle1)
const characterName2 = new PIXI.Text('mmKALLL', characterNameStyle2)
//characterName1.anchor.set(0.5)
//characterName2.anchor.set(0.5)
characterName1.y = characterSelectionSize
characterName2.y = characterSelectionSize

characterSelection2.addChild(characterName1)
characterSelection3.addChild(characterName2)

const versus = new PIXI.Text("VS.", titleTextStyle)
versus.anchor.set(0.5, 0.5)
versus.x = middleX
versus.y = middleY

const readyToStartTextStyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 24,
    fill: ['#00FF00']
})
const readyToStart = new PIXI.Text('Select your characters', readyToStartTextStyle)
readyToStart.anchor.set(0.5)
readyToStart.x = middleX
readyToStart.y = middleY + 230

const instructionsLeft = new PIXI.Text('Move: WASD\nAttack: C', readyToStartTextStyle)
const instructionsRight = new PIXI.Text('Move: Arrow keys\nAttack: Comma (,)', readyToStartTextStyle)
characterSelection1.addChild(instructionsLeft)
characterSelection4.addChild(instructionsRight)
/*
function gradient(from: string, to: string): PIXI.Texture {
    let c = document.createElement("canvas")
    let ctx = c.getContext("2d")
    if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 100, 100)
        gradient.addColorStop(0, from)
        gradient.addColorStop(1, to)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 100, 100)
        return PIXI.Texture.from(c)
    } else throw "error"
}

const star = new PIXI.Graphics().beginTextureFill(gradient('#9ff', '#033')).drawStar(50, 50, 5, 50, 20)
*/
const player1Color = PIXI.Texture.from(red)
const player2Color = PIXI.Texture.from(yellow)

// Initialize selector trails
var player1Trail: PIXI.Point[] = []
var player2Trail: PIXI.Point[] = []
for (var i = 0; i < 20; i++) {
    player1Trail.push(new PIXI.Point(0, 0))
    player2Trail.push(new PIXI.Point(0, 0))
}
function resetTrails(player1X, player2X): void {
    for (var i = 0; i < 20; i++) {
        player1Trail[i].x = 0 + (player1X * 80)
        player1Trail[i].y = i * 4
        player2Trail[i].x = 80 + (player2X * 80)
        player2Trail[i].y = 80 - (i * 4)
    }
}

// Create selectors
const player1Selector = new PIXI.SimpleRope(player1Color, player1Trail);
const player2Selector = new PIXI.SimpleRope(player2Color, player2Trail)
characterGrid.addChild(player1Selector, player2Selector)
/*
const selectionBox = new PIXI.Graphics()
selectionBox.lineStyle(4, 0xFFFF00, 1)
selectionBox.moveTo(0, 0)
selectionBox.lineTo(64, 0)
selectionBox.lineTo(64, 64)
selectionBox.lineTo(0, 64)
selectionBox.lineTo(0, 0)
selectionBox.pivot.set(32, 32)
//selectionBox.x = middleX + (characterSelectionColumns / 2) * 64
selectionBox.y = middleY
//app.stage.addChild(selectionBox)
*/
const characterSelectionBackgroundVertical = new PIXI.Graphics()
characterSelectionBackgroundVertical.lineStyle(4, 0x000000, 0.65)
for (var x = -64; x < app.renderer.width; x += 64) {
    characterSelectionBackgroundVertical.moveTo(x, 0)
    characterSelectionBackgroundVertical.lineTo(x, app.renderer.height)
}
const characterSelectionBackgroundHorizontal = new PIXI.Graphics()
characterSelectionBackgroundHorizontal.lineStyle(4, 0x000000, 0.65)
for (var y = -64; y < app.renderer.height; y += 64) {
    characterSelectionBackgroundHorizontal.moveTo(0, y)
    characterSelectionBackgroundHorizontal.lineTo(app.renderer.width, y)
}



/*
 * In-game characters
 */
const characterBody1 = PIXI.Sprite.from(characterBaseUrl)
const characterBody2 = PIXI.Sprite.from(characterBaseUrl)
const ingameKatshuma1 = PIXI.Sprite.from(UrlKatshumaSmall)
const ingameKatshuma2 = PIXI.Sprite.from(UrlKatshumaSmall)
const ingamemmKALLL1 = PIXI.Sprite.from(UrlmmKALLLSmall)
const ingamemmKALLL2 = PIXI.Sprite.from(UrlmmKALLLSmall)
const ingameTruemmKALLL1 = PIXI.Sprite.from(UrlTruemmKALLLSmall)
const ingameTruemmKALLL2 = PIXI.Sprite.from(UrlTruemmKALLLSmall)
const characterSprites1 = [ingameKatshuma1, ingamemmKALLL1, ingameTruemmKALLL1]
const characterSprites2 = [ingameKatshuma2, ingamemmKALLL2, ingameTruemmKALLL2]
characterBody1.x = 0
characterBody1.y = 0

for (var i = 0; i < characterSprites1.length; i++) {
    characterSprites1[i].anchor.set(0.5)
    characterSprites1[i].width = 40
    characterSprites1[i].height = 40
    characterSprites1[i].x = 50
    characterSprites1[i].y = 25
    characterSprites2[i].anchor.set(0.5)
    characterSprites2[i].width = 40
    characterSprites2[i].height = 40
    characterSprites2[i].x = 50
    characterSprites2[i].y = 25
}

// Containers that group the character body and in-game sprite
const container1 = new PIXI.Container()
const container2 = new PIXI.Container()
container1.pivot.set(50)
container2.pivot.set(50)



/*
 * Gameplay features
 */
const hurtboxes = new PIXI.Graphics()
hurtboxes.alpha = 0.5
const hitboxes = new PIXI.Graphics()
hitboxes.alpha = 0.5

const healthBarLeftBackground = new PIXI.Graphics()
const healthBarRightBackground = new PIXI.Graphics()
const healthBarLeft = new PIXI.Graphics()
const healthBarRight = new PIXI.Graphics()
const meterLeft = new PIXI.Graphics()
const meterRight = new PIXI.Graphics()

healthBarLeftBackground.beginFill(0xFF0000)
healthBarLeftBackground.drawRect(windowWidth * 0.06, 26, windowWidth * 0.4, 20)
healthBarLeftBackground.endFill()
healthBarRightBackground.beginFill(0xFF0000)
healthBarRightBackground.drawRect(windowWidth / 2 + windowWidth * 0.04, 26, windowWidth * 0.4, 20)
healthBarRightBackground.endFill()
healthBarLeft.beginFill(0x00FF00)
healthBarLeft.drawRect(windowWidth * 0.06, 26, windowWidth * 0.4, 20)
healthBarLeft.endFill()
healthBarRight.beginFill(0x00FF00)
healthBarRight.drawRect(windowWidth / 2 + windowWidth * 0.04, 26, windowWidth * 0.4, 20)
healthBarRight.endFill()

// Backgrounds
var backgroundUrl = require('./assets/sprites/ingame-6.jpg')

const background1 = PIXI.Sprite.from(backgroundUrl) // 2730 (width of original image) / 2.275 = 1200

const backgroundOriginalWidth = 2730 // background1 image width is hardcoded here to be 2730
const backgroundOriginalHeight = 1536 // background1 image height is hardcoded here to be 1536

// Game over
const winnerText = new PIXI.Text('Game over!', titleTextStyle)
winnerText.anchor.set(0.5)
winnerText.x = middleX
winnerText.y = middleY

// Gamestate transitions
function transitionToTitleScreen(): void {
    app.renderer.backgroundColor = 0x7799FF
    app.stage.removeChildren()
    app.stage.addChild(titleBeam1, titleBeam2, titleBeam3, titleEsa, titleContainer)
}

function transitionToCharacterSelect(player1: number, player2: number): void {
    player1Selection = player1
    player2Selection = player2
    resetTrails(player1Selection, player2Selection)
    app.renderer.backgroundColor = 0x3300AA
    app.stage.removeChildren()
    app.stage.addChild(characterSelectionBackgroundVertical, characterSelectionBackgroundHorizontal)
    app.stage.addChild(characterGrid)
    app.stage.addChild(characterSelection1, characterSelection2, characterSelection3, characterSelection4)
    //app.stage.addChild(versus, readyToStart)
}

function transitionToIngame(player1: number, player2: number): void {
    container1.removeChildren()
    container1.addChild(characterBody1, characterSprites1[player1])
    container2.removeChildren()
    container2.addChild(characterBody2, characterSprites2[player2])

    app.stage.removeChildren()
    app.stage.addChild(background1, container1, container2)
    app.stage.addChild(hurtboxes, hitboxes)
    app.stage.addChild(healthBarLeftBackground, healthBarLeft)
    app.stage.addChild(meterLeft)
    app.stage.addChild(healthBarRightBackground, healthBarRight)
    app.stage.addChild(meterRight)
}

let previousScreen = ''
let hover: number = 0
let fade : number = 0
titleEsa.x = 20
let trailFrame: number = 0
let player1Selection = 0
let player2Selection = 0

export function render(state: GameState): void {
    if (state.screen === 'title-screen') {
        if (previousScreen != 'title-screen') {
            previousScreen = 'title-screen'
            transitionToTitleScreen()
        }
        titleBeam1.rotation += 0.005
        titleBeam2.rotation += 0.005
        titleBeam3.rotation += 0.005
        titleEsa.y = Math.sin(hover) * 40 + 60
        hover += 0.0225
        titleEsa.alpha = (Math.sin(fade) + 1.2) / 2.2
        fade += 0.025
    }
    if (state.screen === 'character-select') {
        if (previousScreen != 'character-select') {
            previousScreen = 'character-select'
            transitionToCharacterSelect(state.characterSelection[0], state.characterSelection[1])
            trailFrame = 0
        }

        // Animate character selectors
        player1Trail.pop()
        if (trailFrame % 80 < 20) {
            player1Trail.unshift(new PIXI.Point(player1Trail[0].x + 4, player1Trail[0].y));
            player2Trail.unshift(new PIXI.Point(player2Trail[0].x - 4, player2Trail[0].y));
        } else if (trailFrame % 80 < 40) {
            player1Trail.unshift(new PIXI.Point(player1Trail[0].x, player1Trail[0].y + 4));
            player2Trail.unshift(new PIXI.Point(player2Trail[0].x, player2Trail[0].y - 4));
        } else if (trailFrame % 80 < 60) {
            player1Trail.unshift(new PIXI.Point(player1Trail[0].x - 4, player1Trail[0].y));
            player2Trail.unshift(new PIXI.Point(player2Trail[0].x + 4, player2Trail[0].y));
        } else {
            player1Trail.unshift(new PIXI.Point(player1Trail[0].x, player1Trail[0].y - 4));
            player2Trail.unshift(new PIXI.Point(player2Trail[0].x, player2Trail[0].y + 4));
        }
        trailFrame++
        
        // Move character selectors in the grid
        if (player1Selection < state.characterSelection[0]) {
            player1Trail[0].x += 80
            player1Selection++
        } else if (player1Selection > state.characterSelection[0]) {
            player1Trail[0].x -= 80
            player1Selection--
        }
        if (player2Selection < state.characterSelection[1]) {
            player2Trail[0].x += 80
            player2Selection++
        } else if (player2Selection > state.characterSelection[1]) {
            player2Trail[0].x -= 80
            player2Selection--
        }

        // Show the selected character
        switch (state.characterSelection[0]) {
            case 0:
                characterSelectionKatshuma1.visible = true
                characterSelectionmmKALLL1.visible = false
                characterSelectionTruemmKALLL1.visible = false
                characterName1.text = 'Katshuma'
                break
            case 1:
                characterSelectionKatshuma1.visible = false
                characterSelectionmmKALLL1.visible = true
                characterSelectionTruemmKALLL1.visible = false
                characterName1.text = 'mmKALLL'
                break
            case 2:
                characterSelectionKatshuma1.visible = false
                characterSelectionmmKALLL1.visible = false
                characterSelectionTruemmKALLL1.visible = true
                characterName1.text = '真・mmKALLL'
                break
        }
        switch (state.characterSelection[1]) {
            case 0:
                characterSelectionKatshuma2.visible = true
                characterSelectionmmKALLL2.visible = false
                characterSelectionTruemmKALLL2.visible = false
                characterName2.text = 'Katshuma'
                break
            case 1:
                characterSelectionKatshuma2.visible = false
                characterSelectionmmKALLL2.visible = true
                characterSelectionTruemmKALLL2.visible = false
                characterName2.text = 'mmKALLL'
                break
            case 2:
                characterSelectionKatshuma2.visible = false
                characterSelectionmmKALLL2.visible = false
                characterSelectionTruemmKALLL2.visible = true
                characterName2.text = '真・mmKALLL'
                break
        }
        characterSelectionBackgroundVertical.x = (characterSelectionBackgroundVertical.x) % 64
        characterSelectionBackgroundHorizontal.y = (characterSelectionBackgroundHorizontal.y + 1) % 64
    }
    if (state.screen === 'in-game') {
        if (previousScreen != 'in-game') {
            previousScreen = 'in-game'
            transitionToIngame(state.characterSelection[0], state.characterSelection[1])
        }
        state.players.forEach(player => {
            // Draw something at (player.x, player.y)
            // Need to implement player sprites in a smart way first
        })

        // Flip player sprite when player turns around
        if (state.players[0].facing == 'left' && Math.sign(container1.getChildAt(1).scale.x) == 1) {
            container1.getChildAt(1).scale.x *= -1
        } else if (state.players[0].facing == 'right' && Math.sign(container1.getChildAt(1).scale.x) == -1) {
            container1.getChildAt(1).scale.x *= -1
        }
        if (state.players[1].facing == 'left' && Math.sign(container2.getChildAt(1).scale.x) == 1) {
            container2.getChildAt(1).scale.x *= -1
        } else if (state.players[1].facing == 'right' && Math.sign(container2.getChildAt(1).scale.x) == -1) {
            container2.getChildAt(1).scale.x *= -1
        }

        // Camera
        let cameraLeft = state.players[0].x < state.players[1].x ? state.players[0].x - 300 : state.players[1].x - 300
        let cameraRight = state.players[0].x > state.players[1].x ? state.players[0].x + 300 : state.players[1].x + 300
        cameraLeft = cameraLeft < 0 ? 0 : cameraLeft
        cameraRight = cameraRight > 1200 ? 1200 : cameraRight
        let currentMaxCharacterHeight = Math.max(600 - state.players[0].y, 600 - state.players[1].y)
        if (currentMaxCharacterHeight > 0) {
            cameraLeft -= currentMaxCharacterHeight / 2
            cameraRight += currentMaxCharacterHeight / 2
            if (cameraLeft < 0) {
                cameraRight -= cameraLeft
                cameraLeft = 0
            }
            if (cameraRight > 1200) {
                cameraLeft -= cameraRight - 1200
                cameraRight = 1200
            }
            if (cameraLeft < 0) {
                cameraLeft = 0
            }
        }
        let visibleAreaWidth = cameraRight - cameraLeft
        let howManyPixelsX = backgroundOriginalWidth * (visibleAreaWidth / 1200)
        // pikselien määrä, mikä alkuperäisestä taustasta on näkyvissä

        // niin monta pikseliä täytyy mahduttaa tilaan "windowWidth"
        // saadaan skaala, jolla alkuperäinen width täytyy kertoa
        let scaleBackground = windowWidth / howManyPixelsX
        background1.width = backgroundOriginalWidth * scaleBackground
        background1.height = backgroundOriginalHeight * scaleBackground

        // cameraLeft / 1200 on kuinka suuri osa background1.widthistä jää kuvan vasemmalle puolelle
        background1.x = background1.width * (-cameraLeft / 1200)
        background1.y = windowHeight - background1.height

        // Players
        let playerScale = background1.width / windowWidth
        container1.scale.set(playerScale)
        container2.scale.set(playerScale)
        let pixelScale = windowWidth / visibleAreaWidth
        container1.x = ((state.players[0].x - cameraLeft) * pixelScale)
        container2.x = ((state.players[1].x - cameraLeft) * pixelScale)
        // windowHeight / background1.height kertoo, miten suuri osuus taustakuvan alaosasta on näkyvissä
        container1.y = ((state.players[0].y - (675 - (675 * windowHeight / background1.height))) / (675 * windowHeight / background1.height) * windowHeight)
        container2.y = ((state.players[1].y - (675 - (675 * windowHeight / background1.height))) / (675 * windowHeight / background1.height) * windowHeight)
        
        // Player rotation in hitstun
        if (state.players[0].state == 'hitstun') {
            if (state.players[0].facing == 'left') {
                container1.angle += 15
            } else {
                container1.angle -= 15
            }
        } else {
            container1.angle = 0
        }
        if (state.players[1].state == 'hitstun') {
            if (state.players[1].facing == 'left') {
                container2.angle += 15
            } else {
                container2.angle -= 15
            }
        } else {
            container2.angle = 0
        }

        // Draw hurtboxes
        hurtboxes.clear()
        hurtboxes.beginFill(0x6688FF)
        hurtboxes.drawCircle(
            container1.x,
            container1.y,
            state.players[0].character.hurtboxRadius * playerScale
        )
        hurtboxes.drawCircle(
            container2.x,
            container2.y,
            state.players[1].character.hurtboxRadius * playerScale
        )
        hurtboxes.endFill()

        // Draw hitboxes
        hitboxes.clear()
        hitboxes.beginFill(0xDD0000)
        state.activeAttacks.forEach(attack => {
            attack.hitboxes.forEach(hitbox => {
                if (isHitboxActive(hitbox)) {
                    if (hitbox.movesWithCharacter) {
                        if (attack.playerSlot === 0) {
                            hitboxes.drawCircle(
                                container1.x + (hitbox.x * attack.xDirection * playerScale),
                                container1.y + (hitbox.y * playerScale),
                                hitbox.radius * playerScale
                            )
                        } else if (attack.playerSlot === 1) {
                            hitboxes.drawCircle(
                                container2.x + (hitbox.x * attack.xDirection * playerScale),
                                container2.y + (hitbox.y * playerScale),
                                hitbox.radius * playerScale
                            )
                        } else {
                            console.log('Rendering hitboxes is not implemented for more than 2 players')
                        }
                    } else { // TODO: Make sure this draws hitboxes in the right place
                        hitboxes.drawCircle(
                            ((hitbox.x - cameraLeft) * pixelScale),
                            ((hitbox.y - (675 - (675 * windowHeight / background1.height))) / (675 * windowHeight / background1.height) * windowHeight),
                            hitbox.radius * playerScale
                        )
                    }
                }
            })
        })
        hitboxes.endFill()

        // Health
        healthBarLeft.clear()
        healthBarLeft.beginFill(0x00FF00)

        let player1HealthRemaining = state.players[0].health / state.players[0].character.maxHealth
        let player2HealthRemaining = state.players[1].health / state.players[1].character.maxHealth
        healthBarLeft.drawRect((windowWidth * 0.06) + (windowWidth * 0.4 * (1 - player1HealthRemaining)), 26, windowWidth * 0.4 * player1HealthRemaining, 20)
        healthBarLeft.endFill()
        healthBarRight.clear()
        healthBarRight.beginFill(0x00FF00)
        healthBarRight.drawRect((windowWidth / 2 + windowWidth * 0.04) + (windowWidth * 0.4 * (1 - player2HealthRemaining)), 26, windowWidth * 0.4 * player2HealthRemaining, 20)
        healthBarRight.endFill()
    }
    if (state.screen === 'game-over') {
        if (previousScreen != 'game-over') {
            previousScreen = 'game-over'
            if (state.winner != undefined) {
                winnerText.text = 'Winner: ' + state.winner.character.name
            } else {
                winnerText.text = 'Game over!'
            }
            app.stage.addChild(winnerText)
        }
    }
}
