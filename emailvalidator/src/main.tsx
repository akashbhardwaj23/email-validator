import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import OtpVerify from "./components/OtpVerify.tsx";
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import DashBoard from "./Dashboard.tsx";

const RootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
});

const IndexRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: () => (
    <App />
  ),
});



const SignInRoute = createRoute({
  getParentRoute : () => RootRoute,
  path : "/signin",
  component : () => (
    <SignIn />
  )
})

const SignUpRoute = createRoute({
  getParentRoute : () => RootRoute,
  path : "/signup",
  component : () => (
    <SignUp />
  )
})

const OtpRoute = createRoute({
  getParentRoute : () => RootRoute,
  path : "/verify",
  component : () => (
    <OtpVerify />
  )
})


const DashBoardRoute = createRoute({
  getParentRoute : () => RootRoute,
  beforeLoad : () => {
    const isOtpValid = localStorage.getItem("verified")

    if(!isOtpValid){
      throw redirect({to : "/signin"})
    }
  },
  path : "/dashboard",
  component : () => (
    <DashBoard />
  )
})

const routeTree = RootRoute.addChildren([IndexRoute,SignInRoute, SignUpRoute, OtpRoute, DashBoardRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
      router : typeof router
  }
}

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
