<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :default-openeds="['1','2','3']"
         active-text-color="#f05454"
            router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span class="sidebar_title" slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import '~/assets/css/sidebar.css';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-tickets',
                        index: '1',
                        title: '订单中心',
                        subs:[
                            {
                            index: '/dashboard/orderCenter',
                            title:'订单管理'
                            },
                            {
                                index:'/dashboard/batchOrder',
                                title:'批量下单'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-bell',
                        index: '2',
                        title: '客户中心',
                        subs:[
                            {
                                index :  '/dashboard/customer',
                                title:'客户管理'
                            }

                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '3',
                        title: '系统设置',
                        subs:[
                            {
                                index :  '/dashboard/pwd',
                                title:'修改密码'
                            }

                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return '/' + this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        background: #ffffff;
        width: 150px;
        padding: 20px;
        box-sizing: border-box;
        flex: 0 0 150px;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 130px;
    }
    .sidebar-el-menu{
        border: none;
    }
    .sidebar-el-menu .el-menu-item{
        color: #333333;
        font-size: 13px;
        padding-left: 30px !important;
    }
    .sidebar-el-menu .el-menu-item.is-active{
        color: #f05454;
    }
    .sidebar-el-menu .el-menu-item:hover{
        color: #f05454 !important;
        background: transparent !important;
    }
    .sidebar > ul {
        height:100%;
    }
    .sidebar_title{
        color: #333333;
        font-weight: 600;
        font-size: 15px;
    }
</style>
