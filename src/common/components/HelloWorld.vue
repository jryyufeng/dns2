<template>
<el-container >
  <el-header style="text-align: right; font-size: 12px; background-color: #409eff">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
  </el-header>
  <el-container>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246); position:fixed">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <!-- <div v-for="(parent, index) in menuData" :key="index"> -->
            <el-submenu index="1" v-for="(parent, index) in menuData" :key="index">
                <template slot="title"  @click="toggleParent(parent.name)">
                    <i class="el-icon-location"></i>
                    <span slot="title">{{parent.meta.title}}</span>
                </template>
                    <el-menu-item :index="item.meta.title" v-for="(item, i) in parent.children" :key="i" @click="go(parent, item)">
                        {{item.meta.title}}
                    </el-menu-item>
            </el-submenu>
        <!-- </div> -->
      </el-menu>
    </el-aside>
  </el-container>
</el-container>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
<script>
/* eslint-disable */
import {
        mapState
    } from 'vuex';

    export default {
        data() {
            
        return {
            isCollapse: true
        }
        
      },
      props: ['model'],
        computed: {
            ...mapState(['menuData', 'administrator'])
        },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      toggleParent: function (index) {
                // 更新active状态
                this.$store.commit('SET_MENU_ACTIVE_STATUS', index);
            },
            go: function (parent, item) {
                // 更新active状态
                this.$router.push(parent.path + '/' + item.path);
            }
    }
    };
</script>