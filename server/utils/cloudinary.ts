import {v2 as cloudinary} from 'cloudinary'

const { cloudinaryCloudName, cloudinaryAPIKey, cloudinaryAPISecret } = useRuntimeConfig()

cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryAPIKey,
    api_secret: cloudinaryAPISecret
})

export const uploadToCloudinary = (file: string) => {
    return cloudinary.uploader.upload(file)
}