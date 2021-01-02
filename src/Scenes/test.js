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

export function buildTestScene() {
    const testScene = new Scene()

    testScene
        .registerSystem(CanvasRenderer)
        .registerSystem(Moving)
        .registerSystem(SpriteUpdater)
        .registerSystem(MatterUpdater)
        .registerSystem(PlayerController)
        .registerSystem(ParticleUpdater)
        .registerSystem(GameConfiguration)

    
    testScene
        .createEntity()
        .addComponent(Player)
        .addComponent(MatterBody, {
            body: Body.create({
                parts: [
                    Bodies.circle(0, 0, 43, { label: "Player" }),
                    Bodies.rectangle(0, 45, 55, 15, { label: "PlayerFloorSensor", isSensor: true })
                ], mass: 0, friction: 0
            })
        })
        .addComponent(TwoSprite, { texture: SceneManager.getAssetStore().images['RDRight.png'], scale: 4, renderOffsetY: -6 })

    testScene
        .createEntity()
        .addComponent(TileMap, { texture: SceneManager.getAssetStore().images['ForestTileMap.png'], tileSize: 16, columns: 7, rows: 4, tileData: SceneManager.getAssetStore().data['mainTileMap.json'], position: { x: -100, y: 0 } })
        .addComponent(CollisionTileMap, { tileSize: 16 * 6, columns: 7, rows: 4, tileData: SceneManager.getAssetStore().data['mainTileMap.json'].map(index => (index > 0 && index <= 9) ? index : 0), position: { x: -100, y: 0 } })

    return testScene
}
