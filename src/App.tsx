import { BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { Provider } from 'react-redux'; // {} use this 
import reduxStore from '../src/redux-store/redux-store';
//import { mfeCard as MfeCard } from './';
import { Suspense  } from 'react';

function App() {
  const envInternal = "";// process.REACT_APP_ENV;
   const env = process.env.REACT_APP_ENVIRONMENT;
  return (
    <div className="App">
      <div>env : {env} && envInternal : {envInternal}</div>
      {/* <Suspense fallback={<div>Loading Microfrontend Card...</div>}>
      
      </Suspense> */}
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
