<script setup>
    import headerComponent from '../components/headerComponent.vue';
    import footerComponent from '@/components/footerComponent.vue';
    import recomendationComponent from '@/components/recomendationComponent.vue';
    import filterComponent from '@/components/filterComponent.vue';
    import filteredTvs from '@/components/filteredTvs.vue';
</script>
<template>
    <headerComponent />
    <recomendationComponent />
    <filterComponent />
    <filteredTvs />
    <footerComponent />
</template>