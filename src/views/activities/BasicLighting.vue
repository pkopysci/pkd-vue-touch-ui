<script setup>
import { onBeforeMount, ref } from 'vue'
import { useLightingStore } from '@/stores/lightingStore'
import LightingControlCard from '@/components/cards/LightingControlCard.vue'

const lightingStore = useLightingStore()
const scenesSelected = ref(true)
const showMenu = ref(true)

onBeforeMount(() => {
  if (lightingStore.zones.length > 0 && lightingStore.scenes.length === 0) {
    scenesSelected.value = false
  }

  showMenu.value = lightingStore.zones.length > 0 && lightingStore.scenes.length > 0
})

const onMenuSelected = (isScenes) => {
  scenesSelected.value = isScenes
}

const onLoadChanged = (controlId, sceneId, load) => {
  lightingStore.setLoadLevel(controlId, sceneId, load)
}

const onSceneChanged = (controlId, sceneId) => {
  lightingStore.setSelectedScene(controlId, sceneId)
}
</script>

<template>
  <div class="basic-lighting fade-in" :class="{ 'vertical-center': !showMenu }">
    <div v-if="showMenu" class="lighting-menu">
      <button :class="scenesSelected ? 'active' : ''" :onclick="() => onMenuSelected(true)">
        Scenes
      </button>
      <button :class="!scenesSelected ? 'active' : ''" :onClick="() => onMenuSelected(false)">
        Zones
      </button>
    </div>

    <div v-show="scenesSelected" class="vertical-activity controls fade-in">
      <LightingControlCard
        v-for="scene in lightingStore.scenes"
        :key="scene.Id"
        :lightingItem="scene"
        :is-zone="false"
        @setActive="onSceneChanged"
      />
    </div>

    <div v-show="!scenesSelected" class="vertical-activity controls fade-in">
      <LightingControlCard
        v-for="zone in lightingStore.zones"
        :key="zone.Id"
        :lightingItem="zone"
        :is-zone="true"
        @setLoad="onLoadChanged"
      />
    </div>
  </div>
</template>

<style scoped>
.basic-lighting {
  height: 80vh;
  padding: 0px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.controls {
  width: 100%;
  padding: 0;
}

.lighting-menu {
  display: flex;
  gap: 20px;
  padding-bottom: 10px;
  width: 75%;
  justify-content: center;
  align-items: center;
}
.lighting-menu button {
  padding: 20px;
  width: 150px;
}
</style>
