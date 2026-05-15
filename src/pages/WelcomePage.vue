<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-xl text-center" style="width: 100%; max-width: 480px">
      <q-icon name="check_circle" color="positive" size="64px" class="q-mb-md" />

      <div class="text-h5 text-weight-bold q-mb-sm">¡Bienvenido {{ user?.name }}!</div>

      <div class="text-subtitle1 text-grey-7 q-mb-lg">
        Tu rol es
        <q-badge
          :color="user?.role === 'admin' ? 'negative' : 'primary'"
          class="q-ml-xs text-subtitle2"
        >
          {{ user?.role }}
        </q-badge>
      </div>

      <q-btn label="Cerrar sesión" color="grey-7" outline @click="handleLogout" />
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth.store';
import { storeToRefs } from 'pinia';

const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

onMounted(() => {
  authStore.loadUserFromStorage();
});

const handleLogout = () => {
  authStore.logout();
  void router.push('/login');
};
</script>
