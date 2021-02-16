import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useContext } from "react";
import UserProvider, {
  UserContext,
} from "./Components/UserProvider/UserProvider";
const firebaseConfig = {
  apiKey: "AIzaSyAtVcc8NDQAnAj4Gcy1mrjMix0u6TeFZz8",
  authDomain: "digital-jalebi-6193a.firebaseapp.com",
  projectId: "digital-jalebi-6193a",
  storageBucket: "digital-jalebi-6193a.appspot.com",
  messagingSenderId: "416553305088",
  appId: "1:416553305088:web:e0ceb51f6641f26590c4e5",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const cardsRef = firestore.collection("/cards");
export var currentUser = null;
export const getCards = async () => {
  var user = auth.currentUser;
  var cards = await cardsRef.where("userId", "==", user.uid).get();
  return cards.docs;
};

const state = {
  user: null,
};

export const saveCard = async (cardText) => {
  var user = auth.currentUser;
  cardsRef
    .add({
      cardText: cardText,
      userId: user.uid,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(function (cardRef) {
      console.log("Card created with ID:", cardRef);
    });
};
export const logoutUser = async () => {
  await auth.signOut();
};
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
