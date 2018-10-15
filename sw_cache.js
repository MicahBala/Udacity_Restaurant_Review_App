const cacheName = 'v2';

// Call the Install event for the SW
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
});

// Call the activate Event for the SW
self.addEventListener('install', e => {
  console.log('Service Worker: Activated');

  //   Remove unwanted cahes
  e.waitUntil(
    // Loop through the cache and have a condition that says if the current cache is not what we are looping through in the current iteration, we delete it.
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Deleting Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call the fetch even to make contents available offline from the cahed storage
self.addEventListener('fetch', e => {
  console.log('Service Worker: fetching....');

  //Check if the live site is available, if not then load the cache
  e.respondWith(
    //   fetch initial request
    fetch(e.request)
      .then(response => {
        // Make a clone of esponse we get from server
        const reponseClone = response.clone();
        // Open the cache
        caches.open(cacheName).then(cache => {
          // Add the response to the cache
          cache.put(e.request, reponseClone);
        });

        return response;
        //   If the connection drops the catch will will be called
      })
      .catch(err => {
        caches.match(e.request).then(response => response);
      })
  );
});
