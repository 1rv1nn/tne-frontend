<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-xl text-center" style="width: 100%; max-width: 420px">
      <div class="text-h1 text-weight-bold text-grey-4 q-mb-md">404</div>
      <div class="text-h6 q-mb-lg">Página no encontrada</div>
      <q-btn
        label="Ir al inicio"
        color="primary"
        unelevated
        @click="() => void router.push('/login')"
      />
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
