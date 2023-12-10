import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { MainLayout } from "./utility/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ProposerEmailVerify,
  ProposerForgotPassword,
  ProposerRegister,
  ProposerResetPassword,
} from "./pages/proposer";
import Error404 from "./pages/Error404";

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
            <Route path="*" element={<Error404 />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
