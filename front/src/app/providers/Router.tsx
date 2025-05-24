import WelcomePage from "@pages/home/welcome-page/ui/WelcomePage";
import SignupPage from "@pages/auth/sign-up-page/ui/SignupPage";
import SignupConfirmPage from "@pages/auth/sign-up-confirm-page/ui/SignupConfirmPage";
import SigninPage from "@pages/auth/sign-in-page/ui/SigninPage";
import RecoveryPage from "@pages/auth/recovery-page/ui/RecoveryPage";
import RecoveryConfirmPage from "@pages/auth/recovery-confirm-page/ui/RecoveryConfirmPage";
import BalancePage from "@pages/home/balance-page/ui/BalancePage";
import NotificationsPage from "@pages/notifications/notification-page/ui/NotificationsPage";
import SettingsPage from "@pages/settings/ui/SettingsPage";
import RecivePage from "@pages/transactions/recive/ui/ReceivePage";
import SendPage from "@pages/transactions/send/ui/SendPage";
import TransactionInfoPage from "@pages/transactions/transaction-info-page/ui/TransactionsPageInfo";
import NotificationInfoPage from "@pages/notifications/notification-info-page/ui/NotificationInfoPage";
import { PrivateRoute, AuthRoute } from "@shared/lib";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Routing() {
  return (
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
          element={
            <AuthRoute>
              <SignupPage />
            </AuthRoute>
          }
        />
        <Route
          path="/signup-confirm"
          element={
            <PrivateRoute>
              <SignupConfirmPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <AuthRoute>
              <SigninPage />
            </AuthRoute>
          }
        />
        <Route
          path="/recovery"
          element={
            <AuthRoute>
              <RecoveryPage />
            </AuthRoute>
          }
        />
        <Route
          path="/recovery-confirm"
          element={
            <AuthRoute>
              <RecoveryConfirmPage />
            </AuthRoute>
          }
        />
        <Route
          path="/balance"
          element={
            <PrivateRoute>
              <BalancePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <NotificationsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/recive"
          element={
            <PrivateRoute>
              <RecivePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/send"
          element={
            <PrivateRoute>
              <SendPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction/:transactionId"
          element={
            <PrivateRoute>
              <TransactionInfoPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/notification/:notificationId"
          element={
            <PrivateRoute>
              <NotificationInfoPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
