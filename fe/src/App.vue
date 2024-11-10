<script setup>
import {initAPIHooks} from "./utils/APIHelper"
import {useMessage, useNotification} from "naive-ui"

initAPIHooks(useMessage(), useNotification())
</script>

<template>
    <n-message-provider> 
        <n-notification-provider>
            <router-view></router-view>
        </n-notification-provider>
        </n-message-provider> 
</template>

<style scoped>

</style>
 