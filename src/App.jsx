import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from "react";
import Layout from "@/components/organisms/Layout";
import Documents from "@/components/pages/Documents";
import Applications from "@/components/pages/Applications";
import ApplicationDetail from "@/components/pages/ApplicationDetail";
import Clients from "@/components/pages/Clients";
import Validation from "@/components/pages/Validation";
import Dashboard from "@/components/pages/Dashboard";
import Settings from "@/components/pages/Settings";

function App() {
  return (
    <>
<Routes>
<Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="applications" element={<Applications />} />
          <Route path="applications/:id" element={<ApplicationDetail />} />
          <Route path="clients" element={<Clients />} />
          <Route path="documents" element={<Documents />} />
            <Route path="validation" element={<Validation />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="toast-container"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;