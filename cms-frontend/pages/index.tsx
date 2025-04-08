import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client, urlFor } from '../lib/sanityClient'
import Layout from '../components/Layout'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: { asset: { url: string } }
  body?: any
}


export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await client.fetch(`*[_type == "post"]{ _id, title, slug, mainImage, body }`)
      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Latest Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
  {posts.map((post) => (
    <div
      key={post._id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 p-4"
    >
      <img
  src={urlFor(post.mainImage).width(800).height(400).fit('crop').url()}
  alt={post.title}
  className="w-full h-48 object-cover rounded-md mb-3"
/>

      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {post.body?.[0]?.children?.[0]?.text?.substring(0, 100)}...
      </p>
      <Link
        href={`/posts/${post.slug.current}`}
        className="text-blue-500 dark:text-blue-300 text-sm mt-2 inline-block"
      >
        Read more →
      </Link>
    </div>
  ))}
</div>

    </Layout>
  )
}
