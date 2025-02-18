import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestaurantPage from "./pages/RestaurantPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/restaurants/:restaurantId" element={<RestaurantPage />} />
      </Routes>
    </Router>
  );
}

export default App;
