
import './App.css';
import { Outlet } from "react-router-dom";
import SearchHeader from './components/SearchHeader';


function App() {
  return (
    <main>
      <SearchHeader />
      <Outlet />
    </main>
  );
}

export default App;
