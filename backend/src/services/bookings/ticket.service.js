import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import firebase from "../../database/firebase";

const db = getFirestore(firebase);
const TICKET_COLLECTION_NAME = "tickets";

export const dbGetAllTickets = async () => {
  try {
    const snapshot = await getDocs(collection(db, TICKET_COLLECTION_NAME));
    const tickets = snapshot.docs.map((doc) => ({
      ...doc.data(),
      ticketId: doc.id,
    }));
    return tickets;
  } catch (error) {
    throw new Error(`Error getting all tickets: ${error.message}`);
  }
};

export const dbGetTicket = async (ticketId) => {
  try {
    const docRef = doc(db, TICKET_COLLECTION_NAME, ticketId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    throw new Error("Ticket not found");
  } catch (error) {
    throw new Error(`Error getting ticket by ID: ${error.message}`);
  }
};

// export const dbCreateTicket = async (ticket) => {
//   try {
//     const docRef = doc(collection(db, TICKET_COLLECTION_NAME));
//     ticket.ticketId = docRef.id;
//     await setDoc(docRef, ticket);
//     return ticket;
//   } catch (error) {
//     throw new Error(`Error creating ticket: ${error.message}`);
//   }
// };

export const dbUpdateTicket = async (ticketId, updateData) => {
  try {
    const docRef = doc(db, TICKET_COLLECTION_NAME, ticketId);
    await updateDoc(docRef, updateData);
  } catch (error) {
    throw new Error(`Error updating ticket: ${error.message}`);
  }
};

export const dbDeleteTicket = async (ticketId) => {
  try {
    const docRef = doc(db, TICKET_COLLECTION_NAME, ticketId);
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error(`Error deleting ticket: ${error.message}`);
  }
};

export const dbCreateTickets = async (tickets) => {
  try {
    const batch = writeBatch(db);

    tickets.forEach((ticket) => {
      const docRef = doc(
        collection(db, TICKET_COLLECTION_NAME),
        ticket.ticketId
      );

      ticket.createdAt = new Date();
      ticket.updatedAt = new Date();

      batch.set(docRef, ticket.toObject());
    });

    await batch.commit();
    console.log("Tickets created successfully");
  } catch (error) {
    throw new Error(`Error creating tickets: ${error.message}`);
  }
};

export const dbCancelTickets = async (tickets) => {
  try {
    const batch = writeBatch(db);

    tickets.forEach((ticketId) => {
      const docRef = doc(db, TICKET_COLLECTION_NAME, ticketId);
      batch.update(docRef, { status: "Cancelled", updatedAt: new Date() });
    });

    await batch.commit();
    console.log("Tickets cancelled successfully");
  } catch (error) {
    throw new Error(`Error cancelling tickets: ${error.message}`);
  }
};