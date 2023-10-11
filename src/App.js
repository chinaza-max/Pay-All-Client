import './App.css';
import HeadArea from './Components/headArea/headArea';
//import About from './Components/About/about';
import Service from './Components/Service/Service';
import CallAction from './Components/callAction/callAction';
import Container1 from './Components/Container1/Container1';
import Slide from './Components/Slide/Slide';
import DataPlan from './Components/dataPlan/dataPlan';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Container1/>
      <HeadArea/>
      <Slide/>
      <DataPlan/>
      <Service/>
      <CallAction/>
      <Footer/>
    </div>
  );
}

export default App;
