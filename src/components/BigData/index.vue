<template>
    <div>
        <Header/>
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from "../common/header"
    export default {
        components: {
            Header
        }
    }
</script>

<style lang="scss" scoped>

</style>