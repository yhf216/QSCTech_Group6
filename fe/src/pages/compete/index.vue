<template>
  <n-config-provider
    abstract
    :theme="switchTheme ? darkTheme : lightTheme"
    style="width: 70%; min-width: 800px; max-width: 100%; margin: auto auto"
  >
    <home />
    <div style="position: absolute; right: 45px; top: 35px" v-if="connected">
      <n-button round>
        <template #icon>
          <n-icon><WifiOutline /></n-icon>
        </template>
        Connected
      </n-button>
    </div>

    <component
      :is="Background"
      style="width: 100%; height: 100%; position: absolute"
    ></component>

    <n-card
      style="width: 70%; min-width: 800px; max-width: 100%; margin: auto auto"
      hoverable
    >
      <div v-if="step === 1">
        <n-h1 style="text-align: center; margin-top: 20px">比谁快！</n-h1>
        <n-space justify="center">
          <v-btn variant="outlined" @click="preparing(1)">新手场</v-btn>
          <v-btn variant="outlined" @click="preparing(2)">标准场</v-btn>
          <v-btn variant="outlined" @click="preparing(3)">高级场</v-btn>
          <v-btn variant="outlined" @click="preparing(4)">仅用作演示的场次</v-btn>
        </n-space>
        <n-p style="text-align: center; margin-top: 20px"
          >当前在线人数：{{ waitinghallOpt.currentOnline }} | 当前等待人数：{{
            waitinghallOpt.currentWaiting
          }}</n-p
        >
      </div>
      <div v-if="step === 2" style="text-align: center">
        <n-h1 style="text-align: center; margin-top: 20px">准备！</n-h1>
        <!-- <n-progress type="dashboard" gap-position="bottom" :percentage="prepareForStart__percentage" >
        <span>{{ prepareForStart__time4show }}</span>
      </n-progress> -->
        <span>{{ prepareForStart__time4show }}</span>
        <n-space justify="center">
          <n-card>
            <n-space>
              <n-avatar>{{ competentsInfo[0].username[0] }}</n-avatar
              ><n-space vertical
                ><p>{{ competentsInfo[0].username }}</p></n-space
              >
            </n-space></n-card
          >

          <img src="@/assets/versus.png" style="height: 50px; margin: auto" />
          <n-card>
            <n-space>
              <n-avatar>{{ competentsInfo[1].username[0] }}</n-avatar
              ><n-space vertical
                ><p>{{ competentsInfo[1].username }}</p></n-space
              >
            </n-space></n-card
          >
        </n-space>
      </div>
      <div v-if="step === 3" style="text-align: center">
        <div style="display: flex; justify-content: center; margin-top: 20px">
          <n-card style="width: 40%">
            <n-space>
              <n-avatar>{{ competentsInfo[0].username[0] }}</n-avatar>
              <div style="line-height: normal; text-align: left">
                <p style="margin: 0">{{ competentsInfo[0].username }}</p>
                <p style="margin: 0">
                  {{ competentsInfo[0].score }} / {{ totalQuestionLength }}
                </p>
              </div>
            </n-space>
            <n-progress
              :percentage="
                (competentsInfo[0].score * 100) / totalQuestionLength
              "
            />
          </n-card>
          <span style="padding: 30px">Time</span>
          <n-card style="width: 40%">
            <n-space>
              <n-avatar>{{ competentsInfo[1].username[0] }}</n-avatar>
              <div style="line-height: normal; text-align: left">
                <p style="margin: 0">{{ competentsInfo[1].username }}</p>
                <p style="margin: 0">
                  {{ competentsInfo[1].score }} / {{ totalQuestionLength }}
                </p>
              </div>
            </n-space>
            <n-progress
              :percentage="
                (competentsInfo[1].score * 100) / totalQuestionLength
              "
            />
          </n-card>
        </div>

        <n-divider />

        <n-card hoverable>
          <n-h1 prefix="bar">{{ currentQuestion.question }}</n-h1>
          <n-space vertical style="letter-spacing: 0cap !important">
            <v-btn
              class="text-none"
              outlined
              variant="outlined"
              v-for="option in currentQuestion.options"
              :key="option.id"
              @click="updateSelected(option.id)"
              >{{ option.desc.pos }}. {{ option.desc.tranEn }}</v-btn
            ></n-space
          ></n-card
        >
      </div>

      <div v-if="step === 4" style="text-align: center">
        <div style="display: flex; justify-content: center; margin-top: 20px">
          <n-card style="width: 40%">
            <n-space>
              <n-avatar>{{ competentsInfo[0].username[0] }}</n-avatar>
              <div style="line-height: normal; text-align: left">
                <p style="margin: 0">{{ competentsInfo[0].username }}</p>
                <p style="margin: 0">
                  {{ competentsInfo[0].score }} / {{ totalQuestionLength }}
                </p>
              </div>
            </n-space>
            <n-progress
              :percentage="
                (competentsInfo[0].score * 100) / totalQuestionLength
              "
            />
          </n-card>
          <n-card style="width: 40%">
            <n-space>
              <n-avatar>{{ competentsInfo[1].username[0] }}</n-avatar>
              <div style="line-height: normal; text-align: left">
                <p style="margin: 0">{{ competentsInfo[1].username }}</p>
                <p style="margin: 0">
                  {{ competentsInfo[1].score }} / {{ totalQuestionLength }}
                </p>
              </div>
            </n-space>
            <n-progress
              :percentage="
                (competentsInfo[1].score * 100) / totalQuestionLength
              "
            />
          </n-card>
        </div>
        <n-divider />
        <n-card hoverable v-if="winningState === 2">
          <n-h1 prefix="bar">You lose.</n-h1>
          <n-p
            >But don't be discouraged, you can practise more and grow
            stronger!</n-p
          >
          <n-space justify="center">
            <v-btn varient="outlined" @click="onemoretime"> Try again </v-btn>
            <v-btn varient="outlined" @click="$router.push('/exam/start')">
              Practice more
            </v-btn>
          </n-space>
        </n-card>
        <n-card hoverable v-else>
          <n-h1 prefix="bar">You win.</n-h1>
          <n-p>Congratulations!</n-p>
          <n-space justify="center">
            <v-btn varient="outlined" @click="onemoretime">
              One more time
            </v-btn>
            <v-btn varient="outlined" @click="$router.push('/exam/start')">
              Practice
            </v-btn>
          </n-space>
        </n-card>
      </div>
    </n-card>
  </n-config-provider>
