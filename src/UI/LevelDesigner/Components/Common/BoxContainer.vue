<template>
    <div class="container">
        <div class="section">
            <div class="box">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
    width: 32em;
    max-height: 80vh;
}
</style>