import { Moving, SceneManager } from "../lib/Trengine/src";
import { CanvasRenderer } from "../lib/Trengine/src/Systems/CanvasRenderer";
import { MatterUpdater } from "../lib/Trengine/src/Systems/MatterUpdater";
import { ParticleUpdater } from "../lib/Trengine/src/Systems/ParticleUpdater";
import { SpriteUpdater } from "../lib/Trengine/src/Systems/SpriteUpdater";
import { GameConfiguration } from "./Systems/GameConfiguration";
import { LevelDesignerController } from "./Systems/LevelDesignerController";
import { PlayerController } from "./Systems/PlayerController";


export function registerSystems() {
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
}