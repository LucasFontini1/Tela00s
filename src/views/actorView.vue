<script setup>
import actorComponent from '@/components/actorComponent.vue';
import { defineProps } from 'vue';

const props = defineProps({
    id: {
        type: Number
    }
})
</script>
<template>

<actorComponent :id="props.id" />

</template>
<style scoped>

</style>