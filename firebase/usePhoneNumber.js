import { useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database"; // Firebase methods
import { db } from "../firebase/firebase"; // Your Firebase setup file

const usePhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const phoneNumberRef = ref(db, "PN"); // Reference to the 'PN' node in Firebase

    // Listen to the phone number value in Firebase
    const unsubscribe = onValue(
      phoneNumberRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setPhoneNumber(data); // Update state with phone number from Firebase
        } else {
          setError("Phone number not found");
        }
        setLoading(false); // Stop loading once data is fetched
      },
      (error) => {
        setError(error.message); // Handle errors
        setLoading(false);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  // Function to update the phone number in Firebase
  const updatePhoneNumber = (newPhoneNumber) => {
    const phoneNumberRef = ref(db, "PN"); // Reference to the 'PN' node in Firebase
    set(phoneNumberRef, newPhoneNumber) // Update the phone number in Firebase
      .then(() => {
        setPhoneNumber(newPhoneNumber); // Update local state
        setError(null); // Clear any previous error
      })
      .catch((error) => {
        setError("Failed to update phone number"); // Handle error during update
      });
  };

  return { phoneNumber, loading, error, updatePhoneNumber };
};

export default usePhoneNumber;
