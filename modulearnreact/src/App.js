import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreatePage     from "./pages/Teacher/CreatePage";
import Enroll         from "./pages/Student/Enroll";
import Home           from "./pages/Student/Home";
import HomeTeacher    from "./pages/Teacher/HomeTeacher";
import Login          from "./pages/Login";
import Registration   from "./pages/Registration";
import SchedulePage   from "./pages/Student/SchedulePage";
import GradesPage     from "./pages/Student/GradesPage";

const App = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>

        <Route path="/student" element={<Home/>}/>
        <Route path="/student/enroll" element={<Enroll/>}/>
        <Route path="/student/schedule" element={<SchedulePage/>}/>
        <Route path="/student/grades" element={<GradesPage/>}/>

        <Route path="/teacher" element={<HomeTeacher/>}/>
        <Route path="/teacher/create_page" element={<CreatePage/>}></Route>
      </Routes>
    </BrowserRouter>
  );

export default App;
