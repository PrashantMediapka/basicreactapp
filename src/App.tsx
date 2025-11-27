import { BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { Provider } from 'react-redux'; // {} use this 
import reduxStore from '../src/redux-store/redux-store';

function App() {
  return (
    <div className="App">
      {/*add redux store provider tag*/} 
      <Provider store={reduxStore}> 
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          </Routes>
        </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
