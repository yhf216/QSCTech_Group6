<template>
  <n-card
    style="width: 70%; min-width: 800px; max-width: 100%; margin: auto auto"
    hoverable
  >
<n-h1 style="text-align: center; margin-top: 20px">Exam Result</n-h1>


<n-p>Congrats! You scored {{result.score}} out of {{result.total_marks}} marks.</n-p>


</n-card>

</template>
<script setup>
import {API} from "@/utils/APIHelper"
import {ref} from "vue"
import {useRoute} from "vue-router"

const route = useRoute()

const result = ref({})

API.get("/exam/report/"+route.params.id).then(response => {
  result.value = response
})
</script>