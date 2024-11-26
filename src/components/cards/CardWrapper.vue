<script setup></script>
<template>
    <div class="card-wrapper">
        <slot></slot>
    </div>
</template>
<style>
.card-wrapper {
    background-color: var(--card-background);
    border: var(--card-border);
    border-radius: 10px;
}
</style>
