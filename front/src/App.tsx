import React, { createContext } from "react";
import WelcomePage from "./container/welcomepage";
import AuthRoute from "./component/page";
import { BrowserRouter, Routes, Route } from "react-router-dom";

type authContextData = {
  isLogged: boolean;
  login: (status: boolean) => void;
};

const AuthContext = createContext<authContextData | null>(null);

function App() {
  const [isLogged, login] = React.useState(false);

  return (
    <AuthContext.Provider value={{ isLogged, login }}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <WelcomePage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            // element={
            //   <AuthRoute>
            //     <SignupPage />
            //   </AuthRoute>
            // }
          />
          <Route
            path="/signup-confirm"
            // element={
            //   <PrivateRoute>
            //     <SignupConfirmPage />
            //   </PrivateRoute>
            // }
          />
          <Route
            path="/signin"
            // element={
            //   <AuthRoute>
            //     <SigninPage />
            //   </AuthRoute>
            // }
          />
          <Route
            path="/recovery"
            // element={
            //   <AuthRoute>
            //     <RecoveryPage />
            //   </AuthRoute>
            // }
          />
          <Route
            path="/recovery-confirm"
            // element={
            //   <AuthRoute>
            //     <RecoveryConfirmPage />
            //   </AuthRoute>
            // }
          />
          <Route
            path="/balance"
            // element={
            //   <PrivateRoute>
            //     <BalancePage />
            //   </PrivateRoute>
            // }
          />
          <Route
            path="/notifications"
            // element={
            //   <PrivateRoute>
            //     <NotificationsPage />
            //   </PrivateRoute>
            // }
          />
          <Route
            path="/settings"
            // element={
            //   <PrivateRoute>
            //     <SettingsPage />
            //   </PrivateRoute>
            // }
          />
          <Route
            path="/recive"
            // element={
            //   <PrivateRoute>
            //     <RecivePage />
            //   </PrivateRoute>
            // }
          />
          <Route
            path="/send"
            // element={
            //   <PrivateRoute>
            //     <SendPage />
            //   </PrivateRoute>
            // }
          />
          <Route
            path="/transaction/:transactionId"
            // element={
            //   <PrivateRoute>
            //     <TransactionPage />
            //   </PrivateRoute>
            // }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
