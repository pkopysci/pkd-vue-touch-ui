<script setup>
import { translateIconTag } from '@/data/translators';

defineProps(['id','label','icon', 'isActive'])
defineEmits(['onSelect'])
</script>

<template>
    <button class="source-button" :class="{'active': isActive}" @click="$emit('onSelect', id)">
        <i v-if="icon" :class="translateIconTag(icon)"></i>
        {{ label }}
    </button>
</template>

<style scoped>
.source-button {
    min-width: 200px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 1.8rem;
}

.source-button i {
    font-size: 4rem;
}
</style>