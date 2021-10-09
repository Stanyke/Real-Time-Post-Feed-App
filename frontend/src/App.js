import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ViewPost from './pages/ViewPost';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/view-post/:postId" exact component={ViewPost} />
    </Router>
  );
}

export default App;
