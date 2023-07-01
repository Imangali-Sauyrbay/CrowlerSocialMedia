import { User } from "@prisma/client"
import jwt from "jsonwebtoken"
import {type H3Event } from 'h3'

type Tokens = {
    accessToken: string,
    refreshToken: string
}

export const generateAccessToken = (user: User): string => {
    const config = useRuntimeConfig()
    
    return jwt.sign({userId: user.id}, config.jwtAccessSecret, {
        expiresIn: '10m' 
    })
}

export const generateRefreshToken = (user: User): string => {
    const config = useRuntimeConfig()

    return jwt.sign({userId: user.id}, config.jwtRefreshSecret, {
        expiresIn: '4h' 
    })
}

export const generateTokens = (user: User): Tokens => ({
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user)
})

export const sendRefreshToken = (event: H3Event, refreshToken: string) => {
    setCookie(event, 'refresh_token', refreshToken, {
        httpOnly: true,
        sameSite: true
    })
}