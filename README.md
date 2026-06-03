# Tournament Scheduler & Bracket Manager (Karate Portal)

A premium, interactive tournament management suite designed for karate associations. It handles fighter registration, division categorization, bracket generation, tatami scheduling, rankings, and ID badge credential printing.

---

## 🚀 How to Run Locally

This project runs as a pure static website. We use a lightweight development server (`serve`) to host it locally.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).

### Setup & Run
1. Open your terminal in the project directory.
2. Install the local development server:
   ```bash
   npm install
   ```
3. Start the local server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser.

---

## ⚡ Realtime Collaboration with Supabase

You can connect this application to a **Supabase** database so that multiple screens (e.g. tatami scoring pads, main dashboard, public leaderboard) stay synchronized in real-time.

### 1. Set Up Your Supabase Database
1. Create a free project at [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in the Supabase Dashboard.
3. Copy, paste, and run the following SQL script to create the database table and enable real-time replication:

```sql
-- Create the tournaments table
create table if not exists tournaments (
  id text primary key,
  name text not null,
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table tournaments enable row level security;

-- Create public access policies for anonymous reads and writes
create policy "Allow public read access" on tournaments
  for select using (true);

create policy "Allow public insert access" on tournaments
  for insert with check (true);

create policy "Allow public update access" on tournaments
  for update using (true);

-- Enable Realtime events for changes
alter publication supabase_realtime add table tournaments;
```

### 2. Connect Your Application
1. Copy your **Project URL** and **Anon API Key** from the Supabase dashboard (under **Project Settings** > **API**).
2. Open your deployed Karate Portal website.
3. Navigate to the **Settings** view in the sidebar.
4. Paste the URL and Key in the **Supabase Realtime Sync** card, then click **Connect & Sync**.
5. Once connected, your state will upload to the cloud. Any other device that opens the portal and logs in with the same credentials will instantly see and update match details and brackets in real-time!

---

## 🌐 How to Deploy Online

### 1. Deploying to GitHub Pages (Automated)

We have pre-configured a GitHub Actions workflow in `.github/workflows/deploy.yml` that will automatically deploy your code to GitHub Pages on every push to the `main` or `master` branch.

1. **Initialize Git and commit your files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. **Create a new repository on GitHub** and link it:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
3. **Configure Pages on GitHub**:
   - Go to your repository on GitHub.
   - Click on **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, select **GitHub Actions** (instead of "Deploy from a branch").
   - Push any new change or run the workflow manually under the **Actions** tab to kick off the deployment!

---

### 2. Deploying to Vercel (Instant)

Vercel hosts static websites out of the box with zero configuration.

1. **Log in to Vercel** (https://vercel.com).
2. Click **Add New** > **Project**.
3. **Import** your GitHub repository.
4. Vercel will automatically configure:
   - **Framework Preset**: `Other` or `None` (detected automatically as a static site)
   - **Build Command**: Leave blank (no build command needed)
   - **Output Directory**: Leave blank (it will serve the root folder directly)
5. Click **Deploy**. Vercel will launch the portal and provide a live `*.vercel.app` URL.

---

## 🛠️ Configuration Details

- **`vercel.json`**: Sets up trailing slash handling, clean URLs, and basic HTTP security headers.
- **`.github/workflows/deploy.yml`**: Automatically uploads and deploys all application files directly to GitHub Pages using the official GitHub actions.
