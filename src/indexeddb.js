const DATABASE_NAME = 'checklist-db';
const TRANSACTION_NAME = 'checklist-tran';
const DATABASE_VERSION = 1.0;

const setup = () =>{
  // App.postData = postData;

  window.addEventListener('offline', () => {
    console.log('You are now offline.');
    alert("You are now offline");
  });
  
  window.addEventListener('online', () => {
    console.log('You are now online.');
    alert("You are now online");
    saveItems([]);
  });
}

function saveItems(items) {
  const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

  request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore(TRANSACTION_NAME, { keyPath: 'id', autoIncrement: true });
  };

  request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction([TRANSACTION_NAME], 'readwrite');
    const objectStore = transaction.objectStore(TRANSACTION_NAME);

    console.log(items);
    objectStore.add(items);

    transaction.oncomplete = function() {
      console.log('Items saved to IndexedDB.');
    };

    transaction.onerror = function(event) {
      console.error('Transaction error:', event.target.error);
    };
  };

  request.onerror = function(event) {
    console.error('Database error:', event.target.error);
  };
}

function getItems() {
  const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

  request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction([TRANSACTION_NAME], 'readonly');
    const objectStore = transaction.objectStore(TRANSACTION_NAME);

    const getAllRequest = objectStore.getAll();

    getAllRequest.onsuccess = function() {
      const items = getAllRequest.result;
      // items.forEach(post => {
      //   const postData = removeIdProperty(post);
      //   alert(`Syncing record ${JSON.stringify(post)}`)
      //   App.fetch('...', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(postData)
      //   })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log('Data synced:', data);
      //     deletePostFromIndexedDB(post.id);
      //     alert(`Data synced: ${JSON.stringify(data)}`);
      //   })
      //   .catch(error => {
      //     console.error('Error syncing data:', error);
      //   });
      // });
      return items;
    };

    getAllRequest.onerror = function(event) {
      console.error('Get all request error:', event.target.error);
    };
  };

  request.onerror = function(event) {
    console.error('Database error:', event.target.error);
  };
}

export default setup;
