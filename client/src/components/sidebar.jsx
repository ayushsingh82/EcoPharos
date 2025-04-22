"use client"

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Home, Plane, Car, Leaf, Settings, HelpCircle } from "lucide-react"

const routes = [
  {
    name: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    name: "Electricity Oracle",
    path: "/electricity",
    icon: Leaf,
  },
  {
    name: "Flight Oracle",
    path: "/flight",
    icon: Plane,
  },
  {
    name: "Vehicle Oracle",
    path: "/vehicle",
    icon: Car,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    name: "Help",
    path: "/help",
    icon: HelpCircle,
  },
]

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="w-64 bg-gray-800 text-white h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Carbon Oracle Suite</h1>
        <p className="text-sm text-gray-400">Pharos Network</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {routes.map((route) => (
            <li key={route.path} className="mb-2">
              <Link
                to={route.path}
                className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors ${
                  location.pathname === route.path ? 'bg-gray-700 text-white' : ''
                }`}
              >
                <span className="material-icons mr-3">{route.icon.toString()}</span>
                <span>{route.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm">Connected to Pharos</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
