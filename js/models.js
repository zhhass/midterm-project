/* Brass & Blade – final project: OOP model layer (classes + localStorage persistence) */

// Static helper class: safe wrapper around localStorage
class Storage {
  static load(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (e) { return fallback; }
  }
  static save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
  }
}

// Base class (inheritance): anything that can be saved as plain data
class BaseModel {
  constructor(id) { this.id = id; }
  toJSON() { return { ...this }; }
}

class Booking extends BaseModel {
  constructor({ id, name, phone, serviceId, barber = "", date, time, ref = "", status = "active", createdAt = Date.now() }) {
    super(id);
    Object.assign(this, { name, phone, serviceId: Number(serviceId), barber, date, time, ref, status, createdAt });
  }
  get service() { return findService(this.serviceId); }          // getter uses data array from app.js
  get price() { return this.service ? this.service.price : 0; }
  get isActive() { return this.status === "active"; }
  cancel() { this.status = "cancelled"; }
  toString() { return this.date + " " + this.time + " – " + (this.service ? this.service.name : "Service"); }
}

class BookingManager {
  #items;                                                          // private field (encapsulation)
  #key;
  constructor(key = "bookings") {
    this.#key = key;
    this.#items = Storage.load(key, []).map(data => new Booking(data));
  }
  #persist() { Storage.save(this.#key, this.#items); }
  get count() { return this.#items.filter(b => b.isActive).length; }
  get totalActive() { return this.#items.filter(b => b.isActive).reduce((sum, b) => sum + b.price, 0); }
  list(status = "all") {
    const items = status === "all" ? this.#items : this.#items.filter(b => b.status === status);
    return [...items].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  }
  isTaken(date, time, barber) {
    return this.#items.some(b => b.isActive && b.date === date && b.time === time && b.barber === barber);
  }
  add(booking) { this.#items.push(booking); this.#persist(); }
  cancel(id) { const b = this.#items.find(i => i.id === id); if (b) { b.cancel(); this.#persist(); } }
  remove(id) { this.#items = this.#items.filter(i => i.id !== id); this.#persist(); }
  clear() { this.#items = []; this.#persist(); }
}

const bookingManager = new BookingManager();
