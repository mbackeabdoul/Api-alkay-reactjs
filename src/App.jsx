import MonComposantListesDePays from './assets/composants/Listes'
import DetailPays from './assets/composants/DetailPays';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

function App() {
 return (
    <div>
      {/* <Listes /> */}
      <Router>
      <Routes>
        <Route path="/" element={<MonComposantListesDePays />} />
        <Route path="/pays/:nom" element={<DetailPays />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
