import { Bodies, Body } from "matter-js"
import { Moving, Scene, SceneManager } from "../../lib/Trengine/src"
import { CollisionTileMap } from "../../lib/Trengine/src/Components/CollisionTileMap"
import { MatterBody } from "../../lib/Trengine/src/Components/MatterBody"
import { TileMap } from "../../lib/Trengine/src/Components/TileMap"
import { TwoSprite } from "../../lib/Trengine/src/Components/TwoSprite"
import { CanvasRenderer } from "../../lib/Trengine/src/Systems/CanvasRenderer"
import { MatterUpdater } from "../../lib/Trengine/src/Systems/MatterUpdater"
import { ParticleUpdater } from "../../lib/Trengine/src/Systems/ParticleUpdater"
import { SpriteUpdater } from "../../lib/Trengine/src/Systems/SpriteUpdater"
import { Player } from "../Components/Player"
import { GameConfiguration } from "../Systems/GameConfiguration"
import { PlayerController } from "../Systems/PlayerController"

export function buildLevelDesignerScene() {
    const scene = new Scene()

    scene
        .registerSystem(CanvasRenderer)

    return scene
}
