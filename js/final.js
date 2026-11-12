/* Brass & Blade – final project: new features using the classes and the API */

// ===== Booking: conflict check + API + persistence =====
async function submitBooking(form, box) {
  const f = form.elements;
  const btn = form.querySelector('button[type="submit"]');
  if (bookingManager.isTaken(f.date.value, f.time.value, f.barber.value)) {
    setFieldState(f.time, "This time is already booked with that barber. Choose another time.");
    return;
  }
  const booking = new Booking({
    id: Date.now(), name: f.name.value.trim(), phone: f.phone.value.trim(),
    serviceId: f.service.value, barber: f.barber.value, date: f.date.value, time: f.time.value
  });
  btn.disabled = true;
  btn.textContent = "Sending...";
  try {
    booking.ref = await ApiClient.sendBooking(booking);            // wait for server answer
    box.className = "alert alert-success";
    box.textContent = "Thank you, " + booking.name + "! Booking " + booking.ref + " for " + booking + " is saved. See it in My bookings.";
  } catch (error) {
    booking.ref = "LOCAL-" + String(booking.id).slice(-4);          // server unreachable: keep it locally
    box.className = "alert alert-warning";
    box.textContent = "Server is not reachable, but your booking " + booking.ref + " is saved on this device.";
  } finally {
    btn.disabled = false;
    btn.textContent = "Request booking";
  }
  bookingManager.add(booking);
  box.hidden = false;
  updateBadge();
  form.reset();
  document.getElementById("price-summary").textContent = "";
  form.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
}

function updateBadge() {
  const badge = document.getElementById("booking-badge");
  if (badge) badge.textContent = bookingManager.count;
}

// ===== My bookings page =====
let currentStatus = "all";

function renderBookings() {
  const body = document.getElementById("bookings-body");
  const list = bookingManager.list(currentStatus);
  body.innerHTML = "";
  list.forEach(b => {
    const tr = document.createElement("tr");
    tr.innerHTML = "<td>" + b.ref + "</td><td>" + b.date + "</td><td>" + b.time + "</td><td>" + (b.service ? b.service.name : "") +
      "</td><td>" + (b.barber || "Any") + "</td><td>" + formatPrice(b.price) + '</td><td><span class="badge ' +
      (b.isActive ? "bg-success" : "bg-secondary") + '">' + b.status + "</span></td>" +
      '<td class="text-nowrap">' + (b.isActive ? '<button class="btn btn-sm btn-outline-warning" data-action="cancel" data-id="' + b.id + '">Cancel</button> ' : "") +
      '<button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="' + b.id + '">Delete</button></td>';
    body.appendChild(tr);
  });
  document.getElementById("bookings-empty").hidden = list.length > 0;
  document.getElementById("bookings-table").hidden = list.length === 0;
  document.getElementById("bookings-stats").textContent =
    "Active bookings: " + bookingManager.count + " | Total: " + formatPrice(bookingManager.totalActive);
  updateBadge();
}

function initBookingsPage() {
  document.getElementById("bookings-body").addEventListener("click", e => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    if (btn.dataset.action === "cancel") bookingManager.cancel(id);
    else if (confirm("Delete this booking?")) bookingManager.remove(id);
    renderBookings();
  });
  document.getElementById("status-filter").addEventListener("click", e => {
    const btn = e.target.closest("button[data-status]");
    if (!btn) return;
    currentStatus = btn.dataset.status;
    document.querySelectorAll("#status-filter button").forEach(b => b.classList.toggle("active", b === btn));
    renderBookings();
  });
  document.getElementById("clear-all").addEventListener("click", () => {
    if (confirm("Remove all bookings?")) { bookingManager.clear(); renderBookings(); }
  });
  renderBookings();
}

// ===== Home page: weather widget (API) =====
function weatherTip(temp) {
  if (temp <= -10) return "Very cold: a hat is a must, and a fresh cut keeps your neck warm under a scarf.";
  if (temp <= 5) return "Chilly day. Perfect time for a hot towel shave.";
  if (temp <= 22) return "Nice weather for a fresh fade.";
  return "Hot outside. Ask for a shorter cut to stay cool.";
}

async function initWeather() {
  const box = document.getElementById("weather");
  try {
    const w = await ApiClient.getWeather();
    box.innerHTML = '<p class="display-6 mb-1">' + Math.round(w.temperature_2m) + "&deg;C</p><p class=\"mb-1\">Wind " +
      w.wind_speed_10m + " km/h</p><p class=\"mb-0\">" + weatherTip(w.temperature_2m) + "</p>";
  } catch (error) {
    box.textContent = "Weather is not available right now. Please try again later.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateBadge();
  if (document.getElementById("bookings-body")) initBookingsPage();
  if (document.getElementById("weather")) initWeather();
});
