# Site content

Content reference for the portfolio. Facts (dates, roles, links, stacks) come
from the previous live site; the prose does not.

**The site now renders from `lib/site.ts`, not from this file.** This stays as
the plain-language record of what the site says and what is still missing —
change copy in `lib/site.ts`, then reflect it here.

Items marked **TODO** need your words.

---

## 1. Identity

| Field    | Value                        |
| -------- | ---------------------------- |
| Name     | Tim Hrovat                   |
| Title    | Full Stack Developer         |
| Location | Ljubljana, Slovenia          |
| Portrait | `public/images/portrait.png` |

**Page title:** Tim Hrovat — Full Stack Developer

**Meta description:** Portfolio of Tim Hrovat, a full stack developer and
student at FRI UNI Ljubljana, building efficient and scalable solutions.

---

## 2. Navigation

Built — a floating translucent bar with About / Stack / Work / Projects and a
`Get in touch` button. The active section highlights as you scroll.

Education sits inside the Work section rather than getting its own nav entry,
which keeps the bar to four items.

---

## 3. Hero

Built (`components/sections/hero.tsx`):

- Mono eyebrow: Full Stack Developer · Ljubljana, Slovenia
- H1: Tim Hrovat (display serif, name set large)
- Lead: "I build the parts people actually touch"
- Buttons: Get in touch · Download CV, plus an availability dot
- A warm light tracks the cursor behind the name

---

## 4. About me

Built (`components/sections/about.tsx`). Current copy:

