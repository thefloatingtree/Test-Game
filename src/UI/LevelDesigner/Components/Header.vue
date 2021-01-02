<template>
    <div class="container">
        <div class="section">
            <div class="box">
                <div class="columns is-mobile">
                    <div class="column">
                        <h1 class="title is-4">Scene Editor</h1>
                    </div>
                    <div class="pointer column is-narrow">
                        <div
                            class="icon is-medium has-tooltip-arrow hover-highlight"
                            data-tooltip="Create a new scene"
                        >
                            <font-awesome-icon icon="plus" size="lg" />
                        </div>
                        <div
                            class="icon is-medium has-tooltip-arrow hover-highlight"
                            data-tooltip="Upload an existing scene"
                        >
                            <font-awesome-icon icon="upload" size="lg" />
                        </div>
                        <div
                            class="icon is-medium has-tooltip-arrow hover-highlight"
                            data-tooltip="Export current scene"
                        >
                            <font-awesome-icon icon="download" size="lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
    padding-bottom: 0.5em;
}
.icon {
    margin-left: 0.3em;
}
</style>