<template>
    <n-spin>
  <n-card
    style="width: 70%; min-width: 800px; max-width: 100%; margin: auto auto"
    hoverable
  >
    <n-h1 prefix="bar">{{ currentQues.question }}</n-h1>

    <v-progress-linear
      color="light-blue"
      height="10"
      :model-value="(100 * (currentSelected+1)) / examQuestions.length"
      striped
    >
    </v-progress-linear>
    <n-p>{{ currentSelected + 1 }} / {{ examQuestions.length }}</n-p>

    <n-space vertical>
      <v-btn
        class="text-none"
        outlined
        variant="text"
        v-for="option in currentQues.options"
        :key="option.id"
        @click="updateSelected(option.id)"
        >{{ option.desc.pos }}. {{ option.desc.tranEn }}</v-btn
      ></n-space
    ></n-card
  ></n-spin>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import {API} from "@/utils/APIHelper"
import { useRouter } from "vue-router";

const router = useRouter();

const examQuestions = window.currentExamInfo.questionArray;

const currentQues = ref(examQuestions[0]);

console.log(currentQues.value);

const Selections = ref([]);

const currentSelected = ref(0);

const updateSelected = (id) => {
  Selections.value.push({
    id: currentQues.value.id,
    answer: id,
  });
  if (currentSelected.value+1 === examQuestions.length) {
    // console.log(Selections.value);
    handleSubmit();
    return;
  }
  currentSelected.value++;

  currentQues.value = examQuestions[currentSelected.value];
};


const handleSubmit = () => {
  API.post("/exam/submit", {
    examId: window.currentExamInfo.id,
    answers: Selections.value,
  }).then((response) => {
    router.push("/exam/result/" + response.id)
  })
}
</script>
