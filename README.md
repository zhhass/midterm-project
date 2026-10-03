# Brass & Blade Barbershop – Online Booking Website

**Midterm Project – Web Development (HTML, CSS, Bootstrap)**

## Team
- Bazaraly Ramazan
- Tolegen Zhassulan

## Live site
https://zhhass.github.io/midterm-project/

## Topic
A multi-page responsive website for a barbershop. Visitors can see the services and prices, choose a barber, and send a booking request online. The theme is a classic barbershop: navy, barber-pole red and brass colors, with Oswald (headings) and Source Sans 3 (text) fonts.

## Project structure
```
index.html      Home
services.html   Services & price table
barbers.html    Barbers
booking.html    Booking form
contact.html    Contact info & feedback form
css/style.css   Custom styles
README.md
```

## How the project meets the requirements

### 1. General requirements
- 5 pages: Home, Services, Barbers, Book now, Contact.
- The same Bootstrap navbar is on every page; the current page is highlighted and the menu collapses into a burger button on mobile.
- Semantic HTML5, consistent indentation, comments in CSS.

### 2. HTML (10 pts)
- Headings `h1`–`h3` in correct order, paragraphs, lists (`ul` for opening hours), links, `address` for contacts.
- **Table:** price list on `services.html` (`caption`, `thead`, `tbody`, `th scope`).
- **Forms:** booking form (`booking.html`) with text, tel, select, date, time and textarea; feedback form (`contact.html`). All inputs have `label`s.
- Semantic tags: `header`, `nav`, `main`, `section`, `article`, `address`, `footer`.
- `div` is used for structure and wrappers; `span` for small inline highlights.

### 3. CSS (10 pts)
- Element, class and ID selectors (`#site-header`, `#hero`, `#price-table`, `.barber`, `.feature`).
- CSS variables (`--ink`, `--red`, `--brass`) keep colors consistent.
- **Flexbox:** feature cards and opening hours.
- **Grid:** barber cards (`grid-template-columns: repeat(4, 1fr)`).
- **Positioning:** `position: sticky` header, `position: absolute` for the striped line under the header and the specialty badges on barber cards, `relative` for their parent.

### 4. Responsive design & Bootstrap (15 pts)
- **Media queries:** `max-width: 992px` (tablet: barbers go to 2 columns, smaller hero title) and `max-width: 576px` (mobile: single column, feature cards stack).
- **Bootstrap grid:** `container`, `row`, `col-md-6`, `col-lg-7`, `col-sm-6`, gutters `g-3` / `g-4`.
- **Utilities:** spacing (`py-5`, `mb-3`, `mt-4`), text alignment (`text-center`, `text-md-end`), buttons (`btn`, `btn-lg`, `btn-outline-light`), form controls, `table-responsive`.

### 5. Creativity & presentation (10 pts)
- Barber-pole stripe, brass accents and real barbershop content (services, durations, prices in KZT, opening hours).
- Same colors, fonts and button style on all pages; simple navigation with a clear "Book now" path from every page.

### 6. Code quality & deployment (10 pts)
- One shared stylesheet, no repeated inline styles, clean indentation.
- Published online (link above).

### 7. Functionality (15 pts)
- All pages load and every navigation link works.
- Booking and feedback forms use HTML validation (`required`, input types, time limits). They do not send data to a server, because the course covers only HTML/CSS/Bootstrap.

## How to run locally
Open `index.html` in a browser. An internet connection is needed for Bootstrap and Google Fonts (CDN).
