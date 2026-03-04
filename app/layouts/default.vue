<template>
    <div class="flex flex-col min-h-screen">
        <AppHeader />

        <main class="flex-1 bg-gray-50">
            <slot>

            </slot>
        </main>
    </div>
</template>

<script setup lang="ts">
import App from '~/app.vue';


</script>

<style scoped>

</style>