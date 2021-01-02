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
    </Box>
</template>

<script>
import Box from './Common/BoxContainer.vue'

    export default {
        components: {
            Box,
        },
    }
</script>

<style lang="scss" scoped>

</style>