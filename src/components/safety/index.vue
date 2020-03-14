<template>
    <div>
        <Header/>
        <LeftRouter/>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from "../common/header"
import LeftRouter from "./leftRouter"
    export default {
        components: {
            Header,
            LeftRouter
        }
    }
</script>

<style lang="scss" scoped>

</style>