import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    LogOut,
    Briefcase,
    Menu,
    X
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const Layout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    if (!user) return null;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const NavItem = ({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;
        return (
            <Link to={to}>
                <div className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group relative",
                    isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    !isSidebarOpen && "justify-center px-2"
                )}>
                    <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                    <span className={cn(
                        "whitespace-nowrap transition-all duration-300 overflow-hidden",
                        isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
                    )}>
                        {label}
                    </span>
                    {/* Tooltip for collapsed state */}
                    {!isSidebarOpen && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                            {label}
                        </div>
                    )}
                </div>
            </Link>
        );
    };

    // Role based links could be filtered here, but for now I'll show common ones
    // and specific ones will be protected by routes or conditionally rendered

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "bg-white border-r fixed md:static inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out flex flex-col",
                    isSidebarOpen ? "w-64 translate-x-0 shadow-xl md:shadow-none" : "-translate-x-full md:w-20 md:translate-x-0"
                )}
            >
                <div className="h-16 flex items-center justify-between px-4 border-b shrink-0">
                    <div className={cn("flex items-center gap-2 font-bold text-xl text-primary overflow-hidden whitespace-nowrap")}>
                        <Briefcase className="h-6 w-6 shrink-0" />
                        <span className={cn("transition-all duration-300", isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 md:w-0")}>
                            EMS
                        </span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />

                    {(user.role === 'admin' || user.role === 'team_lead') && (
                        <NavItem to="/employees" icon={Users} label="Employees" />
                    )}

                    <NavItem to="/attendance" icon={Calendar} label="Attendance" />
                    <NavItem to="/leaves" icon={FileText} label="Leave Management" />
                    <NavItem to="/calendar" icon={Calendar} label="Holiday Calendar" />
                    <NavItem to="/salary" icon={Briefcase} label="Salary & Payslips" />
                </div>

                <div className="p-4 border-t bg-gray-50/50">
                    <div className={cn("flex items-center gap-3 mb-4", !isSidebarOpen && "justify-center")}>
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {user.name.charAt(0)}
                        </div>
                        {isSidebarOpen && (
                            <div className="overflow-hidden">
                                <p className="font-medium text-sm truncate">{user.name}</p>
                                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                            </div>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10", !isSidebarOpen && "justify-center px-0")}
                        onClick={handleLogout}
                    >
                        <LogOut className="h-5 w-5" />
                        {isSidebarOpen && <span className="ml-2">Logout</span>}
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
                <header className="h-16 border-b bg-white flex items-center justify-between px-4 sticky top-0 z-40">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-md hover:bg-muted text-muted-foreground"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
