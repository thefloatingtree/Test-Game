import { SceneManager, DeltaTimer } from '../lib/Trengine/src/index'
import { DOWN, PRESSED } from '../lib/Trengine/src/InputManager'
import { buildLevelDesignerScene } from './Scenes/levelDesigner'
import { buildTestScene } from './Scenes/test'

SceneManager
    .getInputManager()
    .registerBinding('right', 'ARROWRIGHT', DOWN)
    .registerBinding('left', 'ARROWLEFT', DOWN)
    .registerBinding('jump', 'ARROWUP', PRESSED)
    .registerBinding('heldJump', 'ARROWUP', DOWN)
    .registerBinding('down', 'ARROWDOWN', DOWN)

SceneManager.getAssetStore()
    .loadManifest('./assets/manifest.json')
    .then(async () => {
        await SceneManager.getAssetStore().loadBundle('main')
    })
    .then(() => {
        SceneManager.registerScene('main', buildTestScene())
        go()
    })

const dt = new DeltaTimer();
let go = () => {
    requestAnimationFrame(go)
    SceneManager.update(dt.step())
}