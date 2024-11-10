<template>

</template>
<script setup>
import {API} from "@/utils/APIHelper"
import {ref} from "vue"
import {useRoute} from "vue-router"

const route = useRoute()

const result = ref({})

API.get("/exam/report/"+route.params.id).then(response => {
  result.value = response.data
})
</script>