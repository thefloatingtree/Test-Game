<template>
    <div>
        <Node>
            <div slot="parent" class="no-select">
                {{ component.constructor.name }}
            </div>
            <div slot="child" class="prop-container">
                <div
                    class="columns width"
                    v-for="(value, key) in component"
                    :key="key"
                >
                    <div class="column is-one-fifth">
                        <p class="no-select">{{ key }}</p>
                    </div>
                    <div class="column">
                        <div class="control">
                            <input
                                class="input is-small"
                                type="text"
                                :value="value"
                                @input="onPropertyChange(key, $event.target.value)"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div slot="options" class="pointer">
                <div class="icon hover-highlight" @click="test">
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
    methods: {
        test() {
            this.$forceUpdate()
        },
        onPropertyChange(key, value) {
            const type = typeof this.component[key] 
            if (type === "number") {
                this.component[key] = Number(value)
            }
            if (type === "string") {
                this.component[key] = String(value)
            }
            if (type === "boolean") {
                this.component[key] = Boolean(value)
            }
        }
    },
    components: {
        Node,
    },
};
</script>

<style lang="scss" scoped>
.width {
    width: 100%; 
}
.prop-container {
    margin-top: 0.5em;
}
</style>