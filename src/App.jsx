import { Route } from "wouter";
import IndexPage from "./pages/index";

function App() {
  return (
    <div>
      <Route path="/">
        <IndexPage />
      </Route>
    </div>
  );
}

export default App;
