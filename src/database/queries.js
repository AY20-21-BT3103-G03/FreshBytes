import "./firebase.js";
import database from "./firebase.js";
import firebase from "firebase";

export function validateLogin(username, password) {
  console.log(username, password);
  return database
    .collection("users")
    .doc(username)
    .get()
    .then((snapshot) => {
      if (!snapshot.exists) {
        return false;
      }

      const userData = snapshot.data();

      if (password != userData.password) {
        return false;
      }

      userData.username = username;
      return userData;
    });
}
/**
 * Adds a listing to the database's items collections
 * TODO: add the business ID, reroute back to business listings page after completion
 * @param {item} Listing A dictionary of listing details
 */
export function addListing(item) {
  var basedata = item.picture.replace(/^data:image\/[a-z]+;base64,/, "");
  getImageUrl(basedata, item.name, "items").then((url) => {
    item.picture = url;
    database.collection("items").add(item);
  });
  alert("Listing successfully added!");
}

/**
 * Gets user details via username
 * @param {String} username A string representing the user's username
 * @param {Boolean} isCustomer A boolean representing whether the user
 * is a customer or a business
 * @returns A QueryDocumentSnapshot of user details
 */
export function getUserDetails(username, isCustomer) {
  const formatUserType = isCustomer ? "customers" : "businesses";

  return database
    .collection(formatUserType)
    .where("username", "==", username)
    .get()
    .then((snapshot) => {
      return snapshot.docs[0];
    });
}

/**
 * Gets the Firestore document reference of a user in either
 * the customer or business collection, depending on the user type
 * @param {String} userId A string representing the document ID
 * associated with the user in the customer/business collection
 * @param {Boolean} isCustomer A boolean representing whether the user
 * is a customer or a business
 * @returns A document reference
 */
export function getUserDetailsDocRef(userId, isCustomer) {
  const formatUserType = isCustomer ? "customers" : "businesses";
  return database.collection(formatUserType).doc(userId);
}

/**
 * Gets orders with listing for the associated user.
 * @param {Boolean} isCustomer A boolean representing
 * whether the user is a customer or a business
 * @param {String} userId The document id of the associated
 * user in the customers or businesses collection
 * @returns A Promise of an array of all order data related to the user ID.
 */
export function getUserOrdersWithListing(isCustomer, userId) {
  // collection name
  const formatUserType = isCustomer ? "customers" : "businesses";
  // field name in order collection
  const orderUserType = isCustomer ? "customer" : "business";
  const docRef = database.collection(formatUserType).doc(userId);

  return database
    .collection("orders")
    .where(orderUserType, "==", docRef)
    .get()
    .then((snapshot) => {
      return snapshot.docs;
    })
    .then((orders) => {
      var allOrders = [];
      orders.forEach((order) => {
        extractListing(order).then((actual) => {
          allOrders.push(actual);
        });
      });
      return allOrders;
    });
}

/**
 * Extracts the actual listing data from an order snapshot
 * @param {firebase.firestore.QueryDocumentSnapshot} order
 * @returns The order's data with the actual listing data
 * instead of a document reference, and the order's document id
 * added on as a field.
 */
async function extractListing(order) {
  var actualOrder = {};

  // Copy over all fields other than listingID
  // Use document reference in listingID to query
  for (const property in order.data()) {
    if (property != "listingID") {
      actualOrder[property] = order.data()[property];
    } else {
      let listingRef = order.data()[property];
      var actualListing = await getFromDocRef(listingRef);
      actualOrder[property] = actualListing;
    }
    // Add ID as a field to the created order object
    actualOrder.id = order.id;
  }
  return actualOrder;
}

/**
 * Gets document data via a document reference
 * @param {firebase.firestore.DocumentReference} docRef A Firestore
 * document reference
 * @returns A Promise resolving into a data object of the document
 */
function getFromDocRef(docRef) {
  return docRef.get().then((snapshot) => {
    return snapshot.data();
  });
}

/**
 * Updates a Firestore document using its document reference
 * @param {firebase.firestore.DocumentReference} docRef A Firestore
 * document reference
 * @param {Object} newData An Object containing updated fields
 * @returns A Promise that resolves upon update success/failure
 */
export function updateFromDocRef(docRef, newData) {
  return docRef.update(newData);
}

/**
 * Uploads a base64 image string to the Firebase storage and retrieves a url
 * @param {*} baseUrl A base64 string of image data
 * @param {*} imageName The name of the image
 * @param {*} folderName The folder to store the image in the firebase storage.
 */
export function getImageUrl(baseUrl, imageName, folderName) {
  return new Promise((resolve, reject) => {
    var metadata = { contentType: "image/jpeg" };
    let storageRef = firebase
      .storage()
      .ref(folderName + "/" + imageName + ".jpeg")
      .putString(baseUrl, "base64", metadata);
    storageRef.on(
      "state_changed",
      () => {},
      (error) => {
        console.log(error.message);
        reject(error);
      },
      async () => {
        const url = await storageRef.snapshot.ref.getDownloadURL();
        resolve(url);
      }
    );
  });
}
