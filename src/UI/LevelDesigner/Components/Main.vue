<template>
    <div id="app">
        <Header />
        <Scene />
    </div>
</template>

<script>
import Header from './Header.vue'
import Scene from './Scene.vue'

export default {
    components: {
        Header,
        Scene
    },
};
</script>

<style lang="scss">
.section {
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 2em;
    margin-bottom: 2em;
}
.box {
    width: 30em;
}
.columns {
    margin-bottom: 0 !important;
}
.column {
    display: flex;
    align-items: center;
}
.pointer:hover {
    cursor: pointer;
}
.hover-highlight:hover {
    color: #3298dc;
}
.hover-highlight-danger:hover {
    color: #f14668;
}
</style>