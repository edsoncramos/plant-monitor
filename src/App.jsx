import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TVMode from "./pages/TVMode";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/tv"
          element={<TVMode />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;