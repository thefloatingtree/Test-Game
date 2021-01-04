<template>
    <div class="container">
        <div class="section">
            <div class="box wide">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wide {
    width: 32em;
    max-height: 80vh;
}
</style>