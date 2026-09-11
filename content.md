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

Built, as two cards at the end of the Work section.

- **FRI UNI Ljubljana** — Computer Science. Currently finishing the bachelor's
  degree; the thesis is the only remaining requirement.
  <https://fri.uni-lj.si/sl>
- **Vegova Ljubljana** — 4 years, software engineering programme.
  <https://www.vegova.si/>

**TODO:** years attended for each, and the exact wording you want for the
degree title.

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

Seven roles. Built as an index list: the three engineering roles get full rows,
the other four are collapsed into a compact "Before engineering" grid — which is
how the overlapping dates are handled.

Dates, titles and companies are confirmed. **Descriptions are all still TODO**
— none have ever been written. The row design reads as complete without one, so
adding a `description` to any role in `lib/site.ts` is optional and safe.

### 1. Software Developer — eŠola d.o.o. (eAsistent)

6 Dec 2022 – present · <https://www.easistent.com/stran/>
**TODO:** description. This is the headline role — it deserves 2–3 sentences on
what you build, the stack, and the scale of the product.

### 2. Software development intern — Phosphorland

30 May 2022 – 24 Jun 2022 · <https://www.phosphorland.pt/>
**TODO:** description. Ties directly to the Phosphorland website project below.

### 3. Assistant & Community support — Simpliservers

1 Jan 2022 – 6 Jul 2022 · <https://simpliservers.com/>
**TODO:** description.

### 4. Maintenance worker — Hella Saturnus Slovenia d.o.o.

1 Aug 2021 – 1 Sep 2021 ·
<https://www.hella.com/hella-si/sl/HELLA-Saturnus-Slovenija-61.html>
**TODO:** description, or consider cutting — a one-month non-technical summer
job may not earn its space.

### 5. Data analyst — P&P InterSearch Slovenia

1 Jun 2019 – 1 Sep 2019 · <https://www.pp-intersearch.si/>
**TODO:** description.

### 6. Cost analyst & Documentation editor — Emona Plus d.o.o.

1 Feb 2018 – 1 Jan 2023 · <https://www.emonaplus.si/>
**TODO:** description. Ran ~5 years, overlapping several other roles —
presumably part-time. Worth labelling as such so the timeline reads correctly.

### 7. Online store administrator & Digital print operator — Printboutiq

1 Apr 2017 – 1 Mar 2022 · <https://www.printboutiq.com/>
**TODO:** description. Also long-running and overlapping.

**Design note:** four of these overlap in time, which is why the non-engineering
roles are a separate grid rather than points on one timeline.

### CV

Download button: `Download my CV` → `/documents/Tim_Hrovat_CV.pdf`

**TODO:** the PDF is not in this repo. Copy it to `public/documents/` (currently
live at <https://timhrovat.com/documents/Tim_Hrovat_CV.pdf>) and check it is
up to date.

---

## 8. Projects

Built, as two cards.

### Phosphorland website

React · Firebase (auth, file storage, realtime database) · i18next
Source: <https://github.com/TimHrovat/phosphorland-website>
Live site: <https://www.phosphorland.pt/>
**TODO:** one-line description of what the site actually does.

### Save the Animals

C++ · SDL2
Source: <https://github.com/TimHrovat/sdl-game>
**TODO:** one-line description of the game.

**TODO:**

- No screenshots or thumbnails exist for either — a project card grid will look
  empty without them.
- Both are old and student-level. Anything newer worth showing (work at eŠola,
  side projects, this portfolio itself)?

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

1. **Job descriptions** (§7) — seven roles, none written. The eŠola one matters
   most.
2. **The CV PDF** (§7) — the button links to `/documents/Tim_Hrovat_CV.pdf`,
   which is not in the repo yet.
3. **Project descriptions** (§8) — placeholder prose is in `lib/site.ts` and
   needs your sign-off.
4. **Education years** (§5).
5. **Project screenshots** (§8) — the cards are designed to work without them,
   so this is optional.
6. **Confirm the public email** (§9).
