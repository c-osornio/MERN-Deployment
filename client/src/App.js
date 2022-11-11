import Home from "./views/Home";
import CreateView from "./views/CreateView";
import DetailsView from "./views/DetailsView";
import UpdateView from "./views/UpdateView";
import Footer from "./components/Footer";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element= {<Navigate to="/pets" />} />
          <Route path="/pets" element={<Home/>} />  

          {/* Create*/}
          <Route path="/pets/new" element = {<CreateView/>} />

          {/* Read */}
          <Route path="/pets/:id" element = {<DetailsView/>} />

          {/* Update */}
          <Route path="/pets/edit/:id" element = {<UpdateView/>} />

        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
