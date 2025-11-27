<script setup>
import actorComponent from '@/components/actorComponent.vue';
import { defineProps } from 'vue';
import headerComponent from '@/components/headerComponent.vue';
import footerComponent from '@/components/footerComponent.vue';
const props = defineProps({
    id: {
        type: Number
    }
})
</script>
<template>
<headerComponent />
<actorComponent :id="props.id" />
<footerComponent />
</template>
<style scoped>

</style>