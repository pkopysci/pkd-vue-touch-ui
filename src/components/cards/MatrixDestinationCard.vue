<script setup>
import CardWrapper from './CardWrapper.vue';

defineProps(['title'])
</script>

<template>
    <CardWrapper class="matrix-destination-card">
        <div class="card-title">
            <h2>{{ title }}</h2>
        </div>
        <div class="card-content">
            <slot></slot>
        </div>
    </CardWrapper>
</template>

<style scoped>
.matrix-destination-card {
    min-height: 280px;
    width: 250px;
    display: flex;
    flex-direction: column;    
}

.card-title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 15px;
}
.card-title h2 {
    font-size: 1.8rem;
    font-weight: 600;
}

.card-content {
    display:flex;
    flex-direction: column;
    flex-grow: 1;
}
</style>