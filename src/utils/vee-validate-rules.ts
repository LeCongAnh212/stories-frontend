import { configure, defineRule } from 'vee-validate'
import { required, min, email, max } from '@vee-validate/rules'
import i18n from '@/i18n'

configure({
    generateMessage: (context) => {
        const field = context.field
        const params = context?.rule?.params ?? {}
        const rule = context.rule ?? { name: '' }
        const messages = {
            required: (field) => i18n.global.t('validation.required', { field }),
            min: (field, params) => i18n.global.t('validation.min', { field, min: params[0] }),
            max: (field, params) => i18n.global.t('validation.max', { field, max: params[0] }),
            email: (field) => i18n.global.t('validation.email', { field }),
        }

        return (
            messages[rule.name]?.(field, params) || i18n.global.t('validation.default', { field })
        )
    },
})

export default () => {
    defineRule('required', required)
    defineRule('min', min)
    defineRule('email', email)
    defineRule('max', max)
}
