<script setup>
import { translateIconTag } from '@/data/translators'
import { useModalStore } from '@/stores/modalStore'
import ItemListModalWrapper from './ItemListModalWrapper.vue'
import { computed } from 'vue'

const props = defineProps({
  sourceList: {
    type: Array,
    required: true
  },
  destinationId: {
    type: String,
    default: ''
  },
  selectedId: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: 'Select a Source'
  }
})

const emit = defineEmits(['onSourceSelect'])
const modalStore = useModalStore()
const currentSourceId = computed(() => props.selectedId)
const currentTitle = computed(() => props.title)

const onModalClose = () => {
  modalStore.setSourceListVisibility(false)
}

const SourceSelected = (id) => {
  emit('onSourceSelect', id, props.destinationId)
  onModalClose()
}
</script>

<template>
  <ItemListModalWrapper @closeModal="onModalClose" :title="currentTitle">
    <button
      v-for="source in sourceList"
      :key="source.Id"
      :id="source.Id"
      class="source-button"
      :class="{ active: source.Id == currentSourceId }"
      @click="
        () => {
          SourceSelected(source.Id)
        }
      "
    >
      <i :class="translateIconTag(source.Icon)"></i>
      {{ source.Label }}
    </button>
  </ItemListModalWrapper>
</template>

<style scoped>
.source-button {
  display: flex;
  gap: 30px;
  border-radius: 0;
  padding: 30px;
  width: 100%;
  border-bottom: var(--card-border);
}
</style>
