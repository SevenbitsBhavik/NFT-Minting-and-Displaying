import './App.css';
// import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Minter from './Minter'
import Nft_display from './nft_display';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route index element={<Minter />} />
        <Route path="/a" element={<Nft_display />}>
          {/* <Route path="/blogs" element={<Nft_display />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
      {/* <Minter></Minter>
      <Router>
        <Switch>
          <Route exact path="/" element={<Minter />} />
          <Route exact path="page1" element={<Nft_display />} />
          </Switch></Router>
            <li><Link to="/">Home</Link></li>
            <li><Link to="page1">Page 1</Link></li> */}

      
    </div>
  );
}

export default App;
