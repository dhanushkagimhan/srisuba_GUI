import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { MainLayout } from "./utility/components";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
