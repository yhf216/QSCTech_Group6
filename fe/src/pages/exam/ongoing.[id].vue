<template>
  <n-card
    style="width: 70%; min-width: 800px; max-width: 100%; margin: auto auto"
    hoverable
  >
    <n-h1 prefix="bar">{{ currentQues.question }}</n-h1>

    <v-progress-linear
      color="light-blue"
      height="10"
      :model-value="(100 * currentSelected) / examQuestions.length"
      striped
    >
    </v-progress-linear>
    <n-p>{{ currentSelected + 1 }} / {{ examQuestions.length }}</n-p>

    <n-space vertical>
      <v-btn
        class="text-none"
        outlined
        variant="text"
        style="background-color: lightblue; color: black"
        v-for="option in currentQues.options"
        :key="option.id"
        @click="updateSelected(option.id)"
        >{{ option.desc.pos }}. {{ option.desc.tranEn }}</v-btn
      ></n-space
    ></n-card
  >
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

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
  currentSelected.value++;
  if (currentSelected.value === examQuestions.length) {
    console.log(Selections.value);
  }
  currentQues.value = examQuestions[currentSelected.value];
};
</script>
