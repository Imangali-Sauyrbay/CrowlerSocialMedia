import { MAX_SIZE } from '~/constants/FILES'
import Yup from './mnemonicYupLocale'

export const FileScheme = Yup.object().shape({
    size: Yup.number().integer().max(MAX_SIZE).required(),
    name: Yup.string().required(),
    type: Yup.string().required(),
})