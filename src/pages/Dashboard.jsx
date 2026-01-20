import React from "react";
import { useAuth } from "../context/AuthContext";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import TeamLeadDashboard from "../components/dashboard/TeamLeadDashboard";
import EmployeeDashboard from "../components/dashboard/EmployeeDashboard";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            </div>

            {user.role === 'admin' && <AdminDashboard />}
            {user.role === 'team_lead' && <TeamLeadDashboard />}
            {user.role === 'employee' && <EmployeeDashboard />}
        </div>
    );
};

export default Dashboard;
