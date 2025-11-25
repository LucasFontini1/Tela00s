<script setup>
import { defineProps } from 'vue'
import seasonDetailsComponent from '@/components/seasonDetailsComponent.vue';
import headerComponent from '@/components/headerComponent.vue';
import footerComponent from '@/components/footerComponent.vue';

const props = defineProps({
    id: Number,
    seasonNumber: Number
})


</script>
<template>
    <headerComponent></headerComponent>
    <seasonDetailsComponent :seasonNumber="props.seasonNumber" :id="props.id"></seasonDetailsComponent>
    <footerComponent></footerComponent>
</template>
