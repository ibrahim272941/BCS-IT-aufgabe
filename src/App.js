import "./App.css";
import AppRouter from "./router/AppRouter";
import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
