import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await initDb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const newItem = { content };
  await store.add(newItem);
  await tx.done;
  console.log('Added content to the database:', content);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await initDb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const allContent = await store.getAll();
  await tx.done;
  console.log('Retrieved content from the database:', allContent);
};

initdb();
