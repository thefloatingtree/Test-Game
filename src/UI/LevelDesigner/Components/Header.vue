<template>
    <Box>
        <input
            type="file"
            ref="sceneFilePicker"
            accept=".json,application/json"
            v-on:change="recieveScene"
        />
        <div class="shift-down">
            <div class="columns is-mobile">
                <div class="column">
                    <h1 class="title is-4 no-select">Scene Editor</h1>
                </div>
                <div class="pointer column is-narrow">
                    <div
                        class="icon is-medium has-tooltip-arrow hover-highlight"
                        data-tooltip="Create a new scene"
                        @click="createScene"
                    >
                        <font-awesome-icon icon="plus" size="lg" />
                    </div>
                    <div
                        class="icon is-medium has-tooltip-arrow hover-highlight"
                        data-tooltip="Upload an existing scene"
                        @click="uploadScene"
                    >
                        <font-awesome-icon icon="upload" size="lg" />
                    </div>
                    <div
                        class="icon is-medium has-tooltip-arrow hover-highlight"
                        data-tooltip="Export current scene"
                        @click="exportScene"
                    >
                        <font-awesome-icon icon="download" size="lg" />
                    </div>
                </div>
            </div>
        </div>
    </Box>
</template>

<script>
import { Scene } from "../../../../lib/Trengine/src/ECS";
import SceneManager from "../../../../lib/Trengine/src/SceneManager";
import { downloadToFile } from "../../../../lib/Trengine/src/Util";

import Box from "./Common/BoxContainer.vue";

export default {
    methods: {
        exportScene() {
            if (!this.$store.state.scene) return
            const sceneData = this.$store.state.sceneData
            const data = JSON.stringify(SceneManager.saveScene(sceneData.scene, sceneData.bundle));
            downloadToFile(data, sceneData.scene + ".json", "text/JSON");
        },
        uploadScene() {
            SceneManager.clearScenes()
            this.$refs.sceneFilePicker.click();
        },
        recieveScene(event) {
            const reader = new FileReader();
            reader.onload = this.onSceneLoad;
            reader.readAsText(event.target.files[0]);
        },
        async onSceneLoad(event) {
            const sceneData = JSON.parse(event.target.result)
            const scene = await SceneManager.loadScene(sceneData)
            this.$store.state.scene = scene
            SceneManager.registerScene(sceneData.scene, scene)
            this.$store.state.sceneData = SceneManager.saveScene(sceneData.scene, sceneData.bundle)
            console.log(this.$store.state.sceneData)
        },
        createScene() {
            SceneManager.clearScenes()
            const scene = new Scene();
            this.$store.state.scene = scene;
            SceneManager.registerScene("Unnamed Scene", scene);
            this.$store.state.sceneData = SceneManager.saveScene("Unnamed Scene")
            this.goTo("/scene/settings")
        },
    },
    components: {
        Box,
    },
};
</script>

<style lang="scss" scoped>
.icon {
    margin-left: 0.3em;
}
.shift-down {
    margin-bottom: -0.7em;
}
input {
    display: none;
}
</style>