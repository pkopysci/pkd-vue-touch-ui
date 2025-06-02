<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { emptyChannel, useAudioStore } from '@/stores/audioStore'
import { translateIconTag } from '@/data/translators'
import MatrixDestinationCard from './MatrixDestinationCard.vue'
import LevelGauge from '../ui/LevelGauge.vue'
import TouchButton from '../ui/TouchButton.vue'

defineEmits(['controlSelected'])
const props = defineProps({ dataObject: { type: Object, default: emptyChannel } })

const audioStore = useAudioStore()
const selectedSource = ref(emptyChannel)

const findSource = () => {
  let found = audioStore.inputs.find((x) => x.Id == props.dataObject.RoutedInput)
  selectedSource.value = found ? found : emptyChannel
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
    <TouchButton
      class="source-block"
      @touched="$emit('controlSelected', dataObject.Id)"
    >
      <i :class="translateIconTag(selectedSource.Icon)" class="source-icon"></i>
      <span class="source-label">{{ selectedSource.Label }}</span>
    </TouchButton>
    <TouchButton
      class="control-button"
      @touched="$emit('controlSelected', dataObject.Id)"
    >
      <i
        class="fa-solid"
        :class="{ 'fa-volume-off': dataObject.MuteState, 'fa-volume-high': !dataObject.MuteState }"
        :style="{ color: dataObject.MuteState ? 'var(--alert-color)' : '' }"
      />
      <LevelGauge :level="dataObject.Level" :isHorizontal="true" style="height: 10px" />
    </TouchButton>
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
  gap: 30px;
  background: none;
  border: none;
}

.control-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 20px;
  border-radius: 0 0 10px 10px;
}
</style>
