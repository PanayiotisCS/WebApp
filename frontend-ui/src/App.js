import './App.css';
import './temp.css';
import Home from './Screens/Home';
import Header from './component/header';
import Footer from './component/footer';


function App() {
  return (
    <div className="App">
        <Header />
        <div className='students-background ui-g" tabIndex={"-1"}'>
          <Home />
        </div>
        <Footer />
      </div>
  );
};

export default App;
