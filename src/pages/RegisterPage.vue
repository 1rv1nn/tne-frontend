<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-lg" style="width: 100%; max-width: 420px">
      <q-card-section>
        <div class="text-h5 text-weight-bold text-center q-mb-md">Crear cuenta</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="form.name"
          label="Nombre"
          outlined
          class="q-mb-md"
          :error="!!errors.name"
          :error-message="errors.name"
        />

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

        <q-input
          v-model="form.password_confirmation"
          label="Confirmar contraseña"
          :type="showPassword ? 'text' : 'password'"
          outlined
          class="q-mb-md"
          :error="!!errors.password_confirmation"
          :error-message="errors.password_confirmation"
        />

        <q-banner v-if="errorMsg" class="bg-red-1 text-red q-mb-md" rounded>
          {{ errorMsg }}
        </q-banner>

        <q-banner v-if="successMsg" class="bg-green-1 text-green q-mb-md" rounded>
          {{ successMsg }}
        </q-banner>

        <q-btn
          label="Registrarse"
          color="primary"
          class="full-width q-mb-md"
          unelevated
          :loading="loading"
          @click="handleRegister"
        />

        <div class="text-center">
          ¿Ya tienes cuenta?
          <router-link to="/login" class="text-primary"> Inicia sesión </router-link>
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
const successMsg = ref('');

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const errors = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const validate = () => {
  errors.name = '';
  errors.email = '';
  errors.password = '';
  errors.password_confirmation = '';
  let valid = true;

  if (!form.name) {
    errors.name = 'El nombre es obligatorio';
    valid = false;
  }

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
  } else if (form.password.length < 8) {
    errors.password = 'La contraseña debe tener mínimo 8 caracteres';
    valid = false;
  }

  if (!form.password_confirmation) {
    errors.password_confirmation = 'La confirmación es obligatoria';
    valid = false;
  } else if (form.password !== form.password_confirmation) {
    errors.password_confirmation = 'Las contraseñas no coinciden';
    valid = false;
  }

  return valid;
};

const handleRegister = async () => {
  if (!validate()) return;
  loading.value = true;
  errorMsg.value = '';
  successMsg.value = '';

  try {
    await authStore.register(form);
    successMsg.value = 'Usuario registrado correctamente, redirigiendo...';
    setTimeout(() => {
      void router.push('/login');
    }, 1500);
  } catch (e: unknown) {
    const err = e as { response?: { data?: { message?: string } } };
    errorMsg.value = err.response?.data?.message ?? 'Error al registrarse';
  } finally {
    loading.value = false;
  }
};
</script>
