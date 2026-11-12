/* Brass & Blade – final project: API layer (fetch + async/await) */
class ApiClient {
  static WEATHER_URL = "https://api.open-meteo.com/v1/forecast?latitude=51.13&longitude=71.43&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto";
  static BOOKING_URL = "https://jsonplaceholder.typicode.com/posts";

  // GET: current weather in Astana (Open-Meteo, no API key)
  static async getWeather() {
    const response = await fetch(ApiClient.WEATHER_URL);
    if (!response.ok) throw new Error("Weather request failed: " + response.status);
    const data = await response.json();
    return data.current;
  }

  // POST: send a booking to a test server (JSONPlaceholder) and return a reference number
  static async sendBooking(booking) {
    const response = await fetch(ApiClient.BOOKING_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ title: booking.toString(), body: booking.name + " / " + booking.phone, userId: 1 })
    });
    if (!response.ok) throw new Error("Booking request failed: " + response.status);
    const data = await response.json();
    return "BB-" + data.id + "-" + String(booking.id).slice(-4);
  }
}
