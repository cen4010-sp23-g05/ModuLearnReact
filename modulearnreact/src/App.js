import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreatePage     from "./pages/Teacher/CreatePage";
import Enroll         from "./pages/Student/Enroll";
import Home           from "./pages/Student/Home";
import HomeTeacher    from "./pages/Teacher/HomeTeacher";
import Login          from "./pages/Login";
import Registration   from "./pages/Registration";
import SchedulePage   from "./pages/Student/SchedulePage";
import GradesPage     from "./pages/Student/GradesPage";

import CreateLesson     from "./pages/Teacher/CreateLesson";
import CreateAssignment from './pages/Teacher/CreateAssignment';
import CreateAssessment from "./pages/Teacher/CreateAssessment";

import ViewLesson       from './pages/Student/ViewLesson';
import ViewAssignment   from './pages/Student/ViewAssignment';
import ViewAssessment   from './pages/Student/ViewAssessment';

const App = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>

        <Route path="/student" element={<Home/>}/>
        <Route path="/student/enroll" element={<Enroll/>}/>
        <Route path="/student/schedule" element={<SchedulePage/>}/>
        <Route path="/student/grades" element={<GradesPage/>}/>

        <Route path="/student/view_lesson" element={<ViewLesson/>}></Route>
        <Route path="/student/view_assignment" element={<ViewAssignment/>}></Route>
        <Route path="/student/view_assessment" element={<ViewAssessment/>}></Route>

        <Route path="/teacher" element={<HomeTeacher/>}/>
        <Route path="/teacher/create_page" element={<CreatePage/>}></Route>
        <Route path="/teacher/create_lesson" element={<CreateLesson/>}></Route>
        <Route path="/teacher/create_assignment" element={<CreateAssignment/>}></Route>
        <Route path="/teacher/create_assessment" element={<CreateAssessment/>}></Route>
      </Routes>
    </BrowserRouter>
  );

export default App;
