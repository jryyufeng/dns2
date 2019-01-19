<template>
    <h1>test1</h1>
    
</template>
<script>
    import api from '../api';
    export default {
        data () {
                return {
                };
            },
        methods:{
            first () {
                // 处理时间
                api.test()
            }
        },
        created () {
            this.first({group:'all'});
        }
    };
</script>
<style>
</style>
