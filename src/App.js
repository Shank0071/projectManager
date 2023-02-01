import { Timestamp } from 'firebase/firestore';
import { useContext } from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Project from './pages/Project';
import Create from './pages/Create';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AuthContext } from './context/AuthContext';
import OnlineUsers from './components/OnlineUsers';

function App() {
  // console.log(Timestamp.fromDate(new Date()))

  const [{user}] = useContext(AuthContext)

  return (
      <div className="App">
        <BrowserRouter>
          <div className='flex'>
            {user && <Sidebar />}
            <div className='bg-slate-100 min-h-screen w-full pb-20'>
              <Navbar />
              <Switch>
                <Route exact path="/">
                  {!user &&  <Redirect to="/login" />}
                  {user &&  <Home />}
                </Route>
                <Route path="/projects/:id">
                  {!user && <Redirect to="/login" />}
                  {user && <Project />}
                </Route> 
                <Route path="/create">
                  {!user && <Redirect to="/login" />}
                  {user && <Create />}
                </Route>
                <Route path="/login">
                  {!user && <Login />}
                  {user && <Redirect to="/" />}
                </Route>
                <Route path="/signup">
                  {!user && <Signup />}
                  {user && <Redirect to="/" />}
                </Route>
            </Switch>
            </div>
          </div>
        </BrowserRouter>
        {user && <OnlineUsers />}
      </div>
  
  );
}

export default App;
