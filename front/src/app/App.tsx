import Routing from "./providers/Router";
import { AuthProvider } from "../shared/lib/guards/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Routing />
    </AuthProvider>
  );
}

export default App;
