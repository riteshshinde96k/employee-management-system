import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { User, Lock, ArrowRight } from "lucide-react";

const Login = () => {
    const [role, setRole] = useState("employee");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login logic
        let name = "John Doe";
        if (role === "admin") name = "Admin User";
        if (role === "team_lead") name = "Team Lead User";

        login(role, name);
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary mb-2">EMS Portal</h1>
                    <p className="text-muted-foreground">Employee Management System</p>
                </div>

                <Card className="border-t-4 border-t-primary shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
                        <p className="text-center text-sm text-muted-foreground">Sign in to your account</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Select Role (For Demo)
                                </label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="admin">Admin / Owner</option>
                                    <option value="team_lead">Team Lead</option>
                                    <option value="employee">Employee</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="email"
                                        placeholder="Email address"
                                        className="pl-10"
                                        defaultValue="demo@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        className="pl-10"
                                        defaultValue="password"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                    <span className="text-muted-foreground">Remember me</span>
                                </label>
                                <a href="#" className="text-primary hover:underline font-medium">Forgot password?</a>
                            </div>

                            <Button type="submit" className="w-full transition-all hover:scale-[1.02]">
                                Sign In <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    &copy; 2024 Employee Management System. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
