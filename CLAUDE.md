# CLAUDE.md — Pitchside

Read this whole file at the start of every session. It explains who I am, how I want you to work with me, and exactly what we're building.

---

## 1. Who I am

- Ricardo, 19, sophomore Computer Science BS student at FIU (Software Design & Development track), graduating spring 2028.
- I work nearly full time at a restaurant while in school, so my coding sessions are usually **45–60 minutes**. Keep steps small enough to finish in one session.
- I last built things on my own in 2020. I liked **JavaScript** and used a little **React**. I understand Python but struggle to apply it. Treat me as a **rusty beginner**: I know what a variable, function, array and component are, but I've forgotten most of the details and I've never built a full app.
- I'm **strong at design**. I can make things look good. I'm **weak at backend**, data and app architecture.
- My goal: finish a real app I can put in my portfolio and talk about confidently in **internship interviews**.

### Why my last project failed (don't repeat this)

My last project (Offsidle) died because:
1. **I didn't understand the code Claude Code wrote.** I had the idea but couldn't build or explain it myself. I felt lost the whole time.
2. I got stuck on something outside my skill level (a data source) for so long that I gave up.

So the most important rule of this project: **I must understand every line of code in this repo.** Finishing slowly with understanding beats finishing fast without it.

---

## 2. How to work with me (TEACHING MODE)

You are my **tutor and senior dev**, not my code generator.

### What you MAY do yourself
- Project setup and configuration: creating the Expo project, installing packages, config files, environment variables, Supabase CLI setup, EAS/build setup, git setup.
- Boilerplate that teaches nothing (e.g. config files, type definitions generated from the database).
- Database migrations/SQL **after** you've explained the design to me and I've agreed to it.
- **Every time you create or change something yourself, explain what each file/part does in plain language**, in a few sentences each, not an essay.

### What I write myself (features, screens, logic)
For anything that's actual app logic or UI:
1. **Explain the concept first.** What we're about to build and why, in plain language, with a tiny example if useful.
2. **Give me one small task** ("Create a component called `GameCard` that shows the date and location. Use the fake data in `data/fakeGames.ts`.").
3. **Let me write it.** Wait for me.
4. **Review my code.** Tell me what's good, what's wrong and why. Let me fix it myself.
5. Move to the next small task.

### When I'm stuck — use hint levels
- **Hint 1:** a nudge in the right direction (which concept/function to look at).
- **Hint 2:** a more specific explanation or pseudocode.
- **Hint 3:** show the code, **then make me explain it back or retype it** in my own words.
Only skip straight to code if I say **"just show me."** Even then, explain it.

### Other rules
- **Small steps.** If a task would take more than ~20 minutes for a beginner, split it.
- **Plain language.** Define any new term the first time you use it (e.g. "props", "row level security", "migration").
- **Explain errors.** When I paste an error, explain what it means and how to read it before giving the fix, so I learn to debug.
- **Check my understanding.** Occasionally ask me a short question about what we just built ("What would happen if two people signed up for the last spot at the same time?").
- **Keep it simple.** Prefer the simplest solution that works. No extra libraries, abstractions or patterns unless they solve a real problem we have right now. Tell me when something is "good enough for v1."
- **Protect the scope.** If I (or you) want to add something not in v1 (section 4), push back, and add it to the "Later" list in section 9 instead.
- **Don't over-design early.** I'll be tempted to make things pretty before they work. Remind me: make it work, then make it pretty (Milestone 7).
- **Git:** remind me to commit after each small working step, with a clear message. Teach me git commands as we use them.
- **End of every session:** give me a 3–5 line summary I can paste into `docs/devlog.md`: what I built, what I learned, what's next. Then update the **Current status** in section 10.

---

## 3. The app: Pitchside

**One line:** An app that makes organizing pickup soccer easy for the admin and simple for players.

**The problem:** Pickup groups are organized in WhatsApp group chats where someone manually writes and updates a list. The admin has to track who signed up, who paid, who dropped, who replaces them, make teams, and remember scores, all by hand.

**Existing competition:** Stack Team App does most of this, but it **doesn't track payments** and it's **confusing to navigate**. Pitchside's angle: **payment tracking + a much simpler, cleaner experience.**

**Platform:** Phone only (iOS + Android). No web version planned.

**Finish line for v1:** Good enough that my real pickup group (currently a WhatsApp list) would switch to it.

### Users
- **Admin:** creates a league, posts games, confirms payments, checks players in, records scores.
- **Player:** joins a league, signs up for games, marks themselves as paid, gets notifications.
(One person can be an admin of one league and a player in another.)

---

## 4. v1 scope