> Hi, I'm Tim
>
> a passionate software developer and dedicated student at
> **[FRI UNI Ljubljana](https://fri.uni-lj.si/sl/studijski-program/racunalnistvo-informatika-0)**.
> With a strong foundation in coding and a professional edge, I thrive on
> solving complex problems and crafting efficient, scalable solutions. Whether
> it's building innovative applications or exploring the latest in tech, I'm
> always driven by curiosity and a desire to make an impact.
>
> **Let's build something amazing together!**

---

## 5. Education

Built **into the timeline only**. The separate logo cards were removed — they
repeated what the School band already says.

- **FRI UNI Ljubljana** — 2023 – present. Computer Science. Currently finishing
  the bachelor's degree; the thesis is the only remaining requirement.
  <https://fri.uni-lj.si/sl>
- **Vegova Ljubljana** — 2019 – 2023, software engineering programme.
  <https://www.vegova.si/>

**Assumption to confirm:** the timeline places these on the Slovenian academic
year (October start, June end) because only the years were given. The labels
show years only, so this affects bar position by a month or two and nothing
else. `start`/`end` in `lib/site.ts`.

**TODO:** the exact wording you want for the degree title.

---

## 6. Skills & technologies

### 6a. Grouped summary — compact list

- Web languages (HTML, CSS, JS)
- ReactJS, VueJS, NestJS
- PHP, Laravel, CodeIgniter
- Relational & NoSQL databases
- WordPress
- C, C++
- Java
- Embedded systems

### 6b. Badge grid — built, 22 items, all icons in `public/images/technology-icons/`

Tailwind CSS · HTML · CSS · JavaScript · TypeScript · VueJS · ReactJS · Nuxt ·
NestJS · NextJS · C · C++ · Java · PHP · Laravel · WordPress · Embedded Systems ·
MariaDB · MongoDB · MySQL · Postgres · Prisma ORM

**Gap between the two lists:** CodeIgniter appears only in the grouped list and
has no badge.

**TODO:** decide whether to add badges for CodeIgniter, Git and Docker.
Devicon has all three — add an entry to `scripts/sync-technology-icons.mjs`
and run `pnpm icons:sync`.

---

## 7. Work experience

Five roles plus a one-week internship, built as a **timeline**
(`components/timeline.tsx`): every role, both schools and the certificate as
bars on one shared axis, so the overlaps are visible. Hovering a row on desktop
shows a popover at the cursor; tapping one on mobile opens a drawer.

**Descriptions are now written** and live in `lib/site.ts` as `description` on
each role. They were drafted from what is known about each job and **need your
sign-off** — especially eŠola, Simpliservers and P&P InterSearch, where the
specifics are inferred rather than told to me.

### Engineering

1. **Software Developer — eŠola d.o.o. (eAsistent)** · Dec 2022 – present ·
   <https://www.easistent.com/stran/>
2. **Software Development Intern — Phosphorland** · May 2022 – Jun 2022 ·
   <https://www.phosphorland.pt/>
3. **Engineering Intern — Hella Saturnus Slovenia** · one week ·
   <https://www.hella.com/hella-si/sl/HELLA-Saturnus-Slovenija-61.html>
   Quality-checking system for car headlight assembly.
   **DATE UNCONFIRMED** — placed at Aug 2021 because that is when you were
   otherwise at Hella. Correct `start`/`end` in `lib/site.ts` if it was
   another year; a one-week bar is a dot either way, but the year is a factual
   claim.

### Other work

4. **Assistant & Community Support — Simpliservers** · Jan 2022 – Jul 2022 ·
   <https://simpliservers.com/> (site is gone; the row falls back to initials)
5. **Data Analyst — P&P InterSearch Slovenia** · Jun 2019 – Sep 2019 ·
   <https://www.pp-intersearch.si/>
6. **Online Store Admin & Digital Print Operator — Printboutiq** ·
   Apr 2017 – Mar 2022 · <https://www.printboutiq.com/>

**Removed on request:** Hella Saturnus _maintenance worker_ (Aug–Sep 2021) and
Emona Plus d.o.o. (Feb 2018 – Jan 2023). Kept here only as a record.

**Design note:** several of these overlap in time, and most run alongside
school. That is the whole reason the section is a timeline — it is the one
layout where the overlap is information rather than a problem to hide.

### Certifications

- **CCNA: Introduction to Networks** — Cisco, issued May 2023. On the timeline
  as a diamond marker rather than a bar.

### CV

Download button: `Download my CV` → `/documents/Tim_Hrovat_CV.pdf`

**TODO:** the PDF is not in this repo. Copy it to `public/documents/` (currently
live at <https://timhrovat.com/documents/Tim_Hrovat_CV.pdf>) and check it is
up to date.

---

## 8. Projects

Built, as four cards. No index numbers and no "Coursework"/"Internship" labels
— both were removed as noise.

1. **Phosphorland** — React · Firebase · i18next ·
   <https://github.com/TimHrovat/phosphorland-website> ·
   live at <https://www.phosphorland.pt/>
2. **Save the Animals** — C++ · SDL2 ·
   <https://github.com/TimHrovat/sdl-game>
3. **Wordle Engine** — Java ·
   <https://github.com/TimHrovat/wordle-engine>
4. **Image Editor** — JavaScript · Canvas ·
   <https://github.com/TimHrovat/image-editor>

Summaries are written and live in `lib/site.ts`. **They need your sign-off** —
3 and 4 were described from reading the repositories, not from your account of
them.

**UpLearn is not here.** There is no public `uplearn` repository under
`TimHrovat`, and the account belongs to no organisations, so it is either
private or under another account. Send me the link (or the stack and a
sentence) and I will add it.

**Skipped deliberately:** `fri-uni` is a notes dump, `portfolio-website` is the
old site, `neovim-config` is dotfiles, `vegova` is school work. Say the word if
you want any of them in.

**Still open:** no screenshots or thumbnails for any project — the cards are
designed to work without them, so this is optional.

---

## 9. Links & contact

| Channel  | Handle                 | URL                                                 |
| -------- | ---------------------- | --------------------------------------------------- |
| LinkedIn | @tim-hrovat            | <https://www.linkedin.com/in/tim-hrovat-4255b61a6/> |
| GitHub   | @TimHrovat             | <https://github.com/TimHrovat>                      |
| E-mail   | tim.hrovat16@gmail.com | `mailto:tim.hrovat16@gmail.com`                     |
| Discord  | timhrovat              | —                                                   |

**TODO:** confirm `tim.hrovat16@gmail.com` is still the address you want public.

---

## 10. Gap summary

Every section is built. What remains is content, not design:

1. **Job descriptions** (§7) — five roles, none written. The eŠola one matters
   most.
2. **The CV PDF** (§7) — the button links to `/documents/Tim_Hrovat_CV.pdf`,
   which is not in the repo yet.
3. **Project descriptions** (§8) — placeholder prose is in `lib/site.ts` and
   needs your sign-off.
4. **Project screenshots** (§8) — the cards are designed to work without them,
   so this is optional.
5. **Confirm the public email** (§9).
