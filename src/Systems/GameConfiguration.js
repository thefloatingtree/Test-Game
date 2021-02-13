import { SceneManager, System } from "../../lib/Trengine/src";
import { MatterEngine } from "../../lib/Trengine/src/Components/MatterEngine";

export class GameConfiguration extends System {
    init(scene) {
        this.queries.singleton.getComponent(MatterEngine).world().gravity.scale = 0.0017
        this.queries.singleton.getComponent(MatterEngine).renderAllWireframes = true
    }

    update(delta) {}
}