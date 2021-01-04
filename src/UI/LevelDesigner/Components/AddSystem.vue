<template>
    <Box>
        <div class="columns is-mobile">
            <div class="column">
                <h1 class="title is-4">Add System</h1>
            </div>
            <div class="pointer column is-narrow">
                <div
                    class="icon is-medium has-tooltip-arrow hover-highlight"
                    @click="goTo('/scene')"
                >
                    <font-awesome-icon icon="arrow-left" size="lg" />
                </div>
            </div>
        </div>
        <div class="list">
            <div v-for="system in allSystems" :key="system.name" class="box">
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            {{ system.name }}
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <div class="button is-info" :disabled="systemInScene(system.name)" @click="addSystem(system.name)">
                                Add System
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Box>
</template>

<script>
import Box from "./Common/BoxContainer.vue";

export default {
    components: {
        Box,
    },
    methods: {
        addSystem(name) {
            if (this.systemInScene(name)) return
            const systemStore = this.$store.state.sceneManager.getSystemStore()
            this.$store.state.scene.registerSystem(systemStore.getSystemByName(name))
        },
        systemInScene(name) {
            return this.$store.state.scene.systems.some(system => system.constructor.name === name)
        }
    },
    computed: {
        allSystems() {
            return this.$store.state.sceneManager.getSystemStore().getSystems()
        },
        systems() {
            return 
        }
    },
};
</script>

<style lang="scss" scoped>
.list {
    max-height: 60vh;
    overflow-y: scroll;
}
.box {
    margin-right: 1em;
    margin-bottom: 1em;
}
</style>