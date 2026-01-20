import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Mail, Phone, MapPin, Briefcase, Plus, Edit, Trash2 } from "lucide-react";

// Mock employee data
const mockEmployees = [
    { id: 1, name: "John Doe", role: "Senior Developer", department: "Engineering", email: "john@example.com", phone: "+1 234 567 8901", location: "New York", status: "Active", team: "Frontend" },
    { id: 2, name: "Jane Smith", role: "Product Manager", department: "Product", email: "jane@example.com", phone: "+1 234 567 8902", location: "San Francisco", status: "Active", team: "Product" },
    { id: 3, name: "Bob Johnson", role: "DevOps Engineer", department: "Engineering", email: "bob@example.com", phone: "+1 234 567 8903", location: "Austin", status: "Active", team: "DevOps" },
    { id: 4, name: "Alice Williams", role: "UX Designer", department: "Design", email: "alice@example.com", phone: "+1 234 567 8904", location: "Seattle", status: "Active", team: "Design" },
    { id: 5, name: "Charlie Brown", role: "Backend Developer", department: "Engineering", email: "charlie@example.com", phone: "+1 234 567 8905", location: "Boston", status: "Active", team: "Backend" },
];

const Employees = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterDepartment, setFilterDepartment] = useState("All");

    const filteredEmployees = mockEmployees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDepartment = filterDepartment === "All" || emp.department === filterDepartment;
        return matchesSearch && matchesDepartment;
    });

    const departments = ["All", ...new Set(mockEmployees.map(emp => emp.department))];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Employee Directory</h1>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Employee
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-600">{mockEmployees.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total Employees</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">{mockEmployees.filter(e => e.department === "Engineering").length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Engineering</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-purple-600">{mockEmployees.filter(e => e.status === "Active").length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Active</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-orange-600">8</div>
                        <p className="text-xs text-muted-foreground mt-1">New This Month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filter */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, role, or email..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <select
                            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm md:w-48"
                            value={filterDepartment}
                            onChange={(e) => setFilterDepartment(e.target.value)}
                        >
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept} Department</option>
                            ))}
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Employee Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredEmployees.map((employee) => (
                    <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                        {employee.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{employee.name}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{employee.role}</p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {employee.status}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Briefcase className="h-4 w-4" />
                                    <span>{employee.department} - {employee.team}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span className="truncate">{employee.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>{employee.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{employee.location}</span>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4 pt-4 border-t">
                                <Button size="sm" variant="outline" className="flex-1 gap-1">
                                    <Edit className="h-3 w-3" /> Edit
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                                    <Trash2 className="h-3 w-3" /> Remove
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredEmployees.length === 0 && (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">No employees found matching your criteria.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Employees;
