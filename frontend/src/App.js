import './App.css';
import Upload from './components/Upload';
import Download from './components/Download';
import { Route, BrowserRouter, Routes} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Upload />} path="/" />
        <Route element={<Download />} path="/download/:filename" />
      </Routes>
    </BrowserRouter>

  )
}

export default App;
