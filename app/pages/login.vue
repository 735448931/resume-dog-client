<template>
	<UForm :state="state" class="space-y-4" @submit="onSubmit">
		<UFormField label="Email" name="email">
			<UInput v-model="state.email" />
		</UFormField>

		<UFormField label="Password" name="password">
			<UInput v-model="state.password" type="password" />
		</UFormField>

		<UButton type="submit" color="neutral">
			登录
		</UButton>
	</UForm>
</template>

<script setup lang="ts">
import { postEmailLoginApi } from '~/api/login'

const state = reactive({
  email: '',
  password: ''
})

async function onSubmit() {
  const result = await postEmailLoginApi(state)
  console.log(result)
}
</script>