import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';

const MainBody = () => {
  return (
    <Routes>
        <Route element={<Home />} path='/' />
    </Routes>
  )
}

export default MainBody;