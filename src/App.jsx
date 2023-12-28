import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ProtectedRoutes from "./components/ProtectedRoutes";
import SingleBookmark from "./components/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark";
import BookmarkLayout from "./components/BookmarkLayout";
import BookmarkList from "./components/BookmarkList";
import LocationList from "./components/LocationList";
import HotelsLayout from "./components/HotelsLayout";
import SingleHotel from "./components/SingleHotel";
import AppLayout from "./components/AppLayout";
import Hotels from "./components/Hotels";
import Login from "./components/Login";

import HotelsProvider from "./contexts/HotelsProvider";
import BookmarksProvider from "./contexts/BookmarksProvider";
import AppProvider from "./contexts/AppContext";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <AppProvider>
          <HotelsProvider>
            <BookmarksProvider>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<LocationList />} />
                  <Route path="login" element={<Login />} />
                </Route>

                <Route path="/hotels" element={<HotelsLayout />}>
                  <Route index element={<Hotels />} />
                  <Route path=":id" element={<SingleHotel />} />
                </Route>

                <Route path="/bookmarks" element={<BookmarkLayout />}>
                  <Route
                    index
                    element={
                      <ProtectedRoutes>
                        <BookmarkList />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path=":id"
                    element={
                      <ProtectedRoutes>
                        <SingleBookmark />
                      </ProtectedRoutes>
                    }
                  />
                  <Route path="add" element={<AddNewBookmark />} />
                </Route>
              </Routes>
            </BookmarksProvider>
          </HotelsProvider>
        </AppProvider>
      </AuthProvider>
    </>
  );
}

export default App;
