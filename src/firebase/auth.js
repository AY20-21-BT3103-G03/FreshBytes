import { database } from "@/firebase/firebase";

export const addUser = (userData) => {
  return database.collection("users").add(userData);
};

export const login = (username, password) => {
  return database
    .collection("users")
    .where("username", "==", username)
    .limit(1)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) throw "Invalid Username/Password!";

      const userData = snapshot.docs[0].data();
      console.log(userData);

      if (userData.password !== password) throw "Invalid Username/Password!";

      return {
        ...userData,
        id: snapshot.docs[0].id,
      };
    });
};

export const getUsernames = () =>
  database
    .collection("users")
    .get()
    .then((snapshot) => snapshot.docs.map((x) => x.data().username));

export const updateUser = async (userId, data) => {
  await database.collection("users").doc(userId).update(data);

  return database
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
};
