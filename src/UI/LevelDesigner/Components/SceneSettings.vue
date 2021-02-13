<template>
    <Box>
        <div class="columns is-mobile">
            <div class="column">
                <h1 class="title is-4">Scene Settings</h1>
            </div>
            <div class="pointer column is-narrow">
                <div
                    class="icon is-medium has-tooltip-arrow hover-highlight"
                    :class="{ 'has-text-grey': unsavedChanges }"
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
                    :loading="bundleLoading"
                    :items="bundles"
                    :initial="$store.state.sceneData.bundle || DEFAULTBUNDLE"
                    @item-selected="onBundleSelect"
                />
            </div>
        </div>
        <div class="level">
            <div class="level-left"></div>
            <div class="level-right">
                <div class="level-item">
                    <div class="button" @click="goTo('/scene')">Cancel</div>
                </div>
                <div class="level-item">
                    <div class="button is-info" :disabled="!unsavedChanges">Apply Changes</div>
                </div>
            </div>
        </div>
    </Box>
</template>

<script>
import SceneManager from "../../../../lib/Trengine/src/SceneManager";
import Box from "./Common/BoxContainer.vue";
import SelectDropdown from "./Common/SelectDropdown.vue";

export default {
    data() {
        return {
            unsavedChanges: false,
            bundleLoading: false,
            sceneName: this.$store.state.sceneData.scene,
            bundleName: "default",
        };
    },
    components: {
        Box,
        SelectDropdown,
    },
    methods: {
        onBundleSelect(bundle) {
            this.bundleLoading = true;
            this.$store.state.sceneData.bundle = bundle;
            SceneManager.getAssetStore()
                .loadBundle(bundle)
                .then(() => {
                    this.bundleLoading = false;
                });
        },
        applyChanges() {

        }
    },
    computed: { 
        bundles() {
            return SceneManager.getAssetStore().getBundleNames();
        },
        sceneName: {
            get() {
                return this.$store.state.sceneData.scene;
            },
            set(value) {
                SceneManager.renameScene(
                    this.$store.state.sceneData.scene,
                    value
                );
                this.$store.state.sceneData.scene = value;
            },
        },
    },
    created() {
        if (this.$store.state.sceneData.bundle === "") {
            this.$store.state.sceneData.bundle = this.bundleName;
        }
    },
};
</script>

<style lang="scss" scoped>
</style>