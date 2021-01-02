import { Bodies, Body } from "matter-js"
import { Moving, Position, Scene, SceneManager } from "../../lib/Trengine/src"
import { CollisionTileMap } from "../../lib/Trengine/src/Components/CollisionTileMap"
import { MatterBody } from "../../lib/Trengine/src/Components/MatterBody"
import { TileMap } from "../../lib/Trengine/src/Components/TileMap"
import { TwoPrimitiveShape } from "../../lib/Trengine/src/Components/TwoPrimitiveShape"
import { TwoSprite } from "../../lib/Trengine/src/Components/TwoSprite"
import { CanvasRenderer } from "../../lib/Trengine/src/Systems/CanvasRenderer"
import { MatterUpdater } from "../../lib/Trengine/src/Systems/MatterUpdater"
import { ParticleUpdater } from "../../lib/Trengine/src/Systems/ParticleUpdater"
import { SpriteUpdater } from "../../lib/Trengine/src/Systems/SpriteUpdater"
import { Player } from "../Components/Player"
import { GameConfiguration } from "../Systems/GameConfiguration"
import { LevelDesignerController } from "../Systems/LevelDesignerController"
import { PlayerController } from "../Systems/PlayerController"
import { createLevelDesignerUI, destroyLevelDesignerVue } from '../UI/LevelDesigner/main'

export function buildLevelDesignerScene() {
    const scene = new Scene()

    scene
        .registerSystem(CanvasRenderer)
        .registerSystem(LevelDesignerController)
        .registerSystem(Moving)

    // scene.unRegisterSystem(LevelDesignerController)

    scene.createEntity().addComponent(Position).addComponent(TwoPrimitiveShape)

    createLevelDesignerUI(scene)

    return scene
}
