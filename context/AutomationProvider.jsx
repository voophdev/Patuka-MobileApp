import { createContext, useState, useContext, useEffect } from "react";
import { db, ref, onValue, update } from "../firebase/firebase";

// Create the context
const AutomationContext = createContext();

export const AutomationProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  // Fetch the initial isEnabled state from Firebase only once
  useEffect(() => {
    const isEnabledRef = ref(db, "automation/isEnabled");
    const unsubscribe = onValue(isEnabledRef, (snapshot) => {
      const firebaseIsEnabled = snapshot.val();
      if (firebaseIsEnabled !== isEnabled) {
        setIsEnabled(firebaseIsEnabled);
      }
    });

      // Clean up the listener on component unmount
      return () => unsubscribe();
    }, [isEnabled]); // Empty dependency array means this runs once on mount

    const toggleSwitch = () => {
      const newState = !isEnabled;
      setIsEnabled(newState);

    const automationRef = ref(db, "automation");
    update(automationRef, { isEnabled: newState })
      .then(() => console.log("Automation updated successfully"))
      .catch((error) =>
        Alert.alert("Error", `Error updating isEnabled: ${error.message}`)
      );
    };

  return (
    <AutomationContext.Provider
      value={{
        isEnabled,
        toggleSwitch,
      }}
    >
      {children}
    </AutomationContext.Provider>
  );
};

export const useAutomation = () => {
  return useContext(AutomationContext);
};
