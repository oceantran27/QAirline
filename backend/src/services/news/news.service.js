import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import firebase from "../../database/firebase";

const db = getFirestore(firebase);
const NEWS_COLLECTION_NAME = "news";

export const dbGetAllNews = async () => {
  try {
    const snapshot = await getDocs(collection(db, NEWS_COLLECTION_NAME));
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    throw new Error(`Error getting all news: ${error.message}`);
  }
};

export const dbGetNews = async (newsId) => {
  try {
    const docRef = doc(db, NEWS_COLLECTION_NAME, newsId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    throw new Error("News not found");
  } catch (error) {
    throw new Error(`Error getting news by ID: ${error.message}`);
  }
};

export const dbCreateSingleNews = async (news) => {
  try {
    const docRef = doc(collection(db, NEWS_COLLECTION_NAME), news.newsId);

    news.createdAt = new Date();
    news.updatedAt = new Date();

    await setDoc(docRef, news.toObject());
    console.log("News created successfully:", news.newsId);
  } catch (error) {
    throw new Error(`Error creating news: ${error.message}`);
  }
};

export const dbCreateNews = async (newsArray) => {
  try {
    const batch = writeBatch(db);

    newsArray.forEach((news) => {
      const docRef = doc(collection(db, NEWS_COLLECTION_NAME), news.newsId);

      news.createdAt = new Date();
      news.updatedAt = new Date();

      batch.set(docRef, news.toObject());
    });

    await batch.commit();
  } catch (error) {
    throw new Error(`Error creating news: ${error.message}`);
  }
};

export const dbUpdateNews = async (newsId, updateData) => {
  try {
    const docRef = doc(db, NEWS_COLLECTION_NAME, newsId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date(),
    });
  } catch (error) {
    throw new Error(`Error updating news: ${error.message}`);
  }
};

export const dbDeleteNews = async (newsId) => {
  try {
    const docRef = doc(db, NEWS_COLLECTION_NAME, newsId);
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error(`Error deleting news: ${error.message}`);
  }
};

export const dbGetNewsByStatus = async (status) => {
  try {
    const q = query(
      collection(db, NEWS_COLLECTION_NAME),
      where("status", "==", status)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    throw new Error(`Error getting news by status: ${error.message}`);
  }
};
