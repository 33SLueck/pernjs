import {BrowserRouter as Router, Routes, Route} from 'react-router';
import BookList from './pages/BookList';

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element= {<BookList/>}/>
        </Routes>
     </Router>
    </>
  )
}

export default App
