
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserStore } from './store/UserStore';
import Layout from './components/layouts/Layout';
import Callback from './pages/Callback';
import Home from './pages/Home/Home';
import ProtectedPage from './components/router/ProtectedPage';
import ArtistPage from './pages/Artist/ArtistPage';
// All styles are in assets/styles

function App () {
  return (
  <div className="main_wrapper">
    <BrowserRouter>
      <Routes>
      <Route path="callback/*" element = {<Callback UserStore={UserStore}/>} />
      <Route path="/" element={<Layout UserStore={UserStore}/>}>
        <Route index element={<Home UserStore={UserStore}/>} />
        <Route path="artist/:id" element = {<ProtectedPage UserStore={UserStore}>
          <ArtistPage />
        </ProtectedPage>}>
        </Route>
        <Route path="tracks/*" element = {<ProtectedPage UserStore={UserStore}>
          <div className="min-h-screen flex justify-center items-center">
            <h1 className="text-3xl font-bold text-blue-600">
              XDDD
            </h1>
          </div>
        </ProtectedPage>}>
        </Route>
      </Route>
    </Routes>
      </BrowserRouter>
    </div>);
}

export default App;
