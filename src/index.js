import { Shapes, TwoPrimitiveShape } from '../lib/Trengine/src/Components/TwoPrimitiveShape'
import { TwoSprite } from '../lib/Trengine/src/Components/TwoSprite'
import { Property, Type } from '../lib/Trengine/src/EntityStore'
import { SceneManager, DeltaTimer, Scene, Moving, Position, Velocity } from '../lib/Trengine/src/index'
import { DOWN, PRESSED } from '../lib/Trengine/src/InputManager'
import { CanvasRenderer } from '../lib/Trengine/src/Systems/CanvasRenderer'
import { MatterUpdater } from '../lib/Trengine/src/Systems/MatterUpdater'
import { ParticleUpdater } from '../lib/Trengine/src/Systems/ParticleUpdater'
import { SpriteUpdater } from '../lib/Trengine/src/Systems/SpriteUpdater'
import { buildLevelDesignerScene } from './Scenes/levelDesigner'
import { buildTestScene } from './Scenes/test'
import { GameConfiguration } from './Systems/GameConfiguration'
import { LevelDesignerController } from './Systems/LevelDesignerController'
import { PlayerController } from './Systems/PlayerController'
import { createLevelDesignerUI } from './UI/LevelDesigner/main'

SceneManager
    .getInputManager()
    .registerBinding('right', ['ARROWRIGHT', 'D'], DOWN)
    .registerBinding('left', ['ARROWLEFT', 'A'], DOWN)
    .registerBinding('jump', ['ARROWUP', 'W', 'SPACE'], PRESSED)
    .registerBinding('heldJump', ['ARROWUP', 'W'], DOWN)
    .registerBinding('down', ['ARROWDOWN', 'S'], DOWN)
    .registerBinding('heldShift', 'SHIFT', DOWN)

SceneManager
    .getSystemStore()
    .registerSystem(CanvasRenderer)
    .registerSystem(MatterUpdater)
    .registerSystem(Moving)
    .registerSystem(ParticleUpdater)
    .registerSystem(SpriteUpdater)
    .registerSystem(GameConfiguration)
    .registerSystem(LevelDesignerController)
    .registerSystem(PlayerController)

SceneManager.getEntityStore()
    .registerEntity('Moving Rectangle')
    .addComponent(Position, [
        new Property('x', Type.Number, 0),
        new Property('y', Type.Number, 0)
    ])
    .addComponent(Velocity, [
        new Property('x', Type.Number, 1),
        new Property('y', Type.Number, 0)
    ])
    .addComponent(TwoPrimitiveShape, [
        new Property('width', Type.Number, 10),
        new Property('height', Type.Number, 10),
        new Property('shape', Type.Number, Shapes.rectangle),
        new Property('color', Type.Color, '#FFFFFF'),
    ])

SceneManager.getEntityStore()
    .registerEntity('Rectangle')
    .addComponent(Position, [
        new Property('x', Type.Number, 0),
        new Property('y', Type.Number, 0)
    ])
    .addComponent(TwoPrimitiveShape, [
        new Property('width', Type.Number, 10),
        new Property('height', Type.Number, 10),
        new Property('shape', Type.Number, Shapes.rectangle),
        new Property('color', Type.Color, '#FFFFFF'),
    ])

SceneManager.getAssetStore()
    .loadManifest('./assets/manifest.json')
    .then(async () => {
        await SceneManager.getAssetStore().loadBundle('main')
    })
    .then(() => {
        createLevelDesignerUI()

        go()
    })

const dt = new DeltaTimer();
let go = () => {
    requestAnimationFrame(go)
    SceneManager.update(dt.step())
}