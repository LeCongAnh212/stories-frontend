import { configure, defineRule } from 'vee-validate'
import { 
    required, 
    max 
} from '@vee-validate/rules'
import i18n from '@/i18n'

configure({
    generateMessage: (context) => {
        const field = context.field
        const params = context?.rule?.params ?? {}
        const rule = context.rule ?? { name: '' }
        const messages = {
            required: (field) => i18n.global.t('validation.required', { field }),
            max: (field, params) => i18n.global.t('validation.max', { field, length: params.length }),
            fileType: (field, params) => i18n.global.t('validation.fileType', { field, allowedTypes: params.join(', ') }),
        }

        return messages[rule.name]?.(field, params) || i18n.global.t('validation.default', { field })
    },
})

export default () => {
    defineRule('required', required)
    defineRule('max', max)
    defineRule('fileType', (value, allowedTypes) => {
        if (!value || !value.length) return true;
        
        const fileExtension = value.split('.').pop();

        return allowedTypes.includes(fileExtension.toLowerCase()) ||
            i18n.global.t('validation.fileType', { field: 'file', allowedTypes: allowedTypes.join(', ') });
      })
}