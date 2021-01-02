<template>
    <Box>
        <div class="columns is-mobile">
            <div class="column">
                <h1 class="title is-4">MainScene</h1>
            </div>
            <div class="pointer column is-narrow">
                <div
                    class="icon is-medium has-tooltip-arrow hover-highlight"
                    data-tooltip="Scene Settings"
                    @click="goTo('/scene/settings')"
                >
                    <font-awesome-icon icon="cog" size="lg" />
                </div>
            </div>
        </div>

        <div class="columns is-mobile">
            <div class="column">
                <div class="tabs is-toggle">
                    <ul>
                        <li
                            :class="{ 'is-active': selectedTab === 0 }"
                            @click="selectedTab = 0"
                        >
                            <a>Entities</a>
                        </li>
                        <li
                            :class="{ 'is-active': selectedTab === 1 }"
                            @click="selectedTab = 1"
                        >
                            <a>Systems</a>
                        </li>
                        <li
                            :class="{ 'is-active': selectedTab === 2 }"
                            @click="selectedTab = 2"
                        >
                            <a>Singletons</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="column is-narrow is-flex">
                <div class="button is-link is-light" @click="addEntity">
                    <span>{{ buttonName }}</span>
                    <div class="icon is-medium">
                        <font-awesome-icon icon="plus" />
                    </div>
                </div>
            </div>
        </div>
        <div class="container list">
            <p v-for="entity of entities" :key="entity.id">
                <Entity :entity="entity" />
            </p>
        </div>
    </Box>
</template>

<script>
import SceneManager from "../../../../lib/Trengine/src/SceneManager";
import { Position } from "../../../../lib/Trengine/src/Components/Position";
import { Velocity } from "../../../../lib/Trengine/src/Components/Velocity";
import { TwoPrimitiveShape } from "../../../../lib/Trengine/src/Components/TwoPrimitiveShape";
import { random } from "../../../../lib/Trengine/src/Util";

import Entity from "./Entity.vue";
import Box from "./Common/BoxContainer.vue";

export default {
    data() {
        return {
            buttonNames: ["Add Entity", "Add System", "Add Singleton"],
            selectedTab: 0,
        };
    },
    computed: {
        entities() {
            return this.$store.state.scene.entities;
        },
        buttonName() {
            return this.buttonNames[this.selectedTab];
        },
    },
    methods: {
        addEntity() {
            this.$store.state.scene
                .createEntity()
                .addComponent(Position, {
                    x: random(0, 500),
                    y: random(0, 500),
                })
                .addComponent(TwoPrimitiveShape)
                .addComponent(Velocity, { x: 1, y: 0 });
        },
        selectTab(tab) {
            this.selectedTab = tab;
        },
    },
    components: {
        Entity,
        Box,
    },
};
</script>

<style lang="scss" scoped>
.list {
    max-height: 60vh;
    overflow-y: scroll;
}
</style>