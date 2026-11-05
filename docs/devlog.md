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
