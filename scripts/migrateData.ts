
import * as admin from 'firebase-admin';
import { categorizedContent } from '../src/app/(app)/share-center/page';

// Initialize Firebase Admin SDK
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://studio-1242960406-79feb-default-rtdb.asia-southeast1.firebasedatabase.app'
});

const db = admin.firestore();

async function migrateData() {
  console.log('Starting data migration...');

  for (const category of categorizedContent) {
    const categoryCollectionRef = db.collection('shareCenterCategories').doc(category.value);
    
    // Set the category data (name, value)
    await categoryCollectionRef.set({
      name: category.category,
      value: category.value
    });

    const postsCollectionRef = categoryCollectionRef.collection('posts');
    
    console.log(`Migrating ${category.posts.length} posts for category: ${category.category}`);
    
    for (const post of category.posts) {
      try {
        await postsCollectionRef.add({
          title: post.title,
          content: post.content,
          hashtags: post.hashtags,
          createdAt: admin.firestore.FieldValue.serverTimestamp() // Add a timestamp
        });
      } catch (error) {
        console.error(`Error migrating post: ${post.title}`, error);
      }
    }
  }

  console.log('Data migration completed successfully!');
}

migrateData().catch(console.error);
