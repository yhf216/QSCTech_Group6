<script setup>
import initHooks from './components/initHooks.vue'
const document = window.document
</script>

<template>
    <n-message-provider> 
        <n-notification-provider>
            <init-hooks/>

            <router-view></router-view>
        </n-notification-provider>
        </n-message-provider> 
</template>
