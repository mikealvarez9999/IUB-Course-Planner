# IUB Course Planner ✨

**A tiny, fast web app to make IUB course planning actually bearable.**

## Why this exists (the real story)

Like most IUB students, I was absolutely fed up juggling between iRAS's messy course offers and my jumbled-up khata-kolom notes just to figure out a few conflict-free plans for registration. I wanted an app that would take all these messy course offers, present them cleanly, and let me select courses to make plans (as many as I want) without overlapping or manually considering conflicts.

So I built it. Here's what you get:

## What you can do
- Browse real iRAS course offers in a clean table/cards view
- Search by code/title/faculty and filter by day group (ST, MW, AR) or seat availability  
- Build multiple plans with automatic conflict checks (no overlaps!)
- Rename, duplicate, delete plans easily
- **Export plans as JPG** - saves a snapshot of your routine grid plus selected sections list as a single image (perfect for actual registration day)
- Light/dark theme, works great on PC and mobile
- PWA-enabled (install as an app on mobile via "Add to Home Screen")
- Clears data on logout for privacy

## How to use
1. Open the app: https://mikealvarez9999.github.io/IUB-Course-Planner
2. Click "iRAS Login" and sign in with your credentials
3. Click "Course Refresh" to pull your latest offers (wait a few seconds)
4. Browse/search courses, then hit "Add To Plan" on sections you want
5. When happy with a plan, hit "Export this plan (JPG)" to save a clean snapshot

**Tip:** If the login window doesn't open, allow popups for the site.

## Why this helps
- Try unlimited combos without khata-kolom math
- Conflict prevention keeps overlapping sections out
- If iRAS shows nothing (you know the pain), the app shows your last saved backup
- Export feature gives you a clean reference for actual registration

## Important notes
- **Not an official IUB tool** - just something I built to make our lives easier
- No ads, no trackers
- Your iRAS login stays yours - I don't store credentials
- Last-saved backup is cached in your browser (won't work in incognito mode)
- Logout clears data so others can't peek

## Troubleshooting (quick fixes)
- "Showing last saved backup" → iRAS had no data; you're seeing your last good copy
- Course Refresh stuck? Reload the page and try again
- Still weird? Log out and back in
- Login window won't open? Allow popups for the site

## Coming soon
- More reliable plan restore 
- Better backup system (not just browser cache)
- More filters and UX improvements

## Built with
Plain HTML, CSS, and JavaScript. Lightweight and fast.

---

**Found this helpful?** Share with your friends! Found a bug or have ideas? Open an issue or reach out.

If this makes registration a little easier for even a few people, it's worth it. 💙