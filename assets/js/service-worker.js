const staticDevCoffee = "Notes App"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
]



self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
})