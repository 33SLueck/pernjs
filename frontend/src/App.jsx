import {BrowserRouter as Router, Routes, Route} from 'react-router';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element= {<BookList/>}/>
        <Route path="book/:id" element= {<BookDetails/>}/>
        </Routes>
     </Router>
    </>
  )
}

export default App
