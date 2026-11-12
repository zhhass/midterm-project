/* Brass & Blade – endterm: vanilla JavaScript (arrays, DOM, events, validation) */

// ===== Data (arrays) =====
const services = [
  { id: 1, name: "Classic haircut", category: "Haircut", duration: 45, price: 7000 },
  { id: 2, name: "Fade and design", category: "Haircut", duration: 60, price: 9000 },
  { id: 3, name: "Kids haircut", category: "Haircut", duration: 30, price: 4500 },
  { id: 4, name: "Beard trim", category: "Beard", duration: 30, price: 5000 },
  { id: 5, name: "Hot towel shave", category: "Beard", duration: 40, price: 6500 },
  { id: 6, name: "Haircut + beard combo", category: "Combo", duration: 75, price: 11500 }
];
const barbers = [
  { name: "Aidar", specialty: "Fades", bio: "8 years behind the chair. Loves classic cuts and clean tapers." },
  { name: "Timur", specialty: "Beards", bio: "Beard specialist. Straight-razor shaves done the old way." },
  { name: "Dana", specialty: "Scissor cuts", bio: "Precise scissor work and modern textured styles." },
  { name: "Arman", specialty: "Kids", bio: "Fast, friendly, great with kids and first-timers." }
];
let favorites = [];   // ids of favorite services

// ===== Reusable functions =====
function formatPrice(amount) { return amount.toLocaleString("en-US") + " KZT"; }

function findService(id) { return services.find(s => s.id === Number(id)); }   // returns object

function filterServices(list, text, category) {                                // returns array
  const result = [];
  for (const s of list) {
    const matchText = s.name.toLowerCase().includes(text.toLowerCase());
    const matchCat = category === "All" || s.category === category;
    if (matchText && matchCat) result.push(s);
  }
  return result;
}

function validateRequired(value, label, minLength = 1) {                       // returns error message or ""
  const v = value.trim();
  if (!v) return label + " is required.";
  if (v.length < minLength) return label + " must be at least " + minLength + " characters.";
  return "";
}

function setFieldState(input, message) {                                       // shows/hides error under the field
  const box = input.parentElement.querySelector(".invalid-feedback");
  input.classList.toggle("is-invalid", message !== "");
  input.classList.toggle("is-valid", message === "");
  if (box) box.textContent = message;
  return message === "";
}

