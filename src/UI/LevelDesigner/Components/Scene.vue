<template>
    <div class="container">
        <div class="section">
            <div class="box">
                <div class="columns is-mobile">
                    <div class="column">
                        <h1 class="title is-4">MainScene</h1>
                    </div>
                    <div class="pointer column is-narrow">
                        <div
                            class="icon is-medium has-tooltip-arrow hover-highlight"
                            data-tooltip="Scene Settings"
                        >
                            <font-awesome-icon icon="cog" size="lg" />
                        </div>
                    </div>
                </div>

                <div class="columns is-mobile">
                    <div class="column">
                        <div class="tabs is-toggle">
                            <ul>
                                <li class="is-active">
                                    <a>Entities</a>
                                </li>
                                <li>
                                    <a>Systems</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="column is-narrow is-flex">
                        <div class="button is-link is-light" @click="addEntity">
                            <span>Create Entity</span>
                            <div class="icon is-medium">
                                <font-awesome-icon icon="plus" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container entity-view">
                    <p v-for="entity of entities" :key="entity.id">
                        <Entity :entity="entity" />
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SceneManager from '../../../../lib/Trengine/src/SceneManager'
import { Position } from '../../../../lib/Trengine/src/Components/Position'
import { Velocity } from '../../../../lib/Trengine/src/Components/Velocity'
import { TwoPrimitiveShape } from '../../../../lib/Trengine/src/Components/TwoPrimitiveShape'
import { random } from '../../../../lib/Trengine/src/Util'

import Entity from './Entity.vue'

export default {
    computed: {
        entities() {
            return this.$store.state.scene.entities;
        },
    },
    methods: {
        addEntity() {
            this.$store.state.scene.createEntity().addComponent(Position, { x: random(0, 500), y: random(0, 500) }).addComponent(TwoPrimitiveShape).addComponent(Velocity, { x: 1, y: 0 })
        }
    },
    components: {
        Entity,
    },
};
</script>

<style lang="scss" scoped>
.box {
    max-height: 80vh;
}
.entity-view {
    max-height: 60vh;
    overflow-y: scroll;
}
</style>