import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore'; // Assuming you're using Clerk for user authentication

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveCartToFirebase = async (cart, userId) => {
  try {
    if (!userId) {
      throw new Error('User is not authenticated.');
    }

    const cartDocRef = doc(db, 'carts', userId);

    await setDoc(cartDocRef, { cart });

    console.log('Cart saved successfully to Firestore.');
  } catch (error) {
    console.error('Error saving cart to Firestore:', error);
  }
};


export { db };