function showToast(text) {                                                     // adds then removes a DOM element
  const t = document.createElement("div");
  t.className = "toast-note";
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

// ===== Services page: render, search, filter, favorites =====
function renderServices(list) {
  const box = document.getElementById("service-list");
  box.innerHTML = "";
  if (list.length === 0) { box.innerHTML = '<p class="text-muted">No services match your search.</p>'; return; }
  list.forEach(s => {
    const card = document.createElement("article");
    card.className = "service-card";
    const isFav = favorites.includes(s.id);
    card.innerHTML = '<h3 class="h5">' + s.name + '</h3><p class="mb-1">' + s.category + ' &middot; ' + s.duration +
      ' min</p><p class="price">' + formatPrice(s.price) + '</p>' +
      '<button type="button" class="btn btn-sm ' + (isFav ? "btn-brass" : "btn-outline-secondary") +
      ' fav-btn" data-id="' + s.id + '">' + (isFav ? "&#9733; Saved" : "&#9734; Save") + '</button>';
    box.appendChild(card);
  });
}

function renderFavorites() {
  const ul = document.getElementById("fav-list");
  ul.innerHTML = "";
  favorites.forEach(id => {
    const s = findService(id);
    const li = document.createElement("li");
    li.innerHTML = '<span>' + s.name + ' (' + formatPrice(s.price) + ')</span>';
    const rm = document.createElement("button");
    rm.type = "button"; rm.className = "btn-close"; rm.setAttribute("aria-label", "Remove " + s.name);
    rm.addEventListener("click", () => { toggleFavorite(id); li.remove(); });
    li.appendChild(rm);
    ul.appendChild(li);
  });
  document.getElementById("fav-count").textContent = favorites.length;
  document.getElementById("fav-total").textContent = formatPrice(favorites.reduce((sum, id) => sum + findService(id).price, 0));
  document.getElementById("fav-empty").hidden = favorites.length > 0;
}

function toggleFavorite(id) {
  favorites = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
  try { localStorage.setItem("favs", JSON.stringify(favorites)); } catch (e) { /* storage unavailable */ }
  updateServices();
  renderFavorites();
}

function updateServices() {
  const text = document.getElementById("search").value;
  const cat = document.getElementById("category").value;
  renderServices(filterServices(services, text, cat));
}

function initServices() {
  try { favorites = JSON.parse(localStorage.getItem("favs")) || []; } catch (e) { favorites = []; }
  document.getElementById("search").addEventListener("input", updateServices);
  document.getElementById("category").addEventListener("change", updateServices);
  document.getElementById("search").addEventListener("keydown", e => {
    if (e.key === "Escape") { e.target.value = ""; updateServices(); }
  });
  document.getElementById("service-list").addEventListener("click", e => {
    const btn = e.target.closest(".fav-btn");
    if (btn) { toggleFavorite(Number(btn.dataset.id)); showToast("Favorites updated"); }
  });
  updateServices();
  renderFavorites();
}

// ===== Barbers page =====
function initBarbers() {
  const grid = document.getElementById("barber-grid");
  barbers.forEach(b => {
    const card = document.createElement("article");
    card.className = "barber";
    card.innerHTML = '<div class="avatar" aria-hidden="true">' + b.name[0] + '</div><span class="badge-spec">' + b.specialty +
      '</span><h3>' + b.name + '</h3><p class="bio">' + b.bio + '</p><p class="small text-muted mb-0">Click to read more</p>';
    grid.appendChild(card);
  });
}

// ===== Booking form =====
function validateBooking(form) {
  const f = form.elements;
  let ok = true;
  ok = setFieldState(f.name, validateRequired(f.name.value, "Name", 2) || (/^[\p{L}\s'-]+$/u.test(f.name.value.trim()) ? "" : "Name can contain letters only.")) && ok;
  ok = setFieldState(f.phone, /^\+?[0-9\s()-]{10,15}$/.test(f.phone.value.trim()) ? "" : "Enter a valid phone, e.g. +7 700 000 00 00.") && ok;
  ok = setFieldState(f.service, f.service.value ? "" : "Please choose a service.") && ok;
  let dateMsg = validateRequired(f.date.value, "Date");
  if (!dateMsg) {
    const d = new Date(f.date.value + "T00:00:00"), today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d < today) dateMsg = "Date cannot be in the past.";
    else if (d.getDay() === 0) dateMsg = "We are closed on Sundays.";
  }
  ok = setFieldState(f.date, dateMsg) && ok;
  const t = f.time.value;
  ok = setFieldState(f.time, !t ? "Time is required." : (t < "10:00" || t > "20:00" ? "Choose a time between 10:00 and 20:00." : "")) && ok;
  return ok;
}

function initBooking() {
  const form = document.getElementById("booking-form");
  const fill = (select, items, first) => {
    select.innerHTML = '<option value="">' + first + '</option>';
    items.forEach(i => select.add(new Option(i.label, i.value)));
  };
  fill(form.service, services.map(s => ({ label: s.name, value: s.id })), "Choose a service...");
  fill(form.barber, barbers.map(b => ({ label: b.name, value: b.name })), "Any barber");
  form.date.min = new Date().toISOString().split("T")[0];

  form.service.addEventListener("change", () => {
    const s = findService(form.service.value);
    document.getElementById("price-summary").textContent = s ? s.name + ": " + formatPrice(s.price) + ", about " + s.duration + " min" : "";
  });
  form.addEventListener("input", e => { if (e.target.classList.contains("is-invalid")) validateBooking(form); });
  form.addEventListener("submit", e => {
    e.preventDefault();                                   // stop real submission
    const ok = validateBooking(form);
    const box = document.getElementById("booking-success");
    box.hidden = true;
    if (ok) submitBooking(form, box);   // async: API call + saving (final.js)
  });
}

// ===== Contact form =====
function initContact() {
  const form = document.getElementById("feedback-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const f = form.elements;
    let ok = setFieldState(f.fname, validateRequired(f.fname.value, "Name", 2));
    ok = setFieldState(f.email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim()) ? "" : "Enter a valid email address.") && ok;
    ok = setFieldState(f.msg, validateRequired(f.msg.value, "Message", 10)) && ok;
    document.getElementById("contact-success").hidden = !ok;
    if (ok) form.reset();
  });
}

// ===== Theme switcher (all pages) =====
function applyTheme(dark) {
  document.body.classList.toggle("dark-mode", dark);
  document.getElementById("theme-toggle").textContent = dark ? "Light mode" : "Dark mode";
  try { localStorage.setItem("dark", dark ? "1" : "0"); } catch (e) { /* ignore */ }
}

document.addEventListener("DOMContentLoaded", () => {
  let dark = false;
  try { dark = localStorage.getItem("dark") === "1"; } catch (e) { /* ignore */ }
  applyTheme(dark);
  document.getElementById("theme-toggle").addEventListener("click", () => applyTheme(!document.body.classList.contains("dark-mode")));
  if (document.getElementById("service-list")) initServices();
  if (document.getElementById("barber-grid")) initBarbers();
  if (document.getElementById("booking-form")) initBooking();
  if (document.getElementById("feedback-form")) initContact();
});
