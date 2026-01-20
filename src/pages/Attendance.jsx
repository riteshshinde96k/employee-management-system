import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Clock, Calendar, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";

// Mock data
const mockAttendanceData = [
    { id: 1, date: "2026-01-20", employee: "John Doe", inTime: "09:00 AM", outTime: "06:00 PM", status: "Present", hours: "9h" },
    { id: 2, date: "2026-01-20", employee: "Jane Smith", inTime: "09:15 AM", outTime: "06:15 PM", status: "Late", hours: "9h" },
    { id: 3, date: "2026-01-20", employee: "Bob Johnson", inTime: "-", outTime: "-", status: "Absent", hours: "0h" },
    { id: 4, date: "2026-01-19", employee: "John Doe", inTime: "08:55 AM", outTime: "05:55 PM", status: "Present", hours: "9h" },
    { id: 5, date: "2026-01-19", employee: "Jane Smith", inTime: "09:00 AM", outTime: "06:00 PM", status: "Present", hours: "9h" },
];

const monthlyAttendance = [
    { date: "Jan 1", status: "Present", in: "09:00", out: "18:00" },
    { date: "Jan 2", status: "Present", in: "09:05", out: "18:10" },
    { date: "Jan 3", status: "Late", in: "09:30", out: "18:30" },
    { date: "Jan 4", status: "Present", in: "08:55", out: "18:05" },
    { date: "Jan 5", status: "Present", in: "09:00", out: "18:00" },
    { date: "Jan 6", status: "Weekend", in: "-", out: "-" },
    { date: "Jan 7", status: "Weekend", in: "-", out: "-" },
    { date: "Jan 8", status: "Present", in: "09:00", out: "18:00" },
];

const Attendance = () => {
    const { user } = useAuth();
    const [view, setView] = useState("daily"); // daily or monthly
    const [punchInTime, setPunchInTime] = useState(null);

    const handlePunchIn = () => {
        const now = new Date();
        setPunchInTime(format(now, "hh:mm a"));
    };

    const handlePunchOut = () => {
        setPunchInTime(null);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Present":
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case "Late":
                return <AlertCircle className="h-4 w-4 text-yellow-600" />;
            case "Absent":
                return <XCircle className="h-4 w-4 text-red-600" />;
            default:
                return <Clock className="h-4 w-4 text-gray-400" />;
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            Present: "bg-green-100 text-green-800",
            Late: "bg-yellow-100 text-yellow-800",
            Absent: "bg-red-100 text-red-800",
            Weekend: "bg-gray-100 text-gray-800"
        };
        return badges[status] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                        variant={view === "daily" ? "default" : "outline"}
                        onClick={() => setView("daily")}
                        className="flex-1 sm:flex-none"
                    >
                        Daily View
                    </Button>
                    <Button
                        variant={view === "monthly" ? "default" : "outline"}
                        onClick={() => setView("monthly")}
                        className="flex-1 sm:flex-none"
                    >
                        Monthly View
                    </Button>
                </div>
            </div>

            {/* Punch In/Out Card - Only for Employees */}
            {user.role === "employee" && (
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Today's Attendance</h3>
                                <p className="text-sm text-muted-foreground">
                                    {punchInTime ? `Punched in at ${punchInTime}` : "Mark your attendance for today"}
                                </p>
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                                {!punchInTime ? (
                                    <Button size="lg" onClick={handlePunchIn} className="gap-2 w-full sm:w-auto">
                                        <Clock className="h-4 w-4" /> Punch In
                                    </Button>
                                ) : (
                                    <Button variant="destructive" size="lg" onClick={handlePunchOut} className="gap-2 w-full sm:w-auto">
                                        <Clock className="h-4 w-4" /> Punch Out
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Daily View */}
            {view === "daily" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Daily Attendance - {format(new Date(), "MMMM dd, yyyy")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="text-left p-3 font-medium">Employee</th>
                                        <th className="text-left p-3 font-medium">In Time</th>
                                        <th className="text-left p-3 font-medium">Out Time</th>
                                        <th className="text-left p-3 font-medium">Total Hours</th>
                                        <th className="text-left p-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockAttendanceData
                                        .filter(a => a.date === "2026-01-20")
                                        .map((record) => (
                                            <tr key={record.id} className="border-b hover:bg-muted/30 transition-colors">
                                                <td className="p-3">{record.employee}</td>
                                                <td className="p-3 text-muted-foreground">{record.inTime}</td>
                                                <td className="p-3 text-muted-foreground">{record.outTime}</td>
                                                <td className="p-3 font-medium">{record.hours}</td>
                                                <td className="p-3">
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(record.status)}
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(record.status)}`}>
                                                            {record.status}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Monthly View */}
            {view === "monthly" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Attendance - January 2026</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            {monthlyAttendance.map((day, idx) => (
                                <div
                                    key={idx}
                                    className={`p-4 rounded-lg border-2 ${day.status === "Weekend" ? "bg-gray-50 border-gray-200" : "bg-white border-border"
                                        } hover:shadow-md transition-shadow`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-sm">{day.date}</span>
                                        {getStatusIcon(day.status)}
                                    </div>
                                    <div className="space-y-1 text-xs text-muted-foreground">
                                        <p>In: {day.in}</p>
                                        <p>Out: {day.out}</p>
                                    </div>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-2 ${getStatusBadge(day.status)}`}>
                                        {day.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Summary Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">22</div>
                        <p className="text-xs text-muted-foreground mt-1">Present Days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-yellow-600">2</div>
                        <p className="text-xs text-muted-foreground mt-1">Late Days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-red-600">1</div>
                        <p className="text-xs text-muted-foreground mt-1">Absent Days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-600">95%</div>
                        <p className="text-xs text-muted-foreground mt-1">Attendance Rate</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Attendance;
