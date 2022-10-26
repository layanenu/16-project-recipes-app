import React from 'react';
import './App.css';
import Routers from './routes/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';
import Login from './pages/Login';

function App() {
  return (
    <div className="meals">
      <Routers>
        <Login />
        <SearchBar />
      </Routers>
    </div>
  );
}

export default App;
