<script setup>
import { translateIconTag } from '@/data/translators'
import ListButton from '../ui/ListButton.vue'
import CardWrapper from './CardWrapper.vue'
defineProps(['items'])
defineEmits(['onSelect'])
</script>
<template>
  <CardWrapper style="height: 100%">
    <ul class="item-list-card">
      <li v-for="item in items" :key="item.Id">
        <ListButton
        style="width:100%"
        @click="$emit('onSelect', item.Id)">
          <i v-if="item.Icon" :class="translateIconTag(item.Icon)"></i>
          <span>{{ item.Label }}</span>
        </ListButton>
      </li>
    </ul>
  </CardWrapper>
</template>
<style scoped>
.item-list-card {
  display: flex;
  flex-direction: column;
}

.item-list-card span {
    text-align: start;
}
</style>
