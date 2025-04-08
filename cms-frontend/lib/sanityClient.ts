/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient ({
    projectId:'yg8trqrg',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN, 
})
const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)