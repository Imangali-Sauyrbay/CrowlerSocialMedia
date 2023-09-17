import { ExcludedCrowl } from "~/server/database/transformers/crowl"

type ModalEvents = 'open' | 'close'
type Payload = {
    replyTo?: ExcludedCrowl
}

export const useCrowlModalEvents = () =>
useEventBus<ModalEvents, Payload>('crowl-modal-bus')