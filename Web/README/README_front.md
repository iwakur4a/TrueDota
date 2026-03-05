# TrueDota_FrontEnd
This section describes the web part of the True Dota project—a static website guide to the Dota 2 meta (patch 7.40c), as well as how the frontend is deployed on hosting and interacts with the backend and third-party services.

1. General Frontend Concept

The True Dota frontend is a website built using pure JavaScript:

HTML5—markup for all site sections;

CSS3—custom UI kit (cards, grids, typography, responsive);

JavaScript (script.js)—interactive components, filters, windows, form management.

Key tasks of the frontend:

render the 7.40c meta (heroes, builds, tier list) beautifully and conveniently;

provide the user with interactive tools: a draft helper, a mini-forum, and voting for heroes/builds;

Implement registration and profiles through a user-friendly form;

Integrate Twitch and YouTube streams into the overall design;

Serve as a lightweight static website that can be easily deployed on any hosting.

## Structure

Basic structure:

/
├── index.html # Main HTML (interface)
├── styles.css # All styles (layout, components)
├── script.js # Client-side logic and integrations
└── images/ # Images (heroes, meta, builds, icons)

2.1. index.html

Contains the full UI framework:

Sidebar (<aside class="td-sidebar">)

Logo (TD), True Dota project name, meta & community subheading.

Section navigation (Home, Meta, Patch History, Builds, Top Heroes, Tier List, Draft Helper, Live Stream, Discussions, Registration, Profile, About).

Blocks with the current patch and role trends.

Compact user widget ("Guest" / status), "Login / Register" button.

Topbar (<header class="td-topbar">)

Title and subtitle (Meta and Discussion Guide (7.40c)).

Search bar for heroes/builds/topics (JS logic is planned).

Main Sections (<section id="section-...">)

section-home — hero block, CTA ("View Meta," "Go to Discussions"), statuses (number of topics, builds, and heroes).

section-meta — role grid: Carry, Mid, Offlane, Support (cards with images and a list of heroes/traits).

section-patches — patch timeline, populated via JS.

section-builds — build grid with filters by role, style, duration, and difficulty.

section-heroes — top heroes with descriptions and voting.

section-tierlist — drag & drop tier list (S/A/B/C).

section-draft — draft helper (my pick vs. enemies, draft tips).

section-stream — Twitch + YouTube iframes.

section-discussions — list of topics, tag filter, mini-forum.

section-register — registration form.

section-profile — profile display.

section-about — brief description of the project.

Modal Windows

#newThreadModal — Create a new thread (title, tag, text).

#heroDetailsModal — Detailed hero information (strengths/weaknesses, synergies, counters, example build).

2.2. styles.css

Description of the design system and general rules:

Layout:

Two-column structure: fixed sidebar + main content;

Components:

.td-card, .td-btn, .td-chip, .td-tag, .td-list, .td-modal, .td-form, etc.;

Meta and build cards, hero and tier list grids.

Colors and typography:

Dark theme, accent colors for tags and buttons;

Consistent style for headings and text (H1–H4, body, captions).

Animations and hover effects:

Smooth block reveal (td-reveal),

Hover on cards and buttons,

Visual cues for drag & drop zones.

2.3. script.js

Responsible for interactivity:

Navigation (highlighting the active sidebar item when scrolling);

Mobile menu (opening/closing the sidebar);

Counters (statThreadsCount, statBuildsCount, statHeroesCount);

Filling the "Hero of the Day" block (heroOfDayCard);

Build filters (by role, style, duration, difficulty);

Voting for builds and heroes (👍 buttons and counter updates);

Tier list initialization (drag & drop);

Draft helper (adding heroes to "My Team" / "Enemies," hints);

Working with modals:

Opening/closing the topic creation window;

Opening a hero modal with detailed data;

Processing the registration form:

Collecting data from #registerForm;

Sending a request to the backend;

Displaying the status (#registerStatus);

Updating the profile UI (nickname, email, rank, role, about).

## How it works

The frontend is designed so that the backend can easily be replaced (Supabase, another PHP server, Node, etc.), as all communication logic is implemented in JavaScript.

Main integration points:

Registration
The #registerForm form sends data (nickname, email, password, rank, role, about) to the endpoint specified in script.js. A JSON response with the registration result is expected.

Profile
After successful registration, the frontend:

displays the nickname/email in the Profile section,

updates the widget