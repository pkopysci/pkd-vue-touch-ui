<script setup>
import { ref } from 'vue'
import { emptyCamera, useCameraStore } from '@/stores/cameraStore'
import ItemListCard from '@/components/cards/ItemListCard.vue'
import NavPad from '@/components/ui/NavPad.vue'
import UpDownButtonColumn from '@/components/ui/UpDownButtonColumn.vue'
import { Vector2D } from '@/data/Vector2D'

const cameraStore = useCameraStore()
const selectedCamera = ref(emptyCamera)
const ptzVector = new Vector2D()

const onCameraSelected = (id) => {
    let camera = cameraStore.cameras.find((x) => x.Id === id)
    selectedCamera.value = camera ? camera : emptyCamera
}

const onPresetSelect = (id) => {
    console.log(selectedCamera.value.Id)
    cameraStore.sendPresetSelect(selectedCamera.value.Id, id)
}

const onTiltUp = () => {
    ptzVector.y = 1
    cameraStore.sendCameraPanTilt(selectedCamera.value.Id, ptzVector)
}

const onTiltDown = () => {
    ptzVector.y = -1
    cameraStore.sendCameraPanTilt(selectedCamera.value.Id, ptzVector)
}

const onPanLeft = () => {
    ptzVector.x = -1
    cameraStore.sendCameraPanTilt(selectedCamera.value.Id, ptzVector)
}
const onPanRight = () => {
    ptzVector.x = 1
    cameraStore.sendCameraPanTilt(selectedCamera.value.Id, ptzVector)
}
const onPtzStop = () => {
    ptzVector.x = 0
    ptzVector.y = 0
    cameraStore.sendCameraPanTilt(selectedCamera.value.Id, ptzVector)
}

const onZoom = (direction) => {
    cameraStore.sendCameraZoom(selectedCamera.value.Id, direction)
}
</script>

<template>
    <div class="fade-in pad-10 flex fill-horiz fill-vert">
        <ItemListCard :items="cameraStore.cameras" @on-select="onCameraSelected"
            style="max-width: 200px;height: 90%;" />
        <div class="flex flex-col fill-horiz" style="max-height: 90%;">
            <div class="flex fill-horiz fill-vert vertical-center horizontal-center">
                <NavPad
                    @upPressed="onTiltUp"
                    @downPressed="onTiltDown"
                    @leftPressed="onPanLeft"
                    @rightPressed="onPanRight"
                    @upReleased="onPtzStop"
                    @downReleased="onPtzStop"
                    @leftReleased="onPtzStop"
                    @rightReleased="onPtzStop" />
                <UpDownButtonColumn
                    :hide-top-button="true"
                    :buttons-label="'Zoom'"
                    @upPressed="onZoom(1)"
                    @downPressed="onZoom(-1)"
                    @upReleased="onZoom(0)"
                    @downReleased="onZoom(0)" />
            </div>
            <div class="flex fill-horiz">
                <button v-for="preset in selectedCamera.Presets" :key="preset.Id" @click="onPresetSelect(preset.Id)">
                    {{ preset.Label }}
                </button>
            </div>
        </div>
    </div>
</template>
