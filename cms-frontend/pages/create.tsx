import { useState } from 'react'
import { client } from '../lib/sanityClient'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [success, setSuccess] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImage(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let mainImageRef = null

    // ✅ Upload image to Sanity if selected
    if (image) {
      const imageAsset = await client.assets.upload('image', image)
      mainImageRef = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      }
    }

    const newPost = {
      _type: 'post',
      title,
      slug: { current: title.toLowerCase().replace(/\s+/g, '-') },
      publishedAt: new Date().toISOString(),
      body: [
        {
          _type: 'block',
          children: [{ _type: 'span', text: body }],
        },
      ],
      mainImage: mainImageRef,
    }

    try {
      await client.create(newPost)
      setSuccess(true)
      setTitle('')
      setBody('')
      setImage(null)
    } catch (err) {
      console.error('Error creating post:', err)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      {success && <p className="text-green-500 mb-4">Post created successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Post body"
          className="w-full border p-2 rounded h-40"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          className="w-full border p-2 rounded"
          onChange={handleImageChange}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}
