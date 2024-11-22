<template>
</template>
<script setup>
import { onMounted } from 'vue';
import confetti from 'canvas-confetti';

var end = Date.now() + (15 * 1000);

// go Buckeyes!
var colors = ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'];

onMounted((function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  });
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}));
</script>