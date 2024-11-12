<script setup>
import Background from "./components/background.vue";
import InitHooks from "./components/initHooks.vue";
const document = window.document;
</script>

<template>
  <n-message-provider>
    <n-notification-provider>
      <init-hooks />
      <!-- <Background/> -->
    <div class="main-container">
      <router-view v-slot="{ Component,route }">
        <transition name="fade"  mode="out-in">
          <component :is="Component" :key="route.path"/>
        </transition>
      </router-view>
    </div>
    </n-notification-provider>
  </n-message-provider>
</template>


<style scoped>
.main-container {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: scroll;
}
</style>
