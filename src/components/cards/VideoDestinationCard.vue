<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { translateIconTag } from '@/data/translators'
import { emptySource } from '@/stores/videoStore'
import { useVideoStore } from '@/stores/videoStore'
import MatrixDestinationCard from './MatrixDestinationCard.vue'

const props = defineProps(['dataObject'])
defineEmits(['routeSelected', 'controlSelected'])

const videoStore = useVideoStore()
const selectedSource = ref(emptySource)

const findSource = () => {
  let foundSource = videoStore.sources.find((x) => x.Id === props.dataObject?.CurrentSourceId)
  if (foundSource) {
    selectedSource.value = foundSource
  }
}

onBeforeMount(() => {
  findSource()
})

watch(props.dataObject, () => {
   findSource() 
})
</script>

<template>
  <MatrixDestinationCard :title="dataObject.Label">
    <button class="source-block" @click="$emit('routeSelected', dataObject.Id)">
      <i :class="translateIconTag(selectedSource.Icon)" class="source-icon"></i>
      <span class="source-label">{{ selectedSource.Label }}</span>
    </button>
    <button
      v-if="selectedSource.Control.length > 0"
      @click="$emit('controlSelected', selectedSource.Control)"
    >
      <i class="fa-solid fa-grip" /> Controls
    </button>
  </MatrixDestinationCard>
</template>

<style scoped>
.source-icon {
  font-size: 3rem;  
}

.source-label {
  font-size: 1.5rem;
}

.source-block {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  gap:30px;
  background: none;
  border: none;
}


button {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0 0 10px 10px;
  padding: 20px;
  font-size: 1.8rem;
}
button i {
  font-size: 2rem;
}
</style>