</template>
<script setup>
import { onUnmounted, ref, shallowRef, watch } from "vue";
import { VNumberInput } from "vuetify/labs/VNumberInput";
import { API } from "@/utils/APIHelper";
import { useRouter } from "vue-router";
import { io } from "socket.io-client";
import { WifiOutline } from "@vicons/ionicons5";
import { useMessage } from "naive-ui";
import loseBg from "@/components/lose-bg.vue";
import { darkTheme, lightTheme } from "naive-ui";
import confetti from "canvas-confetti";
import home from "@/components/home.vue"

const message = useMessage();

const connected = ref(false);

const router = useRouter();

const competeOption = ref(1);

const step = ref(1);

const waitinghallOpt = ref({
  currentOnline: 0,
  currentWaiting: 0,
});

const waitingTime = ref(0);

const socket = io(import.meta.env.VITE_API_URL, {
  path: "/api/competing-hall",
});

const preparing = (option) => {
  message.loading("匹配中..", {
    duration: 60000,
  });
  competeOption.value = option;
  socket.emit("prepare-for", option);
};

socket.on("connect", () => {
  connected.value = true;
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
  socket.emit("i-am", localStorage.getItem("token"));
});

socket.on("CurrentUserUpdate", (data) => {
  waitinghallOpt.value = data;
});

const competentsInfo = ref([]);
const prepareForStart__percentage = ref(0);
let prepareForStart__startTime = 0;
const prepareForStart__time4show = ref(3);

socket.on("EnterRoom", (data) => {
  message.destroyAll();
  message.success("匹配成功！");
  competentsInfo.value = data.competents;
  prepareForStart__startTime = new Date().getTime();
  prepareForStart__percentage.value = 100;
  prepareForStart__time4show.value = 3;
  totalQuestionLength.value = data.totalQuestions;
  step.value = 2;
  handlePrepareTime();
});

const handlePrepareTime = () => {
  const delta = new Date().getTime() - prepareForStart__startTime;
  if (delta < 3000) {
    // console.log(delta, 100 - (delta / 3000) * 100, delta / 3000);

    prepareForStart__percentage.value = Math.floor(100 - (delta / 3000) * 100);
    prepareForStart__time4show.value = Math.floor((3 - delta / 1000) * 10) / 10;
    window.requestAnimationFrame(handlePrepareTime);
  }
};

const currentQuestion = ref({
  question: "",
  id: "",
  options: [],
});

const totalQuestionLength = ref(0);

socket.on("StartCompete", (data) => {
  step.value = 3;
  competentsInfo.value.forEach((v) => {
    v.score = 0;
  });
  currentQuestion.value = data;
});

const updateSelected = (id) => {
  socket.emit("Answer", {
    questionId: currentQuestion.value.id,
    answerId: id,
  });
};

socket.on("CompetentScoreUpdate", (data) => {
  console.log(data);
  console.log(competentsInfo.value);

  competentsInfo.value.find((item) => item.id === data.uid).score = data.score;
});

socket.on("Correct+Next", (data) => {
  currentQuestion.value = data;
});
socket.on("Wrong", (data) => {
  message.error("Wrong Answer! 等待3秒再继续尝试", {
    duration: 3000,
  });
});

socket.on("You_are_freezed", (data) => {
  message.error("You are freezed! Don't try bruteforce!");
});

const winningState = ref(0);
const Background = shallowRef(null);
const switchTheme = ref(false);

socket.on("GameOver", (data) => {
  step.value = 4;
  if (data.winner === parseInt(localStorage.getItem("uid"))) {
    winningState.value = 1;

    var end = Date.now() + 15 * 1000;

    var colors = ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"];
    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (step.value === 4) {
        requestAnimationFrame(frame);
      }
    })();
  } else {
    winningState.value = 2;
    Background.value = loseBg;
    switchTheme.value = true;
  }
});

const onemoretime = () => {
  socket.emit("OneMoreTime");
  Background.value = null;
  step.value = 1;
  switchTheme.value = false;
};

onUnmounted(() => {
  socket.disconnect();
});
</script>

<style>
.v-btn__content {
  text-overflow: ellipsis;
  text-indent: 0;
  overflow-x: hidden;
  display: block;
}
</style>
