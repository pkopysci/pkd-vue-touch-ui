<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { emptyChannel, useAudioStore } from '@/stores/audioStore';
import { translateIconTag } from '@/data/translators';
import MatrixDestinationCard from './MatrixDestinationCard.vue';
import LevelGauge from '../ui/LevelGauge.vue';

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
        <button class="source-block" @click="$emit('controlSelected', dataObject.Id)">
            <i :class="translateIconTag(selectedSource.Icon)"></i>
            <h3>{{ selectedSource.Label }}</h3>
        </button>
        <button class="control-button" @click="$emit('controlSelected', dataObject.Id)">
            <i class="fa-solid"
                :class="{ 'fa-volume-off': dataObject.MuteState, 'fa-volume-high': !dataObject.MuteState }"
                :style="{ color: dataObject.MuteState ? 'var(--alert-color)' : '' }"/>
            <LevelGauge :level="dataObject.Level" :isHorizontal="true" style="height: 10px;"/>
        </button>
    </MatrixDestinationCard>
</template>

<style scoped>
.source-block {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background: none;
    border: none;
}

.source-block i {
    font-size: 2.5rem;
}

.source-block h3 {
    font-size: 1.8rem;
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