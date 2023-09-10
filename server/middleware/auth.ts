import UrlPattern from 'url-pattern'
import { decodeAccessToken } from '~/server/utils/JWT'
import { createNotAuthorizedError, createFailedToRetrieveError } from '~/server/utils/ErrorFactories'
import { findUserByID } from '~/server/database/users'

export default eventHandler(async (event) => {
    const authEndpoints = [
        '/api/auth/user',
        '/api/crowls'
    ]

    const currentUrl = getRequestURL(event).pathname
    const shouldIntercept = authEndpoints.some(pattern => new UrlPattern(pattern).match(currentUrl))

    if(! shouldIntercept) return

    const authHeader = getHeader(event, 'Authorization')

    if (! authHeader) {
        event.context.error = createNotAuthorizedError('\'Authorization\' header not found')
        return
    }

    const token = authHeader.split(' ')[1]
    
    if(!token) {
        event.context.error = createNotAuthorizedError('\'Authorization\' token not found')
        return
    }

    const payload = decodeAccessToken(token)

    if(!payload || !payload.userId) {
        event.context.error = createNotAuthorizedError('Token is invalid')
        return
    }

    try {
        const user = await findUserByID(payload.userId)
        event.context.user = user
    } catch (e) {
        event.context.error = createFailedToRetrieveError('user')
    }

})