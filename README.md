# 📝 CMS Blog Website

A full-stack blog project built with **Next.js** (frontend) and **Sanity** (headless CMS). This app allows you to read blog posts, and even create new ones through a form — all connected to live CMS content!

---

## 🔧 Tech Stack

- **Frontend:** Next.js + Tailwind CSS
- **CMS Backend:** Sanity Studio
- **Deployment:** Vercel (for both frontend & CMS)
- **Features:** Post listing, single post page, create post form, image upload

---

## 📦 Project Structure

🚀 Features

- 📚 View all blog posts with title, image & excerpt
- 📄 Dynamic post pages with rich Portable Text
- ✍️ `/create` form to add new blog posts (with image upload)
- 💾 Posts saved in Sanity and auto-display on homepage
- 📱 Fully responsive and styled with Tailwind CSS

---

## 🧑‍💻 Local Development

```bash
# Clone the repo
git clone https://github.com/Muntasir07Isha/CMS-BLOG-WEBSITE.git
cd CMS-BLOG-WEBSITE

# Frontend
cd cms-frontend
npm install
npm run dev

# In a new terminal tab:
# Backend (Sanity Studio)
cd cms-blog-studio
npm install
npm run dev
