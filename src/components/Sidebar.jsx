import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    const menuItems = [
        { label: "Students", path: "/students" },
        { label: "Presences", pash: "/presences" },
        { label: "Reports", path: "/reports" },
    ];

    return (
        <div className="w-64 h-screen bg-black text-white flex flex-col shadow-lg">
          <div className="p-6 text-red-600 font-extrabold text-2xl border-b border-red-700">
            HAWKS CHECK
          </div>
          <nav className="flex-1 p-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded-lg mb-2 transition-all 
                  ${
                    location.pathname === item.path
                      ? "bg-red-600 text-white"
                      : "hover:bg-red-700 hover:text-white"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      );
    }
    
    export default Sidebar;