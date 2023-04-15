import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreatePage     from "./pages/CreatePage";
import Enroll         from "./pages/Enroll";
import Home_Teacher   from "./pages/Home_Teacher";
import Home           from "./pages/Home";
import Registration   from "./pages/Registration";
import SchedulePage   from "./pages/SchedulePage";
import Welcome        from "./pages/Welcome";
import GradesPage     from "./pages/GradesPage";

const App = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/schedule" element={<SchedulePage/>}/>
        <Route path="/grades" element={<GradesPage/>}/>
      </Routes>
    </BrowserRouter>
  );

export default App;
