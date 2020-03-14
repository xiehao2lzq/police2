<template>
    <div>
        <Header/>
        <PersonPerceptionList v-if="this.$route.name=='PersonPerceptionList'"/>
        <CarPerceptionList v-else/>
    </div>
</template>

<script>
import {mapState} from "vuex"
import CarPerceptionList from "./CarPerceptionList"
import PersonPerceptionList from "./personPerceptionList"
import Header from "../../common/header3"
    export default {
        computed: {
           /*  ...mapState({
                nowShow:state=>state.dataTreating.nowShow
            }) */
        },
        components: {
            PersonPerceptionList,
            CarPerceptionList,
            Header
        }
    }
</script>

<style lang="scss" scoped>

</style>