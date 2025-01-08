<script setup>
import { useAudioStore } from '@/stores/audioStore'
import AudioChannelCard from '@/components/cards/AudioChannelCard.vue'

const audioStore = useAudioStore()

const onSetLevel = (id, level) => audioStore.sendMicLevel(id, level)
const onMute = (id, newState) => audioStore.sendMuteMic(id, newState)
</script>
<template>
  <div
    class="basic-mics fade-in vertical-activity"
    :class="{ 'vertical-center' : audioStore.mics.length < 4 }"
  >
    <AudioChannelCard
      v-for="channel in audioStore.mics"
      :key="channel.Id"
      :channel-object="channel"
      :is-mic="true"
      :channelObject="channel"
      @setLevel="onSetLevel"
      @setMute="onMute"
    ></AudioChannelCard>
  </div>
</template>

<style scoped>
.basic-mics {
  height:100%;
}
</style>
