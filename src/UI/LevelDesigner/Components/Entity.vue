<template>
    <div>
        <Node>
            <div class="is-6 main" slot="parent">
                Entity
                <span class="has-text-grey"
                    >({{ entity.components.size }})</span
                >
            </div>
            <div slot="child">
                <C v-for="(component, index) in components" :key="index" :component="component" />
            </div>
            <div slot="options">
                <div class="icon hover-highlight-danger" @click="deleteEntity">
                    <font-awesome-icon icon="trash" />
                </div>
            </div>
        </Node>
    </div>
</template>

<script>
import Node from "./Common/Node.vue";
import C from "./Component.vue";

export default {
    props: ["entity"],
    computed: {
        components() {
            return this.entity.components.values()
        }
    },
    methods: {
        deleteEntity() {
            this.$store.state.scene.removeEntity(this.entity)
        }
    },
    components: {
        Node,
        C
    },
};
</script>

<style lang="scss" scoped>
.main {
    padding-bottom: 0.25em;
}
</style>