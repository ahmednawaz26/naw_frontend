import { Route, Routes } from "react-router-dom";
import CategoriesProvider from "./contexts/categories.context";
import SourcesProvider from "./contexts/sources.context";
import StartEndDateProvider from "./contexts/start-end-date.context";
import Home from "./routes/home";
import Login from "./routes/login";
import Signup from "./routes/signup";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route
        path="/*"
        element={
          <StartEndDateProvider>
            <SourcesProvider>
              <CategoriesProvider>
                <Home />
              </CategoriesProvider>
            </SourcesProvider>
          </StartEndDateProvider>
        }
      />
    </Routes>
  );
}

export default App;
