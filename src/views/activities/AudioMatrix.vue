<script setup>
import { useAudioStore } from '@/stores/audioStore';
import { useModalStore } from '@/stores/modalStore';
import AudioDestinationCard from '@/components/cards/AudioDestinationCard.vue';
import AudioDestinationModal from '@/components/modals/AudioDestinationModal.vue';

const audioStore = useAudioStore();
const modalstore = useModalStore();

const onDestinationSelected = (id) => {
    modalstore.setAudioDestinationControlState(id, true);
}

</script>

<template>
    <AudioDestinationModal v-show="modalstore.audioDestinationControlState.isVisible"/>
    <div class="audio-matrix fade-in vertical-activity">
        <AudioDestinationCard v-for="dest in audioStore.outputs" :key="dest.Id" :dataObject="dest"
            @control-selected="onDestinationSelected" />
    </div>
</template>

<style scoped>
.audio-matrix {
    flex-grow: 1;
    padding: 20px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
</style>