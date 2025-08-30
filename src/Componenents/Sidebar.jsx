import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const role = decoded.role;

  const adminMenu = [
    { label: "Dashboard", path: "/adminStats" },
    { label: "Assign Task", path: "/dashboard" }
  ];
  const empMenu = [
    { label: "Dashboard", path: "/empStats" },
    { label: "View Task", path: "/empDashboard" }
  ];

  const menu = role === "employee" ? empMenu : adminMenu;

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-900 w-64 p-6 text-white z-50 border-r border-gray-700 shadow-xl transform transition-transform md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-white">
          Dashboard
        </h2>
        <ul className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              onClick={onClose} // close sidebar on link click
            >
              <span className="text-white font-medium">{item.label}</span>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
