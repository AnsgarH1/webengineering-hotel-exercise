import React from "react"
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BookingPage from "./pages/Booking/BookingPage";
import RoomSelectionPage from "./pages/RoomSelection/RoomSelectionPage";
import { BookingContextProvider } from "./utils/context/BookingContext";

import { LoginContextProvider } from './utils/context/LoginContext';




function App() {

  return (
    <LoginContextProvider>
      <BookingContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<RoomSelectionPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </Layout>
      </BookingContextProvider>
    </LoginContextProvider>
  )
}

export default App;
