import React from 'react';
import './App.css';
import Routers from './routes/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import SearchBar from './components/SearchBar';

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

{ /* coloquei a  <SearchBar />  só para voisuzl s */ }
