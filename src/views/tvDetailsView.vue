<script setup>
    import { defineProps } from 'vue';
    import detailTvComponent from '@/components/detailTvComponent.vue';
    import headerComponent from '@/components/headerComponent.vue';
    import footerComponent from '@/components/footerComponent.vue';

    const props = defineProps({
        id: {
            type: Number,
            required: true
        }
    })
</script>
<template>
    <headerComponent />
    <detailTvComponent :id="props.id" />
    <footerComponent />
</template>
