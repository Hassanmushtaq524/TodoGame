import './App.css';
import Header from './components/Header.js';
import AuthProvider from './context/AuthContext.js';
import Tasks from './components/Tasks.js';
import TaskProvider from './context/TaskContext.js';


function App() {
  return (
    <>
    <TaskProvider>
    <AuthProvider>
      <Header/>
      <Tasks/>
    </AuthProvider>
    </TaskProvider>
    </>
  );
}

export default App;
