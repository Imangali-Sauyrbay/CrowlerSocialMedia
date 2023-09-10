const { i18n } = useI18nConfig();

const minRuleLocalizer = (message: string, localizedField: string): string => {

    if(message.startsWith('min-string')) {
        const length = message.split(':')[1] || 'N/A'
        return i18n.global.t('validation.rules.min-string', {field: localizedField, length})
    }

    return message;
}

const containRuleLocalizer = (message: string, localizedField: string): string => {
    const toContain = message.split(':')[1]

    if(toContain.startsWith('special-character'))
        return i18n.global.t(
            'validation.rules.must-contain-characters',
            {
                field: localizedField,
                count: 1,
                characters: toContain.split(',')[1].split('').join(' ')
            }
        )

    if(toContain.startsWith('uppercase'))
        return i18n.global.t(
            'validation.rules.must-contain-uppercase',
            {
                field: localizedField,
                count: 1
            }
        )

        
    if(toContain.startsWith('number'))
        return i18n.global.t(
            'validation.rules.must-contain-number',
            {
                field: localizedField,
                count: 1
            }
        )

    return message;
}

const localizeErrorMessage = (message: string, localizedField?: string): string => {
    localizedField = localizedField || i18n.global.t('validation.fields.default')

    if(message.startsWith('min'))
        return minRuleLocalizer(message, localizedField)

    if(message.startsWith('must-contain'))
        return containRuleLocalizer(message, localizedField)

    if(message == 'email')
        return i18n.global.t('validation.rules.email')

    return i18n.global.t('validation.rules.' + message, { field: localizedField })
}

export const useValidationMnemonicLocalizer = () => localizeErrorMessage