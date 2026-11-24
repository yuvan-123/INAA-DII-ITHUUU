# A Little Book About You

> A vintage scrapbook birthday website — handcrafted digitally by two best friends.

---

## What This Is

A beautifully designed, deeply personal birthday website built with Next.js 15, Tailwind CSS, and Framer Motion. It looks and feels like a physical handmade scrapbook brought to life on screen: Polaroid photographs, handwritten letters, paper notes, envelope animations, and genuine emotional storytelling.

---

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS**
- **Framer Motion** — animations and transitions
- **Supabase Storage** — image hosting
- **Vercel** — deployment

---

## Project Structure

```
birthday-scrapbook/
├── app/
│   ├── layout.tsx          # Root layout, font imports
│   ├── page.tsx            # Main page, section orchestration
│   └── globals.css         # Design system, paper textures, typography
├── components/
│   ├── EnvelopeIntro.tsx   # Animated envelope opening experience
│   ├── ScrapbookNavigation.tsx
│   ├── Polaroid.tsx        # Polaroid card + lightbox
│   ├── PhotoGallery.tsx    # Three of Us section
│   ├── LetterSection.tsx   # Two Letters section
│   ├── MemoryNotes.tsx     # Little Things notes section
│   ├── ChaosSection.tsx    # Our Chaos section
│   └── FinalBirthdayPage.tsx
├── data/
│   ├── memories.ts         # Photo metadata, captions, dates
│   ├── letters.ts          # Letter content
│   └── notes.ts            # Personal notes
├── lib/
│   ├── utils.ts
│   └── supabase.ts         # Supabase client + image URL helper
├── public/
│   └── images/             # (optional) local fallback images
├── .env.example
└── next.config.ts
```

---

## Personalising the Content

All personal content is separated from the UI in `data/`:

### Photographs (`data/memories.ts`)

Each memory has an `src` field. Set it to the Supabase public URL of the uploaded photo, or leave it `null` to show the placeholder.

```ts
{
  id: "mem-01",
  src: "https://your-project.supabase.co/storage/v1/object/public/birthday-memories/group/photo1.jpg",
  caption: "The three of us 🌸",
  date: "Summer 2023",
  rotation: -2,
  size: "lg",
  note: "That day when everything just felt perfect.",
  folder: "group",
}
```

### Letters (`data/letters.ts`)

Replace the placeholder letter body with your actual words. Each `body` entry is a paragraph.

### Notes (`data/notes.ts`)

Replace placeholder note text with your genuine notes. Each has a `category`, `text`, and `rotation`.

### Names and Messages

Search for `[Her Name]`, `[Best Friend One]`, `[Best Friend Two]`, `[Your Name]` in the components and data files and replace with real names.

---

## Supabase Setup

### 1. Create a Supabase Project

Go to [supabase.com](https://supabase.com) and create a new project.

### 2. Create the Storage Bucket

In the Supabase dashboard:
1. Go to **Storage → New bucket**
2. Name it: `birthday-memories`
3. Set it to **Public**

### 3. Organise Your Photos

Upload photos using this folder structure inside the bucket:

```
birthday-memories/
  group/            ← photos of all three friends
  yuvan-and-her/    ← photos of friend 1 with her
  bestfriend-and-her/ ← photos of friend 2 with her
  funny-moments/    ← chaos section photos
  final-memory/     ← the final page photo
```

### 4. Storage Policy

The bucket is public (read-only). Do not add public upload policies.

To restrict uploads to authenticated users only, add this policy in the Supabase SQL Editor:

```sql
-- Allow public read
CREATE POLICY "Public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'birthday-memories');

-- Restrict upload to authenticated users only
CREATE POLICY "Authenticated upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'birthday-memories'
    AND auth.role() = 'authenticated'
  );
```

### 5. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Find these in: Supabase Dashboard → Project Settings → API.

**Never commit `.env.local`.** It is already in `.gitignore`.

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploying to Vercel

### 1. Push to GitHub

```bash
git init   # already done
git add .
git commit -m "birthday scrapbook initial"
git remote add origin https://github.com/your-username/birthday-scrapbook.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**

### 3. Custom Domain (Optional)

In Vercel project settings → Domains → add your custom domain.

---

## Checklist Before Sharing

- [ ] Replace all `[Her Name]`, `[Best Friend One]`, `[Best Friend Two]` placeholders
- [ ] Upload photos to Supabase and update `src` fields in `data/memories.ts`
- [ ] Write real letter content in `data/letters.ts`
- [ ] Write real personal notes in `data/notes.ts`
- [ ] Update inside jokes in `data/memories.ts` → `insideJokes`
- [ ] Update the final joint birthday message in `components/FinalBirthdayPage.tsx`
- [ ] Add real signatures
- [ ] Test on mobile before sharing

---

## Notes for Future Content Management

The architecture is ready for Supabase database integration if you later want to edit content (letters, captions, notes) without redeploying. The data layer in `data/` is fully decoupled from the UI components.

---

*Made with love. Happy birthday.* ♡
