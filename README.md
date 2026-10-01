# Reel – movie list with real movies, accounts and trailers

What you get: real movie data and posters from TMDB, a watchlist and watched list that sync between
your phone and computer, a "Pick a movie for me" button, and trailers that open on YouTube.

Everything below is free to start. Allow about 30 minutes.

## Step 1: Get your TMDB token
1. Create an account at https://www.themoviedb.org
2. Open Settings > API and request a Developer key (a short form).
3. Copy the **API Read Access Token** (the long one). Keep it secret. You will paste it in Step 3.

## Step 2: Set up accounts with Supabase
1. Create a free project at https://supabase.com
2. Open SQL Editor > New query, paste everything from `supabase.sql`, and click Run.
3. Open Project Settings > API. Copy the **Project URL** and the **anon public** key.
4. Paste both into `config.js`.
5. Optional for testing: Authentication > Providers > Email > turn off "Confirm email",
   so new accounts can sign in immediately.

## Step 3: Put it online with Vercel
1. Create a free GitHub account, make a new repository, and upload all the files in this folder
   (use "Add file > Upload files"; keep the `api` folder).
2. Create a free account at https://vercel.com and choose Add New > Project > import that repository.
3. Before deploying, open Environment Variables, add `TMDB_TOKEN` and paste your token from Step 1.
4. Click Deploy. Open the link on your phone and your computer, sign in on both, and your lists match.
5. In Supabase: Authentication > URL Configuration, set Site URL to your Vercel link.

## Notes
- Your TMDB token only lives in Vercel (`api/tmdb.js` uses it). It is never sent to the browser.
- The Supabase anon key in `config.js` is meant to be public. The rules in `supabase.sql` make
  sure each person can only read and change their own list.
- TMDB requires the attribution line at the bottom of the app (already included). The free API is for
  non-commercial use. If you plan to charge users, contact TMDB about a commercial license first.
- To test on your own computer: install Node.js, set `TMDB_TOKEN` in a `.env` file, and run `npx vercel dev`.
