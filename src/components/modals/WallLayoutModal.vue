<script setup>
import { useVideoWallStore } from '@/stores/videoWallStore'
import { useModalStore } from '@/stores/modalStore'
import ItemListModalWrapper from './ItemListModalWrapper.vue'

const props = defineProps(['controller','canvas'])

const videoWallStore = useVideoWallStore()
const modalStore = useModalStore()

const onModalClose = () => {
    modalStore.setVideoWallLayoutVisibility(false)
}

const onLayoutSelect = (layoutId) => {
  videoWallStore.sendLayoutSelect(props.controller.Id, props.canvas.Id, layoutId)
  onModalClose()
}

</script>

<template>
  <ItemListModalWrapper @closeModal="onModalClose" title="Video Wall Layouts">
    <button
      v-for="layout in canvas.Layouts"
      :key="layout.Id"
      class="layout-button"
      @click="
        () => {
          onLayoutSelect(layout.Id)
        }
      "
    >
      <span
        class="layout-icon"
        :style="{ gridTemplateRows: layout.Height, gridTemplateColumns: layout.Width }"
      >
        <div
          v-for="cell in layout.Cells"
          :key="cell.Id"
          class="cell"
          :style="{
            gridRowStart: cell.YPosition,
            gridRowEnd: cell.YPosition,
            gridColumnStart: cell.XPosition,
            gridColumnEnd: cell.XPosition
          }"
        ></div>
    </span>
      {{ layout.Label }}
    </button>
  </ItemListModalWrapper>
</template>

<style scoped>
.layout-button {
  display: flex;
  gap: 30px;
  border-radius: 0;
  padding: 30px;
  width: 100%;
  border-bottom: var(--card-border);
  align-items: center;
}

.cell {
    background-color: var(--text-color);
    margin: 2px;
    border-radius:2px;
}
.layout-icon {
  display: grid;
  width: 100px;
  height: 60px;
}
</style>
