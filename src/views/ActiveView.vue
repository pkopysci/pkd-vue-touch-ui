<script setup>
import { RouterView } from 'vue-router';
import { useModalStore } from '@/stores/modalStore';
import ActiveHeader from '@/components/ActiveHeader.vue';
import MainNav from '@/components/ui/MainNav.vue';
import SystemInfoModal from '@/components/modals/SystemInfoModal.vue';
import SystemErrorsModal from '@/components/modals/SystemErrorsModal.vue';

const modalStore = useModalStore()
</script>
<template>
    <SystemInfoModal v-show="modalStore.helpVisible" />
    <SystemErrorsModal v-show="modalStore.errorListVisible" />
    <div class="active-view">
        <MainNav />
        <section>
            <ActiveHeader />
            <RouterView></RouterView>
            <div class="active-footer">footer</div>
        </section>
    </div>
</template>

<style scoped>
.active-view  {
    display: grid;
    grid-template-columns: 15% auto;
    min-height: 100vh;
    min-width: 100vw;
}

.active-view section {
    display: flex;
    flex-direction: column;
}
</style>