import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { MainLayout } from "./utility/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  CreateOrUpdateProposal,
  MembershipExpired,
  ProposalStatusView,
  ProposerEmailVerify,
  ProposerForgotPassword,
  ProposerRegister,
  ProposerResetPassword,
} from "./pages/proposer";
import Error404 from "./pages/Error404";
import { ProposerProtectedRoute } from "./middlewares/protectedRoutes";
import Error500 from "./pages/Error500";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proposer-register" element={<ProposerRegister />} />
            <Route
              path="/proposer-email-verify"
              element={<ProposerEmailVerify />}
            />
            <Route
              path="/proposer-forgot-password"
              element={<ProposerForgotPassword />}
            />
            <Route
              path="/proposer-reset-password"
              element={<ProposerResetPassword />}
            />
            <Route element={<ProposerProtectedRoute />}>
              <Route path="/cu-proposal" element={<CreateOrUpdateProposal />} />
              <Route
                path="/membership-expired"
                element={<MembershipExpired />}
              />
              <Route path="/proposer-status" element={<ProposalStatusView />} />
            </Route>
            <Route path="/error-500" element={<Error500 />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