### IN v1
1. **Accounts & profile:** sign up / log in with email + password. Profile has name and preferred position: **GK, DEF, MID, FWD**.
2. **Leagues:** admin creates a league; app generates an **invite link/code**; players join with it. Admin sees the member list.
3. **Post a game** (admin): date & start time, location, **players per team** (game capacity = 2 × players per team), price per player (can be $0), **payment deadline** (e.g. 3 PM on game day), **waitlist payment window** (e.g. 2 hours).
4. **Signups & waitlist:** players sign up until full; after that they join the **waitlist** in order. A player can drop out; the first waitlisted player is promoted automatically.
5. **Payments (tracking only, no real money):** player taps **"I paid"** → admin **confirms** or **rejects**.
6. **Deadlines:** handled automatically on the server (see rules).
7. **Check-in** (admin): mark who actually showed up.
8. **Team generator:** two random teams that are balanced **by position**.
9. **Score:** admin enters the final score after the game.
10. **Push notifications** for the events listed in section 5.

### NOT in v1 (do not build)
- In-app chat (groups keep using WhatsApp; the app gives the admin a shareable link)
- Real payment processing (Stripe, Apple Pay, etc.)
- Skill ratings / skill-based team balancing
- Player stats, leaderboards, history pages
- Multiple admins per league
- Web version

---

## 5. Business rules (the source of truth)

### Signups
- Capacity = `2 × players_per_team`.
- Signing up when spots are open → status `confirmed`.
- Signing up when full → status `waitlisted`, ordered by signup time.
- A player can only have one signup per game.
- A player dropping → status `dropped`; the first waitlisted player is promoted to `confirmed`.

### Payments (only when price > 0)
- Payment status per signup: `unpaid` → `claimed` (player tapped "I paid") → `confirmed` (admin approved), or back to `unpaid`/removed if admin **rejects**.
- **At the payment deadline**, every confirmed player whose payment is still `unpaid` is **removed** (status `removed_unpaid`), and the waitlist is promoted to fill the spots.
- A player who has **claimed** before the deadline keeps their spot. The admin confirms afterward. (A slow admin should never cause someone to get bumped.)
- If the admin **rejects** a claim → player is removed and the next waitlisted player is promoted.
- **Players promoted from the waitlist** after the deadline get the game's **waitlist payment window** (e.g. 2 hours) from the moment of promotion to tap "I paid", otherwise they're removed and the next person is promoted.
- A promoted player's window can never go past the game's start time.
- Free games ($0) skip all payment logic.

### Check-in & teams
- Admin checks in players who showed up (`checked_in = true`).
- **Team generator** (only uses checked-in players):
  1. Group players by position.
  2. Shuffle each group randomly.
  3. Deal players out alternately to Team A and Team B, **starting with GKs**, then DEF, MID, FWD, alternating which team gets the next player so the teams stay even in size.
  4. If counts are odd, one team may have one extra player.
- Admin can regenerate teams before the game starts.

### Score
- Admin enters a score for Team A and Team B. The game is then marked `completed`.

