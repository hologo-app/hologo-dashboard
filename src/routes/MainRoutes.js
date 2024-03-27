import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "components/ui-component/Loadable";
import RequireAuth from "components/auth/RequireAuth";
// import Lenses from 'views/lens';

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);
const LensPage = Loadable(lazy(() => import("views/lens")));


// ==============================|| MAIN ROUTING ||============================== //

const ROLES = ["Admin","Moderator"]


const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <RequireAuth allowedRoles={ROLES[0]} />,
      children: [{ path: "/", element: <DashboardDefault /> }],
    },
    {
      path: "dashboard",
      element: <RequireAuth allowedRoles={ROLES[0]} />, // Here
      children: [
        {
          path: "default",
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: "lenses",
      element: <RequireAuth allowedRoles={ROLES[0]} />, // Here
      children: [
        {
          path: "",
          element: <LensPage />,
        },
      ],
    },
  ],
};

export default MainRoutes;
