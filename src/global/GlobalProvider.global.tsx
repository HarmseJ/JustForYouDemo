import { createContext, useContext, useEffect, useState } from "react";
import { IncomingData } from "../interfaces/IncomingData.interfaces";
import { IncomingPopups } from "../interfaces/IncomingPopUps.interfaces";
import GetTime from "../components/GetTime.components";

// --- Mock Data (API logic not shown in demo mode) ---
const mockIncomingData: IncomingData[] = [
  { 
    id: 1, 
    day: GetTime().day, 
    showNext: true, 
    data: [{
      image: "https://images.pexels.com/photos/30945514/pexels-photo-30945514/free-photo-of-wooden-tiles-spelling-demo-with-blurred-background.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "Demo Title",
      message: "Demo Message"
    }],
    picks: [{
      title: "Demo",
      iconName: "OndemandVideoIcon",
  }]
  },
];

const mockPopups: IncomingPopups[] = [
  { 
    id: 1,
    start_on: GetTime().fullDate,
    name: "The Demo",
    about: "This is a demo game to showcase the functionality of the popup system. In this game, you can simply press a button to continue.",
    completed: false,
    answers: [],
  },
];

export interface GlobalStateContextType {
  incomingData: IncomingData[];
  setIncomingData: React.Dispatch<React.SetStateAction<IncomingData[]>>;

  fetchIncomingData: () => Promise<void>;
  fetchIncomingPopups: () => Promise<void>;
  incomingPopups: IncomingPopups[];
  setIncomingPopups: React.Dispatch<React.SetStateAction<IncomingPopups[]>>;

  updatePopUp: (props: { updatedData: any }) => Promise<void>;
  deleteEntry: (id: number | undefined) => Promise<void>;

  currentDay: string;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  currentDayId: number | undefined;
  setCurrentDayId: React.Dispatch<React.SetStateAction<number | undefined>>;

  todaysData: IncomingData | null;
  setTodaysData: React.Dispatch<React.SetStateAction<IncomingData | null>>;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const GlobalProvider = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalStateProvider must be used within a GlobalStateProvider');
  }
  return context;
};

export const GlobalStateProvider = (props: React.PropsWithChildren) => {
  const { children } = props;
  const [incomingData, setIncomingData] = useState<IncomingData[]>([]);
  const [incomingPopups, setIncomingPopups] = useState<IncomingPopups[]>([]);
  const [currentDay, setCurrentDay] = useState(GetTime().fullDate);
  const [loading, setLoading] = useState(true);

  const [currentDayId, setCurrentDayId] = useState<number | undefined>(undefined);
  const [todaysData, setTodaysData] = useState<IncomingData | null>(null);

  async function fetchIncomingData() {
    console.log("Fetching mock incoming data...");
    setTimeout(() => {
      setIncomingData(mockIncomingData);
      const dataToShowToday = prepareIncomingDataFromData(mockIncomingData);
      setTodaysData(dataToShowToday);

      if (dataToShowToday?.id) {
        setCurrentDayId(dataToShowToday.id);
        localStorage.setItem('currentDayId', JSON.stringify(dataToShowToday.id));
      }

      localStorage.setItem('incomingData', JSON.stringify(mockIncomingData));
      localStorage.setItem('dataToShowToday', JSON.stringify(dataToShowToday));
      setLoading(false);
    }, 500);
  }

  function prepareIncomingDataFromData(data: IncomingData[]) {
    const todaysDate = GetTime().day;
    const todaysEntries = data.filter((entry) => entry.day === todaysDate);
    if (!todaysEntries.length) return null;
    const showNextEntry = todaysEntries.find((entry) => entry.showNext);
    return showNextEntry || todaysEntries[Math.floor(Math.random() * todaysEntries.length)];
  }

  async function fetchIncomingPopups() {
    console.log("Fetching mock popups...");
    setTimeout(() => {
      setIncomingPopups(mockPopups);
      localStorage.setItem('incomingPopups', JSON.stringify(mockPopups));
      setLoading(false);
    }, 500);
  }

  async function updatePopUp(props: { updatedData: { id: string | number; answers?: any[] } }) {
    const { updatedData } = props;

    if (!updatedData?.id) {
      console.error("Error: No ID provided for update.");
      return;
    }

    setIncomingPopups((prev: any) => {
      const updatedPopups = prev.map((p: any) => {
        if (p.id === updatedData.id) {
          return { ...p, completed: true, answers: updatedData.answers || [] };
        }
        return p;
      });
      return updatedPopups;
    }
  );
    
    console.log("Updated mock popup:", updatedData);
  }

  async function deleteEntry(id: number | undefined) {
    if (!id) {
      console.error("Error: No ID provided for deletion.");
      return;
    }

    setIncomingData(prev => prev.filter(entry => entry.id !== id));
    console.log("Deleted mock entry with id:", id);
  }

  const checkDayChange = async () => {
    const nowInEST = GetTime().fullDate;
    const lastFetchedDay = localStorage.getItem('lastFetchedDay');

    if (lastFetchedDay !== nowInEST) {
      const idToDelete = localStorage.getItem('currentDayId');
      if (idToDelete) {
        await deleteEntry(JSON.parse(idToDelete));
      }

      await fetchIncomingData();
      await fetchIncomingPopups();
      localStorage.setItem('lastFetchedDay', nowInEST);
      setCurrentDay(nowInEST);
    } else {
      const cachedData = localStorage.getItem('incomingData');
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setIncomingData(parsedData);
        const dataToShowToday = prepareIncomingDataFromData(parsedData);
        setTodaysData(dataToShowToday);
      } else {
        await fetchIncomingData();
      }

      const cachedPopups = localStorage.getItem('incomingPopups');
      if (cachedPopups) {
        setIncomingPopups(JSON.parse(cachedPopups));
      } else {
        await fetchIncomingPopups();
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    checkDayChange();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkDayChange();
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlobalStateContext.Provider value={{
      incomingData,
      setIncomingData,
      fetchIncomingData,
      fetchIncomingPopups,
      currentDay,
      setCurrentDay,
      loading,
      setLoading,
      incomingPopups,
      setIncomingPopups,
      updatePopUp,
      deleteEntry,
      currentDayId,
      setCurrentDayId,
      todaysData,
      setTodaysData
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
};