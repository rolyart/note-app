if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("assets/js/service-worker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}

var colors = ['#FFAEBB', '#9FE7E5', '#B3F8C8','#C3E0E5', '#FBE7C6','#EFE6BC', '#F8E98C' ];
const notes = new NotesApp('NOTES', colors);