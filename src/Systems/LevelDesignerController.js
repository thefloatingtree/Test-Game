import { SceneManager, System } from "../../lib/Trengine/src";
import { Camera } from "../../lib/Trengine/src/Components/Camera";

export class LevelDesignerController extends System {
    init(scene) {
        this.input = SceneManager.getInputManager()
        this.cameraVelocity = { x: 0, y: 0 }
        
        this.camera = this.queries.singleton.getComponent(Camera)
        this.camera.target = { x: 0, y: 0 }

    }

    dispose() {
        // document.getElementById('app').style.display = 'none'
    }

    update(delta) {
        let speed = 1.5
        if (this.input.getInput('heldShift')) {
            speed = 0.4
        }

        if (this.input.getInput('right')) {
            this.cameraVelocity.x += speed
        }
        if (this.input.getInput('left')) {
            this.cameraVelocity.x -= speed
        }
        if (this.input.getInput('heldJump')) {
            this.cameraVelocity.y -= speed
        }
        if (this.input.getInput('down')) {
            this.cameraVelocity.y += speed
        }

        this.camera.target.x += this.cameraVelocity.x
        this.camera.target.y += this.cameraVelocity.y

        this.cameraVelocity.x *= 0.85
        this.cameraVelocity.y *= 0.85
    }
}