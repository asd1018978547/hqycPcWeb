<template>
    <div class="wrapper">
        <v-head></v-head>
        <div class="box1">
            <v-sidebar></v-sidebar>
            <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive>
                         <nuxt-child>
                        <router-view></router-view>
                        </nuxt-child>
                    </keep-alive>
                </transition>
            </div>
        </div>
        </div>
        <v-bottom></v-bottom>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import bus from './bus';
    import vBottom from "~/components/vBottom";
    export default {
        data(){
            return {
                collapse: false
            }
        },
        components:{
            vHead, vSidebar,vBottom
        },
        mounted(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>
<style >
.content{
    position: relative;
    height: auto;
}
.box1{
    width: 1200px;
    margin: 0 auto;
    padding-top: 10px;
    display: flex;
    min-height: 800px;
}
</style>

