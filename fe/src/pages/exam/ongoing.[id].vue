<template>
    <n-spin :show="loading" style="margin: auto auto">
        <template #loading>
            <p>Uploading Data.</p>
        </template>
  <n-card
    style="width: 70%; min-width: 800px; max-width: 100%; margin: auto auto"
    hoverable
  >
    <n-h1 prefix="bar">{{ currentQues.question }}</n-h1>
<div style="display: flex; justify-content: space-between; margin-bottom: 10px;    align-items: center;">
    <v-progress-linear
      color="light-blue"
      height="10"
      :model-value="(100 * (currentSelected+1)) / examQuestions.length"
      striped
    >
    </v-progress-linear>
    <n-p style="width: 90px;margin: auto 0; text-align: center;">{{ currentSelected + 1 }} / {{ examQuestions.length }}</n-p>
  </div>

    <n-space vertical style="letter-spacing: 0cap !important;">
      <v-btn
        class="text-none"
        outlined
        variant="outlined"
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

const route = useRoute();

const router = useRouter();

const examQuestions = window.currentExamInfo.questionArray;

const currentQues = ref(examQuestions[0]);

console.log(currentQues.value);

const Selections = ref([]);

const currentSelected = ref(0);

const loading = ref(false);

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
    loading.value = true;
  API.post("/exam/submit", {
    examId: route.params.id,
    answers: Selections.value,
  }).then((response) => {
    loading.value = false;
    router.push("/exam/result/" + response)
  })
}
</script>
