<template>
    <div id="app">
        <Header />
        <transition name="fade">
            <keep-alive include="scene">
                <router-view v-if="scene"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import Header from "./Header.vue";

export default {
    computed: {
        scene() {
            return this.$store.state.scene;
        },
    },
    components: {
        Header,
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
.no-select {
    user-select: none;
}
.fade-enter-active {
    animation: 0.17s linear fade;
}
.fade-leave-active {
    display: none;
}
@keyframes fade {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.9
    }
    100% {
        opacity: 1;
    }
}
</style>