<template>
  <n-card
    style="width: 70%; min-width: 800px; max-width: 100%; margin: auto auto"
    hoverable
  >
  <n-h1 style="text-align: center; margin-top: 20px">开始答题！</n-h1>
  <v-select
  label="题目范围"
  :items="AnswerOptions"
  v-model="examRange"
></v-select>
  <v-number-input
  :reverse="false"
controlVariant="default"
  label="题目数量"
  :hideInput="false"
  :inset="false" v-model="examLength"
  variant="filled"
></v-number-input>
  <v-btn variant="outlined" @click="startExam">
  Start Exam
</v-btn>
</n-card>
</template>
<script setup>
import { ref,watch  } from "vue"  ;
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import{API} from "@/utils/APIHelper"
import { useRouter } from "vue-router"

const router = useRouter()

const examLength = ref(10)

const examRange = ref("CET4")

const AnswerOptions = [
"CET4",
"CET6"
]


function startExam() {
  console.log("start exam")
  API.post("/exam/start", {
    examRange: examRange.value,
    examLength:examLength.value
  }).then(response => {
    // console.log(response)
    window.currentExamInfo = response
    router.push("/exam/ongoing/"+response.examId)
  })
}

// watch(examLength, (newVal, oldVal) => {
//   console.log(newVal, oldVal)
// })
</script>
