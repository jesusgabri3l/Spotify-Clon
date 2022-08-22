
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserStore } from './store/UserStore';
import Layout from './components/layouts/Layout';
import Callback from './pages/Callback';
import Home from './pages/Home/Home';
import ProtectedPage from './components/router/ProtectedPage';
import ArtistPage from './pages/Artist/ArtistPage';
import DiscographyPage from './pages/Artist/DiscographyPage';
import AlbumPage from './pages/Album/AlbumPage';
import SearchPage from './pages/Search/SearchPage';

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
        <Route path="artist/:id/discography" element = {<ProtectedPage UserStore={UserStore}>
          <DiscographyPage />
        </ProtectedPage>}>
        </Route>
        <Route path="search" element = {<ProtectedPage UserStore={UserStore}>
          <SearchPage />
        </ProtectedPage>}>
        </Route>
        <Route path="album/:id" element = {<ProtectedPage UserStore={UserStore}>
          <AlbumPage />
        </ProtectedPage>}>
        </Route>
      </Route>
    </Routes>
      </BrowserRouter>
    </div>);
}

export default App;
