import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Toolbar from './components/Toolbar';

function App() {
  return (
    <div className="App">
      <Layout>
        <Toolbar />
        <Dashboard />
      </Layout>
    </div>
  );
}

export default App;
