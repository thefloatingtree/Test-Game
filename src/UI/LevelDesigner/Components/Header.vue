<template>
    <Box>
        <div class="shift-down">
            <div class="columns is-mobile">
                <div class="column">
                    <h1 class="title is-4">Scene Editor</h1>
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
import SceneManager from "../../../../lib/Trengine/src/SceneManager";
import { downloadToFile } from '../../../../lib/Trengine/src/Util';

import Box from "./Common/BoxContainer.vue";

export default {
    methods: {
        exportScene() {
            const data = JSON.stringify(SceneManager.saveScene('main'))
            downloadToFile(data, 'main.json', 'text/JSON')
        },
        uploadScene() {

        },
        createScene() {

        }
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
</style>