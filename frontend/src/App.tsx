import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import NotFound from './pages/NotFound';
import RedirectPageC from './pages/RedirectPage';
import Home from "./page";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/:slug" element={<RedirectPageC />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
