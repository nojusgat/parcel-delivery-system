import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RolesAuthRoute } from "./utils/others";
import React, { Suspense } from "react";
import { Loader } from "./components/loader";
import Parcels from "./pages/parcels";
import ManageParcels from "./pages/manageParcels";

const Home = React.lazy(() => import("./pages/home"));
const Deliveries = React.lazy(() => import("./pages/deliveries"));

export function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/deliveries"
            element={
              <RolesAuthRoute role="Courier">
                <Deliveries />
              </RolesAuthRoute>
            }
          />
          <Route
            path="/parcels"
            element={
              <RolesAuthRoute role="Courier">
                <Parcels />
              </RolesAuthRoute>
            }
          />
          <Route
            path="/manage-couriers"
            element={
              <RolesAuthRoute role="Admin">
                <Home />
              </RolesAuthRoute>
            }
          />
          <Route
            path="/manage-parcels"
            element={
              <RolesAuthRoute role="Admin">
                <ManageParcels />
              </RolesAuthRoute>
            }
          />
          <Route
            path="/manage-cars"
            element={
              <RolesAuthRoute role="Admin">
                <Home />
              </RolesAuthRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}
