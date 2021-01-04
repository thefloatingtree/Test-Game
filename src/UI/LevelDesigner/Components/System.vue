<template>
    <Node>
        <div class="is-6 main no-select" slot="parent">
            {{ systemName }}
        </div>
        <div slot="child">
            <div class="field">
                <div class="control">
                    <label class="checkbox">
                        <input type="checkbox" />
                        Pause system when in editor
                    </label>
                </div>
                <div class="control">
                    <label class="checkbox">
                        <input type="checkbox" />
                        Pause system when in game
                    </label>
                </div>
            </div>
        </div>
        <div
            class="icon hover-highlight-danger"
            slot="options"
            @click="deleteSystem"
        >
            <font-awesome-icon icon="trash" />
        </div>
    </Node>
</template>

<script>
import Node from "./Common/Node.vue";
export default {
    props: ["system"],
    computed: {
        systemName() {
            return this.system.constructor.name;
        },
    },
    methods: {
        deleteSystem() {
            this.$store.state.scene.unRegisterSystem(this.system.constructor);
        },
    },
    components: {
        Node,
    },
};
</script>

<style lang="scss" scoped>
.level {
    margin-bottom: 0;
}
.level-right {
    margin-right: 1em;
}
.main {
    padding-bottom: 0.25em;
}
</style>