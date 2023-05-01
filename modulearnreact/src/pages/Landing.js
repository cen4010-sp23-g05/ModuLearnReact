import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import './styles/landing.css'
import moduLearnLogo from './resources/moduLearnLogo.png'
import clipBoardIcon from './resources/clipboard.webp' 
import {Link} from 'react-router-dom';

function Landing() {
  return (
    <div className="landingMain">
      <div className="landingPage">
       <div className="leftSide">
        <div className="landingImageDiv">
        <img className="landingPageImage" src={clipBoardIcon} alt="clipBoardIcon" />

        </div>
      </div>
      <div className="rightSide">
        <div className="rightSideContent">
        <div className="contentTitle">
        <img className="mainTitle " src={moduLearnLogo} alt="ModuLearnLogo" />


        

          </div>
          <div className="contentDetailedText">
            <p> ModuLearn is an e-learning website that offers a unique modular approach. 
              The new modular design allows for a higher level of customizability and personalization.
               Each module can be created by institutions, teachers, and learning providers, allowing students to understand different concepts without the unnecessary baggage found on other online learning platforms. 
               The platform allows students and teachers to customize their learning and teaching experience in an easy-to-use system. 
               With the new modular system, students can learn at their own pace, without the pressure of deadlines or assignments, 
               allowing them to focus on learning what they are interested in. Students can explore, search, and select various topics, 
               easily selecting which ones they want to learn about.
 </p>

 <div className="buttonContainer">
  <Link to="/login">
        <Button className="landingButton" variant="primary">Login</Button>
        </Link>
        <Link to="/registration">
        <Button className="landingButton" variant="primary">Register</Button>
        </Link>
        </div>
          
        </div>
        
        </div>


        </div>
    </div>
    </div>
  );
}

export default Landing;