<template>
    <Box>
        <div class="columns is-mobile">
            <div class="column">
                <h1 class="title is-4">Scene Settings</h1>
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
        <div class="field">
            <label class="label">Scene Name</label>
            <div class="control">
                <input
                    class="input"
                    type="text"
                    placeholder="Scene Name"
                    v-model="sceneName"
                />
            </div>
        </div>
        <div class="field">
            <label class="label">Bundle</label>
            <div class="control">
                <select-dropdown
                    :items="bundles"
                    :initial="$store.state.sceneData.bundle"
                    @item-selected="onBundleSelect"
                />
            </div>
        </div>
    </Box>
</template>

<script>
import SceneManager from "../../../../lib/Trengine/src/SceneManager";
import Box from "./Common/BoxContainer.vue";
import SelectDropdown from "./Common/SelectDropdown.vue";

export default {
    components: {
        Box,
        SelectDropdown,
    },
    methods: {
        onBundleSelect(bundle) {
            this.$store.state.sceneData.bundle = bundle;
        },
    },
    computed: {
        bundles() {
            return SceneManager.getAssetStore().getBundleNames();
        },
        sceneName: {
            get() {
                return this.$store.state.sceneData.scene
            },
            set(value) {
                SceneManager.renameScene(this.$store.state.sceneData.scene, value)
                this.$store.state.sceneData.scene = value
            }
        }
    },
};
</script>

<style lang="scss" scoped>
</style>