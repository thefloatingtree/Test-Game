<template>
    <div>
        <Node>
            <div slot="parent">
                {{ component.constructor.name }}
            </div>
            <div slot="child">
                {{ component }}
            </div>
            <div slot="options">
                <div class="icon hover-highlight">
                    <font-awesome-icon icon="sync-alt" />
                </div>
                <div class="icon hover-highlight-danger">
                    <font-awesome-icon icon="trash" />
                </div>
            </div>
        </Node>
    </div>
</template>

<script>
import Node from "./Common/Node.vue";

export default {
    props: ["component"],
    components: {
        Node,
    },
};
</script>

<style lang="scss" scoped>
</style>