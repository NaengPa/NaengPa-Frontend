import { BrowserRouter, Route, Routes } from "react-router-dom";
import pages from "./page";
import Navigation from "../components/navigation";
import styled from "styled-components";
import ScrollToTop from "../components/ScrollToTop";

import ProtectedRoute from "./protectedRoute";

const RootRoute = () => {
  const token = localStorage.getItem("token");
  return (
    <RouteWrapper>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ScrollToTop />
        <Navigation></Navigation>
        <Routes>

          {pages.map((r) => {
            const isAuthenticated = r.isPublic || token;
            return (
              <Route
                key={r.pathname}
                path={r.pathname}
                element={
                  <ProtectedRoute
                    token={token}
                    pathname={r.pathname}
                    isAuthenticated={isAuthenticated}
                  >
                    {r.element}
                  </ProtectedRoute>
                }
              />
            );
          })}/>

        </Routes>
      </BrowserRouter>
    </RouteWrapper>
  );
};

export default RootRoute;
const RouteWrapper = styled.div`
  max-width: 420px;
  margin: auto;
  border: 1px solid #f0f0f096;
`;
