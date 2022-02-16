import './App.css';
import { Educations } from './components/Educational';
import { GeneralInfo } from './components/GeneralInfo';

function App() {
  return (
    <div className="App">
      <GeneralInfo />
      <Educations />
    </div>
  );
}

export default App;
