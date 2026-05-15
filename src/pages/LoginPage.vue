<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-lg" style="width: 100%; max-width: 420px">
      <q-card-section>
        <div class="text-h5 text-weight-bold text-center q-mb-md">Iniciar sesión</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="form.email"
          label="Correo electrónico"
          type="email"
          outlined
          class="q-mb-md"
          :error="!!errors.email"
          :error-message="errors.email"
        />

        <q-input
          v-model="form.password"
          label="Contraseña"
          :type="showPassword ? 'text' : 'password'"
          outlined
          class="q-mb-md"
          :error="!!errors.password"
          :error-message="errors.password"
        >
          <template #append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>

        <q-banner v-if="errorMsg" class="bg-red-1 text-red q-mb-md" rounded>
          {{ errorMsg }}
        </q-banner>

        <q-btn
          label="Iniciar sesión"
          color="primary"
          class="full-width q-mb-md"
          unelevated
          :loading="loading"
          @click="handleLogin"
        />

        <div class="text-center">
          ¿No tienes cuenta?
          <router-link to="/register" class="text-primary"> Regístrate </router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth.store';

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(false);
const showPassword = ref(false);
const errorMsg = ref('');

const form = reactive({
  email: '',
  password: '',
});

const errors = reactive({
  email: '',
  password: '',
});

const validate = () => {
  errors.email = '';
  errors.password = '';
  let valid = true;

  if (!form.email) {
    errors.email = 'El correo es obligatorio';
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'El correo no tiene un formato válido';
    valid = false;
  }

  if (!form.password) {
    errors.password = 'La contraseña es obligatoria';
    valid = false;
  }

  return valid;
};

const handleLogin = async () => {
  if (!validate()) return;
  loading.value = true;
  errorMsg.value = '';

  try {
    await authStore.login({ email: form.email, password: form.password });
    await router.push('/welcome');
  } catch (e: unknown) {
    const err = e as { response?: { data?: { message?: string } } };
    errorMsg.value = err.response?.data?.message ?? 'Error al iniciar sesión';
  } finally {
    loading.value = false;
  }
};
</script>
