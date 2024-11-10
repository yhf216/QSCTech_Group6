<template>

</template>
<script setup>
import {initAPIHooks} from "@/utils/APIHelper"
import {useMessage, useNotification} from "naive-ui"

initAPIHooks(useMessage(), useNotification())
</script>