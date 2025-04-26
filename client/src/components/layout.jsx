import React from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "./theme-provider";
import { Home, Leaf, Plane, Car, BarChart3, Settings, HelpCircle } from "./icons";

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-10 w-64 border-r bg-card px-4 py-6">
          <div className="flex items-center gap-2 font-semibold">
            <Leaf className="h-6 w-6 text-green-500" />
            <span className="text-lg">EcoPharos</span>
          </div>
          <nav className="mt-8 space-y-1.5">
            <Link
              to="/"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/electricity"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <Leaf className="mr-2 h-4 w-4" />
              Electricity Oracle
            </Link>
            <Link
              to="/flight"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <Plane className="mr-2 h-4 w-4" />
              Flight Oracle
            </Link>
            <Link
              to="/vehicle"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <Car className="mr-2 h-4 w-4" />
              Vehicle Oracle
            </Link>
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
                Analytics
              </h3>
              <Link
                to="/"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Reports
              </Link>
              <Link
                to="/"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
              <Link
                to="/"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </Link>
            </div>
          </nav>
        </aside>
        <main className="flex-1 pl-64">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
