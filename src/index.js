import { SceneManager, DeltaTimer } from '../lib/Trengine/src/index'
import { DOWN, PRESSED } from '../lib/Trengine/src/InputManager'
import { downloadToFile } from '../lib/Trengine/src/Util'
import { buildLevelDesignerScene } from './Scenes/levelDesigner'
import { buildTestScene } from './Scenes/test'

SceneManager
    .getInputManager()
    .registerBinding('right', ['ARROWRIGHT', 'D'], DOWN)
    .registerBinding('left', ['ARROWLEFT', 'A'], DOWN)
    .registerBinding('jump', ['ARROWUP', 'W', 'SPACE'], PRESSED)
    .registerBinding('heldJump', ['ARROWUP', 'W'], DOWN)
    .registerBinding('down', ['ARROWDOWN', 'S'], DOWN)
    .registerBinding('heldShift', 'SHIFT', DOWN)

SceneManager.getAssetStore()
    .loadManifest('./assets/manifest.json')
    .then(async () => {
        await SceneManager.getAssetStore().loadBundle('main')
    })
    .then(() => {
        SceneManager.registerScene('main', buildLevelDesignerScene())
        go()
    })

const dt = new DeltaTimer();
let go = () => {
    requestAnimationFrame(go)
    SceneManager.update(dt.step())
}