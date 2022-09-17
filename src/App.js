import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home/Index";
import Bookmark from "./Views/Bookmarks/Index";
import SearchWord from "./Views/Word/Index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmarks" element={<Bookmark />} />
        <Route path="/search/:word" element={<SearchWord />} />
      </Routes>
    </Router>
  );
}

export default App;
