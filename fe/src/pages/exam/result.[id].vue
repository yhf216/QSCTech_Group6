<template>
  <n-card
    style="width: 70%; min-width: 800px; max-width: 100%; margin: auto auto"
    hoverable
    class="drop-shadow-card"
  >
    <n-h1 style="text-align: center; margin-top: 20px">Exam Result</n-h1>

    <n-grid :cols="2" :gutter="20">
      <n-gi>
        <n-statistic label="得分" tabular-nums>
          <n-number-animation :from="0" :to="result.score" />
          <template #suffix> / {{ result.totalScore }} </template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic label="用时" tabular-nums>
          <n-number-animation :from="0" :to="duration" />
          <template #suffix> s </template>
        </n-statistic></n-gi
      >
    </n-grid>
    <n-divider></n-divider>
    <n-collapse>
      <n-collapse-item title="错题" name="1">
        <n-card
          hoverable
          v-for="question in result.wrongAnswers"
          :title="question.question.question"
        >
        <n-space vertical>
          <n-button
            :type="
              option.id == question.answer
                ? 'success'
                : option.id == question.userAnswer
                ? 'error'
                : 'info'
            "
            :render-icon="()=>h(
               option.id == question.answer
                ? CheckmarkCircleOutline
                : option.id == question.userAnswer
                ? CloseCircleOutline
                : ArrowForwardOutline,
                {
                  style: {
                    color:
                      option.id == question.answer
                       ? '#52c41a'
                        : option.id == question.userAnswer
                       ? '#f5222d'
                        : '#1890ff'
                  }
                }
            )"
            dashed
            round
            v-for="option in question.question.options"
            :key="option.id"
          >
            {{ option.desc.tranEn }}
          </n-button>
        </n-space>
        </n-card>
      </n-collapse-item>
    </n-collapse>
  </n-card>
</template>
<script setup>
import { API } from "@/utils/APIHelper";
import { CheckOutlined, CloseOutlined } from "@vicons/antd";
import { ArrowForwardOutline, CheckmarkCircleOutline, CheckmarkOutline, CloseCircleOutline } from "@vicons/ionicons5";
import { ref,h } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const result = ref({});

const duration = ref(0);

API.get("/exam/report/" + route.params.id).then((response) => {
  result.value = response;
  duration.value = Math.round((response.endTime - response.startTime) / 1000);
});
</script>

<style scoped>
.drop-shadow-card {
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2);
  transition: 0.3s;
  background-color: #ffffff5b;
  border-radius: 0;
  backdrop-filter: blur(10px);
}

.drop-shadow-card:hover {
  box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.2);
}
</style>
