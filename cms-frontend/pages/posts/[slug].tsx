/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

// pages/posts/[slug].tsx
import { GetServerSideProps } from 'next'
import { client, urlFor } from '../../lib/sanityClient'
import Layout from '../../components/Layout'
import { PortableText } from '@portabletext/react'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: { asset: { url: string } }
  body?: any 
}


export default function PostPage({ post }: { post: Post | null }) {
  if (!post) {
    return <Layout><div className="p-4 text-red-600">Post not found.</div></Layout>
  }

  return (
    <Layout>
      <article className="max-w-3xl mx-auto">
        {/* Featured image */}
        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).width(800).height(400).url()}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {post.title}
        </h1>

        {/* Body */}
        <div className="prose dark:prose-invert prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>
      </article>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string }

  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    body
  }`

  const post = await client.fetch(query, { slug })

  return {
    props: {
      post: post || null,
    },
  }
}
