# Pitchside devlog

One entry per session: what I built, what I learned, what's next.

---
## 2026-11-05 — Milestone 0: Setup
- Built: created the Pitchside Expo project (TypeScript + Expo Router), reset it to a blank app, ran it on my phone with Expo Go, pushed it to GitHub.
- Learned: every file in src/app/ is a screen; package.json lists dependencies and node_modules is rebuilt with npm install; git status/add/commit/push.
- Next: Milestone 1, tab navigation with Leagues, Games and Profile screens.
## 2026-11-05 (part 2) — Milestone 1: tabs + fake data
- Built: bottom tab navigation (Games, Leagues, Profile) and src/data/fakeData.ts with a Game type and 3 fake games.
- Learned: _layout.tsx decides how screens show and every screen must be declared with Tabs.Screen; props and the {{ }} syntax; TypeScript types and union types; why ids must be unique; why prices are stored in cents and times in UTC.
- Debugging: read an Expo error as "what broke → which thing → suggested fix".
- Next: export the Game type, then show the games as a list on the Games screen (.map() and key).
## 2026-11-07 — Milestone 1: games list
- Built: Games screen lists the fake games; formatDate (UTC → local time) and formatPrice (cents → "Free"/"$10.00") helpers; refactored each game into a reusable GameCard component.
- Learned: .map() turns an array into JSX; key must be unique and goes where .map() is; export vs export default; === over ==; writing my own props with a type; naming things for what they are; a refactor changes structure, not behaviour.
- Next: tap a GameCard to open the Game detail screen (stack inside tabs, dynamic route game/[id].tsx).
## 2026-11-08 — Milestone 1: game detail
- Built: root Stack wrapping the tabs ((tabs) route group); tappable GameCard (Link + Pressable); dynamic route game/[id].tsx that finds the game by id and lists its confirmed players; Player and Signup types with fake data.
- Learned: dynamic routes ([id]) and route groups ((tabs)); the card sends the id, the screen reads it with useLocalSearchParams; hooks only go inside components; .map vs .find vs .filter; handling undefined with an early return and ?.; why signups are a separate join table (data belongs to "this player in this game").
- Git: git detects moved files as renames once staged.
- Next: waitlist (sorted by signup time) and "spots left" on game detail, then sign up / drop buttons with useState.
## 2026-11-10 — Milestone 1: spots left + waitlist
- Built: "X spots left" (capacity − confirmed) and a waitlist sorted by signup time with positions ("1. Olivia") on game detail.
- Learned: .length is a property, not a method; .sort() with a compare function and getTime(); .sort() changes the array it's called on, so sort a filtered copy; map's index; test a sort by swapping data; name variables for what they hold.
- Next: sign up / drop buttons with useState.
## 2026-11-12 — Milestone 1: state + sign up
- Built: signups now live in useState; a Sign up button adds me as confirmed (spots open) or waitlisted (full), and hides once I'm signed up.
- Learned: state = data a component remembers, change it with the setter and React redraws; never change state directly, copy it with [...arr, x]; onPress takes a function without (); event handlers aren't hooks so they can go after the early return; typing an object (: Signup) so status stays a valid value; read TS errors bottom-up; conditional rendering with &&.
- Insight: state resets when you leave the screen, which is why we need a database.
- Next: Drop button ({ ...s, status: "dropped" }) and auto-promoting the first waitlisted player.

