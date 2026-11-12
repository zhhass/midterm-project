# Brass & Blade Barbershop – Online Booking Website

**Final Project – Web Development (HTML, CSS, Bootstrap, JavaScript, jQuery, OOP, API, localStorage)**

## Team
- Bazaraly Ramazan
- Tolegen Zhassulan

## Links

- **Live site:** _add your GitHub Pages / Netlify link here_
- **GitHub repository:** _https://github.com/zhhass/midterm-project.git_

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
js/app.js       JavaScript (data arrays, DOM, events, validation)
js/jq.js        jQuery (traversal, events, effects)
js/models.js    OOP classes + localStorage persistence (final)
js/api.js       API client, fetch + async/await (final)
js/final.js     Final features: booking flow, My bookings, weather (final)
mybookings.html My bookings page (final)
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

---

# Endterm update (JavaScript & jQuery)

The endterm extends the same barbershop site. The 5 pages, navigation, Bootstrap layout and midterm CSS are unchanged.

## New features
| Feature | Page | File |
|---|---|---|
| Services rendered from an array, **search** and **category filter** | Services | `app.js` |
| **Favorites list** with total price (add/remove DOM items, saved in localStorage) | Services | `app.js` |
| Barber cards generated from an array | Barbers | `app.js` |
| **Booking form validation** with messages under each field and a success message | Book now | `app.js` |
| Service/barber dropdowns filled from arrays, live price summary | Book now | `app.js` |
| **Contact form validation** (name, email format, message length) | Contact | `app.js` |
| **Dark/light theme switcher** (on every page, remembered) | All | `app.js` |
| jQuery: slide toggle on feature cards, barber bio accordion, table row highlight, character counter, back-to-top button | All | `jq.js` |

## Requirement checklist
- **Arrays:** `services`, `barbers`, `favorites`. **Loops:** `for...of` in `filterServices`, `forEach` for rendering cards, favorites and dropdowns.
- **Functions:** `formatPrice`, `findService` (returns object), `filterServices` (returns array), `validateRequired` (returns message), `setFieldState`, `showToast` and others.
- **DOM:** `createElement`/`appendChild`, `innerHTML`, `classList.toggle`, `textContent`, `hidden`; elements are added and removed (favorites items, toast).
- **Events:** `addEventListener` with `click`, `input`, `change`, `submit`, `keydown` (Escape clears search), `DOMContentLoaded`; `preventDefault()` on form submit.
- **Validation:** custom rules (`novalidate`), messages next to fields, no submission while errors remain, success alert.
- **jQuery:** selectors by ID (`#msg`), class (`.feature h3`), attribute (`a[href^="tel:"]`), descendant (`#price-table tbody tr`); traversal `next()`, `closest()`, `siblings()`, `find()`; events `click`, `input`, `scroll`; effects `slideToggle`, `slideUp`, `fadeIn`/`fadeOut`, `animate`.

## How to test
1. **Services:** type "beard" in search, change the category, press Esc in the search box. Click "Save" on a few cards; see the favorites list and total. Remove an item with the ✕ button. Click a table row to highlight it.
2. **Barbers:** click a card to open the bio; click another and the first one closes.
3. **Book now:** press "Request booking" with empty fields to see errors; try a past date or a Sunday; choose a service to see the price; fill everything correctly to see the success message.
4. **Contact:** type fewer than 10 characters in the message and send; enter an invalid email; watch the counter.
5. **Home:** click a feature title to collapse it. Scroll down and use the ↑ button.
6. Use the Dark mode button in the navbar on any page.

---

# Final project update (OOP, API, persistence)

All midterm and endterm features still work. The final stage adds a sixth page and a real booking flow.

## New features
1. **My bookings page** (`mybookings.html`): list of saved bookings with status filter (All / Active / Cancelled), cancel, delete, clear all, total price of active bookings. A badge with the number of active bookings is shown in the navbar on every page.
2. **Booking flow:** after validation, the booking is sent to an API, saved in localStorage, and shown with a reference number. The form blocks a time slot already taken with the same barber (conflict check).
3. **Weather widget** on the home page (API) with a haircut tip that depends on the temperature.
4. **Error handling:** if the server is unreachable, the booking is still saved locally with a `LOCAL-` reference and the user sees a warning instead of a broken page.

## OOP architecture (`js/models.js`)
- `Storage` (static methods): safe `load` / `save` for localStorage.
- `BaseModel`: base class with `toJSON()`.
- `Booking extends BaseModel`: fields, getters (`service`, `price`, `isActive`), method `cancel()`, `toString()`.
- `BookingManager`: private fields `#items` and `#key` (encapsulation), methods `add`, `cancel`, `remove`, `clear`, `list`, `isTaken`, getters `count` and `totalActive`.
- `ApiClient` (`js/api.js`): static async methods `getWeather()` and `sendBooking()`.

## API information
| API | Method | Used for | Key |
|---|---|---|---|
| [Open-Meteo](https://open-meteo.com/) `api.open-meteo.com/v1/forecast` | GET | Current temperature and wind in Astana | not required |
| [JSONPlaceholder](https://jsonplaceholder.typicode.com/) `/posts` | POST | Test server that receives the booking and returns an id, which becomes the booking reference | not required |

Requests use `fetch` with `async/await`, `response.ok` checks and `try/catch/finally`.

## Data persistence (localStorage)
| Key | Content |
|---|---|
| `bookings` | All bookings (array of `Booking` objects) |
| `favs` | Favorite services |
| `dark` | Selected theme |

## How to test the final features
1. Open **Book now**, fill the form and submit. You should see "Sending...", then a success message with a reference like `BB-101-1234`.
2. Open **My bookings**: the booking is there. Try Cancel, the filter, Delete and Clear all. Refresh the page to check that data is saved.
3. Book the same date, time and barber twice: the second attempt shows a "time is already booked" error.
4. Turn off the internet and book again: a warning appears and the booking is saved with a `LOCAL-` reference.
5. Open **Home**: the weather card loads from the API.

## Group contribution
_Edit this table before submitting._

| Member | Contribution |
|---|---|
| Tolegen Zhassulan | _e.g. HTML/CSS, pages, Bootstrap, README_ |
| Bazaraly Ramazan | _e.g. JavaScript, jQuery, OOP, API, deployment_ |
