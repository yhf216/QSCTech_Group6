<template>
    <div class="back" @click="back()">
        <span class="iconfont icon-home"></span>
    </div>
</template>

<script setup lang="ts" >
    defineOptions({
        name: "Home"
        });
    import { useRouter } from "vue-router"; 
    import '../assets/login_home/iconfont.css' ;

    const router = useRouter();
    const back = () => {
    router.push('/')
    }
</script>

<style scoped>
    .back{
    position: absolute;
    z-index: 3;
    }
    .back:hover{
    color: blue;
    }
    .icon-home{
    font-size: 30px;
    margin-left: 10px;
    }
    .col_change{
    color: #fff;
    }
</style>