import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "LayoutDashboard" },
    { path: "/applications", label: "Applications", icon: "FileText" },
    { path: "/clients", label: "Clients", icon: "Users" },
    { path: "/documents", label: "Documents", icon: "FolderOpen" },
    { path: "/validation", label: "Validation", icon: "Shield" },
    { path: "/settings", label: "Settings", icon: "Settings" }
  ];

  const MenuItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          cn(
            "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group",
            isActive
              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
              : "text-gray-600 hover:bg-primary/5 hover:text-primary"
          )
        }
        onClick={() => window.innerWidth < 1024 && onClose?.()}
      >
        {({ isActive }) => (
          <>
            <ApperIcon 
              name={item.icon} 
              className={cn(
                "w-5 h-5 transition-colors duration-200",
                isActive 
                  ? "text-white" 
                  : "text-gray-500 group-hover:text-primary"
              )} 
            />
            <span className="font-medium">{item.label}</span>
          </>
        )}
      </NavLink>
    );
  };

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:block w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-40">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="FileCheck" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">VisaFlow Pro</h1>
            <p className="text-sm text-gray-500">Immigration Automation</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <MenuItem key={item.path} item={item} />
          ))}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20">
          <div className="flex items-center space-x-2 mb-2">
            <ApperIcon name="Zap" className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-gray-900">Quick Stats</span>
          </div>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Active Applications</span>
              <span className="font-medium">5</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate</span>
              <span className="font-medium text-success">98%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar Overlay
  const MobileSidebar = () => (
    <>
      {/* Backdrop */}
      <motion.div
        className="lg:hidden fixed inset-0 bg-black/50 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ display: isOpen ? "block" : "none" }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.div
        className="lg:hidden fixed left-0 top-0 h-full w-64 bg-white z-50 shadow-xl"
        initial={{ x: -256 }}
        animate={{ x: isOpen ? 0 : -256 }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="FileCheck" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">VisaFlow Pro</h1>
                <p className="text-sm text-gray-500">Immigration Automation</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <MenuItem key={item.path} item={item} />
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;