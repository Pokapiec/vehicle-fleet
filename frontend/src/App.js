import Navbar from './components/Navbar';
import Filters from './components/Filters';
import Zlecenia from './components/Zlecenia';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Filters/>
      <Zlecenia/>
    </div>
  );
}

export default App;
