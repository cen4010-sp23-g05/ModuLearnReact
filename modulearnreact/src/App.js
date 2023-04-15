import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreatePage     from "./pages/CreatePage";
import Enroll         from "./pages/Enroll";
import Home           from "./pages/Home";
import HomeTeacher    from "./pages/HomeTeacher";
import Login          from "./pages/Login";
import Registration   from "./pages/Registration";
import SchedulePage   from "./pages/SchedulePage";
import GradesPage     from "./pages/GradesPage";

const App = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>

        <Route path="/" element={<Home/>}/>
        <Route path="/home_teacher" element={<HomeTeacher/>}/>

        <Route path="/schedule" element={<SchedulePage/>}/>
        <Route path="/grades" element={<GradesPage/>}/>
      </Routes>
    </BrowserRouter>
  );

export default App;
