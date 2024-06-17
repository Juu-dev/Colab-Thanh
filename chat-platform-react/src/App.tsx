import { enableMapSet } from "immer";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ConversationPageGuard, GroupPageGuard } from "@-guards";
import { AppWithProviders } from "@-utils/context/Providers";

import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { AppPage } from "./pages/AppPage";
import { CallsPage } from "./pages/calls/CallsPage";
import { CurrentCallPage } from "./pages/calls/CurrentCallPage";
import { ConversationChannelPage } from "./pages/conversations/ConversationChannelPage";
import { ConversationPage } from "./pages/conversations/ConversationPage";
import { FriendRequestPage } from "./pages/friends/FriendRequestPage";
import { FriendsLayoutPage } from "./pages/friends/FriendsLayoutPage";
import { GroupChannelPage } from "./pages/group/GroupChannelPage";
import { GroupPage } from "./pages/group/GroupPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SettingsAppearancePage } from "./pages/settings/SettingsAppearancePage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { SettingsProfilePage } from "./pages/settings/SettingsProfilePage";

enableMapSet();

function App() {
  return (
    <AppWithProviders>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthenticatedRoute children={<AppPage />} />}>
          <Route path="conversations" element={<ConversationPage />}>
            <Route
              path=":id"
              element={
                <ConversationPageGuard children={<ConversationChannelPage />} />
              }
            />
          </Route>
          <Route path="groups" element={<GroupPage />}>
            <Route
              path=":id"
              element={<GroupPageGuard children={<GroupChannelPage />} />}
            />
          </Route>
          <Route path="friends" element={<FriendsLayoutPage />}>
            <Route path="requests" element={<FriendRequestPage />} />
            <Route path="blocked" element={<div>Blocked</div>} />
          </Route>
          <Route path="settings" element={<SettingsPage />}>
            <Route path="profile" element={<SettingsProfilePage />} />
            <Route path="appearance" element={<SettingsAppearancePage />} />
          </Route>
          <Route path="calls" element={<CallsPage />}>
            <Route path="current" element={<CurrentCallPage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer theme="dark" />
    </AppWithProviders>
  );
}

export default App;
