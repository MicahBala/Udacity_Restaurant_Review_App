// Call the Install event for the SW
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
});

// Call the activate Event for the SW
self.addEventListener('install', e => {
  console.log('Service Worker: Activated');
});
