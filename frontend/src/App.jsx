import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import UserSettings from "./pages/UserSettings";
import Events from "./pages/Events";
import ManageEvents from "./pages/ManageEvents";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/user-settings" element={<UserSettings />} />
      <Route path="/manage-events" element={<ManageEvents />} />
      <Route path="/events" element={<Events />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);


export default function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}
