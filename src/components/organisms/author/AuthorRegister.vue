<template>
    <div v-if="show" @click="show = !show" class="fixed w-full h-full bg-gray-25 opacity-80">
        <div
            @click.stop
            class="w-[400px] shadow-sm m-auto h-fit flex flex-col bg-white z-10 p-10 rounded-lg"
        >
            <base-icon name="cancel" @click="show = !show" class="self-end w-8 h-8"></base-icon>
            <label htmlFor="fileUpload" class="flex justify-center relative mb-6">
                <img
                    v-if="imagePreview"
                    :src="imagePreview"
                    alt="Image Preview"
                    class="w-24 h-24 mt-4 object-cover rounded-full"
                />
                <base-icon v-else name="person" class="w-16"></base-icon>
                <base-icon name="uploadImage" class="self-end absolute"></base-icon>
                <base-input-field
                    class="hidden"
                    v-model:="valueFieldFile"
                    type="file"
                    id="fileUpload"
                    field-name="avatar"
                    @change="onFileChange"
                    :error="errorMessageFile"
                ></base-input-field>
            </label>
            <label class="text-lg text-gray-500 mb-4">{{
                i18n.global.t('author.author_name')
            }}</label>
            <base-input-field
                v-model="valueFieldName"
                placeholder="Author name"
                field-name="author_name"
                id="author"
                :error="errorMessageName"
            >
            </base-input-field>
            <div class="flex gap-6 justify-between mt-6">
                <base-button status="error">{{ t('common.cancel') }}</base-button>
                <base-button status="success" @click="createAuthor">{{
                    t('common.accept')
                }}</base-button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { FormAuthorData } from '@/api/modules/author/profile/types'
import { authors } from '@/api/modules/author/profile'
import { showToast } from '@/utils/toastHelper'
import { ToastType } from '@/types'
import { useField } from 'vee-validate'
import { ALLOWED_IMAGE_TYPES, MAX_TEXT_INPUT } from '@/constants'
import i18n from '@/i18n'

const store = useStore()
const show = ref<boolean>(true)
const { t } = i18n.global
const imagePreview = ref<string | null>(null)

const author = reactive<FormAuthorData>({
    create_by_user_id: store.getters['author/currenUser'].id,
    author_name: computed(() => valueFieldName) as unknown as string,
})

const {
    value: valueFieldName,
    errorMessage: errorMessageName,
    validate: validateName,
} = useField('author_name', `required|max:${MAX_TEXT_INPUT}`)

const {
    value: valueFieldFile,
    errorMessage: errorMessageFile,
    validate: validateFile,
} = useField('avatar', `fileType:${ALLOWED_IMAGE_TYPES}`)

const onFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement

    if (input.files && input.files[0] && (await validateFile()).valid) {
        const file = input.files[0]
        author.avatar = file

        const reader = new FileReader()

        reader.onload = (e) => {
            imagePreview.value = e.target?.result as string
        }

        reader.readAsDataURL(file)
    }
}

const createAuthor = async () => {
    if ((await validateName()).valid) {
        try {
            await authors.create(author)
            showToast(t('author.register_sucess'), ToastType.SUCCESS)
            show.value = !show.value
        } catch (error) {
            showToast(t('author.register_failed'), ToastType.ERROR)
            console.log(error)
        }
    }
}
</script>
