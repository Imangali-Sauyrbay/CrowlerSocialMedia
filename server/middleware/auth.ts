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

    if (! authHeader) return createNotAuthorizedError('\'Authorization\' header not found')

    const token = authHeader.split(' ')[1]
    
    if(!token) return createNotAuthorizedError('\'Authorization\' token not found')

    const payload = decodeAccessToken(token)

    if(!payload || !payload.userId) return createNotAuthorizedError('Token is invalid')

    try {
        const user = await findUserByID(payload.userId)
        event.context.user = user
    } catch (e) {
        return createFailedToRetrieveError('user')
    }

})