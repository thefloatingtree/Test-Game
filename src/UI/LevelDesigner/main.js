import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import Main from './Components/Main.vue'
import Scene from './Components/Scene.vue'
import SceneSettings from './Components/SceneSettings.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleRight, faArrowLeft, faCog, faDownload, faPlus, faPlusSquare, faSyncAlt, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { Position } from '../../../lib/Trengine/src/Components/Position'
import { TwoPrimitiveShape } from '../../../lib/Trengine/src/Components/TwoPrimitiveShape'
import { random } from '../../../lib/Trengine/src/Util'

export function createLevelDesignerUI(scene) {

    const appRoot = document.createElement('div')
    appRoot.id = "app"
    document.body.insertBefore(appRoot, document.body.firstChild)

    library.add(faPlusSquare, faAngleDown, faDownload, faUpload, faCog, faPlus, faAngleRight, faTrash, faSyncAlt, faArrowLeft)
    Vue.component('font-awesome-icon', FontAwesomeIcon)

    Vue.use(Vuex)
    Vue.use(VueRouter)

    const routes = [
        { path: '/scene', component: Scene },
        { path: '/scene/settings', component: SceneSettings },
        // { path: '/scene/add/entity', component: },
        // { path: '/scene/add/system', component: },
        // { path: '/scene/add/singleton', component: },
    ]

    const router = new VueRouter({
        routes
    })

    router.replace('/scene')

    Vue.mixin({
        methods: {
            goTo: (path) => {
                router.push(path)
            }
        }
    })

    const store = new Vuex.Store({
        state: {
            scene
        },
        mutations: {
            addEntity(state) {
                state.scene
                    .createEntity()
                    .addComponent(Position, { x: random(0, 500), y: random(0, 500) })
                    .addComponent(TwoPrimitiveShape);
            }
        }
    })

    return new Vue({
        store,
        router,
        render: h => h(Main)
    }).$mount('#app')
}

export function destroyLevelDesignerVue(vm) {
    vm.$destroy()
}