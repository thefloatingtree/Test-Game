import { SceneManager, DeltaTimer } from '../lib/Trengine/src/index'
import { DOWN, PRESSED } from '../lib/Trengine/src/InputManager'
import { registerSystems } from './RegisterSystems'
import { registerEntities } from './RegisterEntities'
import { createLevelDesignerUI } from './UI/LevelDesigner/main'

SceneManager
    .getInputManager()
    .registerBinding('right', ['ARROWRIGHT', 'D'], DOWN)
    .registerBinding('left', ['ARROWLEFT', 'A'], DOWN)
    .registerBinding('jump', ['ARROWUP', 'W', 'SPACE'], PRESSED)
    .registerBinding('heldJump', ['ARROWUP', 'W'], DOWN)
    .registerBinding('down', ['ARROWDOWN', 'S'], DOWN)
    .registerBinding('heldShift', 'SHIFT', DOWN)

SceneManager.getAssetStore()
    .loadManifest('../assets/manifest.json')
    .then(async () => {
        await SceneManager.getAssetStore().loadBundle('default')
    })
    .then(() => {
        registerSystems()
        registerEntities()
        createLevelDesignerUI()

        go()
    })

const dt = new DeltaTimer()
let go = () => {
    requestAnimationFrame(go)
    SceneManager.update(dt.step())
}