<script setup>
import Background from './components/background.vue';
import initHooks from './components/initHooks.vue'
const document = window.document
</script>

<template>
    <n-message-provider> 
        <n-notification-provider>
            <init-hooks/>
            <!-- <Background/> -->

            <router-view></router-view>
        </n-notification-provider>
        </n-message-provider> 
</template>