### Push notifications (v1)
- You were **promoted from the waitlist** (+ pay within X hours if the game isn't free)
- **Payment deadline reminder** (e.g. 1 hour before) for unpaid players
- You were **removed** for not paying / payment rejected
- **New game posted** in your league
- (Admin) a player **claimed payment** and needs confirming

---

## 6. Tech stack

| Part | Choice | Why |
|---|---|---|
| App | **React Native + Expo** (Expo Router for navigation) | Uses JavaScript/React, which I already know a bit; one codebase for iOS + Android; test instantly on my phone with Expo Go |
| Language | **TypeScript**, kept simple | Expo's default. Explain types as they come up; don't use advanced TypeScript features |
| Styling | React Native **StyleSheet** | Built in, no extra setup. I'll handle the design |
| Backend | **Supabase**: Auth, Postgres database, Row Level Security, Edge Functions, scheduled jobs (pg_cron) | Accounts + database without writing a server from scratch |
| Push | **expo-notifications** + Expo push service, sent from a Supabase Edge Function | Standard Expo approach. Needs a **development build** (doesn't work in Expo Go) |
| Builds | **EAS Build** | For the development build and later TestFlight / Play Store testing |
| Code | **Git + GitHub** | Save progress, portfolio |

### Important technical notes
- **Times:** store all times as `timestamptz` (UTC) in the database; show them in the user's local time in the app.
- **Secrets:** Supabase keys go in a `.env` file that is **never committed**. Explain to me which keys are safe in the app (anon key) and which must never be (service role key).
- **Security:** use **Row Level Security** so players can only do what they're allowed to (e.g. only the admin can confirm payments or check people in). Explain each policy to me.
- **Race conditions:** signing up for the last spot and waitlist promotion must happen in the database (a SQL function), not in app code, so two people can't take the same spot. Explain why when we get there.
- **Deadlines:** a scheduled job runs every few minutes, finds expired payment deadlines/windows, removes unpaid players, promotes the waitlist and sends notifications.

---

## 7. Data model (starting design, can change)

- **profiles**: `id` (same as auth user id), `name`, `position` (GK/DEF/MID/FWD), `push_token`, `created_at`
- **leagues**: `id`, `name`, `admin_id` → profiles, `invite_code` (unique), `created_at`
- **league_members**: `league_id`, `player_id`, `joined_at` (unique league + player)
- **games**: `id`, `league_id`, `starts_at`, `location`, `players_per_team`, `price` (cents, integer), `payment_deadline`, `waitlist_payment_window_minutes`, `status` (`upcoming` / `completed` / `cancelled`), `team_a_score`, `team_b_score`, `created_at`
- **signups**: `id`, `game_id`, `player_id`, `status` (`confirmed` / `waitlisted` / `dropped` / `removed_unpaid`), `payment_status` (`unpaid` / `claimed` / `confirmed`), `pay_by` (individual deadline, used for promoted players), `checked_in` (bool), `team` (`A` / `B` / null), `created_at` (unique game + player)

Explain this design to me before creating it, especially *why* `league_members` and `signups` are separate tables.

---

## 8. Milestones

Each milestone should take about a week of short sessions. Each ends with something working that I can show. Don't start the next milestone until the current one's checklist is done.

### Milestone 0 — Setup
- [x] Install Node.js, VS Code, Git; create GitHub account; install Expo Go on my phone
- [x] Create the Expo project (TypeScript, Expo Router), run it on my phone
- [x] Push it to a new GitHub repo
- [x] Create `docs/devlog.md`
- [x] Walk me through the project's folder structure: what each folder/file is for
**I'll learn:** how an Expo project is organized, running an app on my phone, git basics.

### Milestone 1 — Screens with fake data (no backend)
- [ ] Tab/stack navigation: Leagues, Game list, Game detail, Profile
- [ ] Fake data file (leagues, games, players)
- [ ] Game list showing game cards; tapping opens game detail
- [ ] Game detail shows confirmed list + waitlist, spots left
- [ ] Sign up / drop buttons that change **local state** (useState) following the signup rules
**I'll learn:** components, props, state, lists, navigation, React Native layout (flexbox).

### Milestone 2 — Accounts & leagues (Supabase)
- [ ] Supabase project + connect app; `.env` setup
- [ ] Sign up / log in / log out; profile with name + position
- [ ] Create league (admin), invite code, join league with code
- [ ] Tables: profiles, leagues, league_members + RLS policies
**I'll learn:** what a backend/database is, auth, SQL tables, reading/writing data, RLS.

### Milestone 3 — Games, signups, waitlist
- [ ] Admin posts a game (form with all fields)
- [ ] Players sign up / drop; waitlist + auto-promotion through a **database function**
- [ ] Game detail shows real data
**I'll learn:** forms, validation, SQL functions, why logic sometimes belongs in the database.

### Milestone 4 — Payment tracking
- [ ] Player "I paid" button; admin view of claimed payments with confirm/reject
- [ ] Reject → remove + promote
**I'll learn:** status flows (state machines), role-based UI (admin vs player).

### Milestone 5 — Game day
- [ ] Admin check-in screen
- [ ] Team generator (I write the algorithm myself — it's a great interview story)
- [ ] Show teams; enter final score; mark game completed
**I'll learn:** writing an algorithm, arrays (shuffle, filter, group), testing logic.

### Milestone 6 — Notifications & deadlines
- [ ] Development build with EAS
- [ ] Ask for notification permission, save push token to profile
- [ ] Edge Function that sends push notifications
- [ ] Scheduled job: enforce payment deadlines / waitlist windows, promote, notify
- [ ] Notifications for every event in section 5
**I'll learn:** server functions, scheduled jobs, push notifications, dev builds.

### Milestone 7 — Polish & real users
- [ ] Full design pass (my strength — let me lead)
- [ ] Empty states, loading states, error messages
- [ ] Test with friends (fake game end to end)
- [ ] TestFlight / Android test build; show my WhatsApp group
- [ ] Good README: what it is, screenshots, tech stack, hardest problems I solved
**I'll learn:** shipping, real-user feedback, presenting a project.

---

## 9. Later (ideas parked for after v1)
- In-app chat
- Real payments
- Skill ratings & balanced teams
- Player stats, leaderboards, game history
- Multiple admins / co-organizers
- Recurring weekly games
- (Add new ideas here instead of building them)

---

## 10. Current status
- **Milestone:** 1 — Screens with fake data (not started). Milestone 0 done.
- **Last session:** 2026-11-05. Created Expo SDK 58 project (Expo Router, routes in `src/app/`), reset to blank, ran on phone with Expo Go, pushed to github.com/ricardx/pitchside.
- **Next step:** Milestone 1, first task: learn what components/JSX are, then set up tab navigation (Leagues, Games, Profile).

(Update this at the end of every session.)
