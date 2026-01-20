import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Calendar, Check, X, Clock, FileText } from "lucide-react";

// Mock leave data
const mockLeaveRequests = [
    { id: 1, employee: "John Doe", type: "Sick Leave", from: "2026-01-25", to: "2026-01-26", days: 2, status: "Pending", reason: "Medical checkup" },
    { id: 2, employee: "Jane Smith", type: "Casual Leave", from: "2026-01-28", to: "2026-01-28", days: 1, status: "Approved", reason: "Personal work" },
    { id: 3, employee: "Bob Johnson", type: "Annual Leave", from: "2026-02-01", to: "2026-02-05", days: 5, status: "Pending", reason: "Family vacation" },
];

const myLeaveHistory = [
    { id: 1, type: "Sick Leave", from: "2026-01-10", to: "2026-01-11", days: 2, status: "Approved" },
    { id: 2, type: "Casual Leave", from: "2025-12-24", to: "2025-12-25", days: 2, status: "Approved" },
    { id: 3, type: "Annual Leave", from: "2025-11-15", to: "2025-11-20", days: 6, status: "Approved" },
];

const Leaves = () => {
    const { user } = useAuth();
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [leaveType, setLeaveType] = useState("Sick Leave");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reason, setReason] = useState("");

    const handleApplyLeave = (e) => {
        e.preventDefault();
        // Mock submission
        alert(`Leave application submitted!\nType: ${leaveType}\nFrom: ${fromDate}\nTo: ${toDate}`);
        setShowApplyForm(false);
        setFromDate("");
        setToDate("");
        setReason("");
    };

    const handleApprove = (id) => {
        alert(`Leave request #${id} approved!`);
    };

    const handleReject = (id) => {
        alert(`Leave request #${id} rejected!`);
    };

    const getStatusBadge = (status) => {
        const badges = {
            Pending: "bg-yellow-100 text-yellow-800",
            Approved: "bg-green-100 text-green-800",
            Rejected: "bg-red-100 text-red-800",
        };
        return badges[status] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
                <Button onClick={() => setShowApplyForm(!showApplyForm)} className="gap-2">
                    <Calendar className="h-4 w-4" />
                    {showApplyForm ? "Cancel" : "Apply for Leave"}
                </Button>
            </div>

            {/* Leave Balance Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-600">12</div>
                        <p className="text-xs text-muted-foreground mt-1">Annual Leave</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">8</div>
                        <p className="text-xs text-muted-foreground mt-1">Sick Leave</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-purple-600">5</div>
                        <p className="text-xs text-muted-foreground mt-1">Casual Leave</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-orange-600">10</div>
                        <p className="text-xs text-muted-foreground mt-1">Used This Year</p>
                    </CardContent>
                </Card>
            </div>

            {/* Apply Leave Form */}
            {showApplyForm && (
                <Card className="border-primary/50">
                    <CardHeader>
                        <CardTitle>Apply for Leave</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleApplyLeave} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Leave Type</label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={leaveType}
                                        onChange={(e) => setLeaveType(e.target.value)}
                                        required
                                    >
                                        <option value="Sick Leave">Sick Leave</option>
                                        <option value="Casual Leave">Casual Leave</option>
                                        <option value="Annual Leave">Annual Leave</option>
                                        <option value="Maternity Leave">Maternity Leave</option>
                                        <option value="Paternity Leave">Paternity Leave</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Number of Days</label>
                                    <Input type="number" min="0.5" step="0.5" defaultValue="1" required />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">From Date</label>
                                    <Input
                                        type="date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">To Date</label>
                                    <Input
                                        type="date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Reason</label>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    placeholder="Please provide a reason for your leave..."
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full">Submit Leave Application</Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Pending Leave Requests (for Admin & Team Lead) */}
            {(user.role === "admin" || user.role === "team_lead") && (
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Leave Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {mockLeaveRequests
                                .filter(leave => leave.status === "Pending")
                                .map((leave) => (
                                    <div key={leave.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold">{leave.employee}</h4>
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(leave.status)}`}>
                                                        {leave.status}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-muted-foreground space-y-1">
                                                    <p className="flex items-center gap-2">
                                                        <FileText className="h-3 w-3" />
                                                        <span className="font-medium">{leave.type}</span>
                                                    </p>
                                                    <p className="flex items-center gap-2">
                                                        <Calendar className="h-3 w-3" />
                                                        {leave.from} to {leave.to} ({leave.days} {leave.days > 1 ? 'days' : 'day'})
                                                    </p>
                                                    <p className="italic">Reason: {leave.reason}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="default"
                                                    className="gap-1"
                                                    onClick={() => handleApprove(leave.id)}
                                                >
                                                    <Check className="h-3 w-3" /> Approve
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    className="gap-1"
                                                    onClick={() => handleReject(leave.id)}
                                                >
                                                    <X className="h-3 w-3" /> Reject
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Leave History */}
            <Card>
                <CardHeader>
                    <CardTitle>Leave History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="text-left p-3 font-medium">Type</th>
                                    <th className="text-left p-3 font-medium">From</th>
                                    <th className="text-left p-3 font-medium">To</th>
                                    <th className="text-left p-3 font-medium">Days</th>
                                    <th className="text-left p-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myLeaveHistory.map((leave) => (
                                    <tr key={leave.id} className="border-b hover:bg-muted/30 transition-colors">
                                        <td className="p-3 font-medium">{leave.type}</td>
                                        <td className="p-3 text-muted-foreground">{leave.from}</td>
                                        <td className="p-3 text-muted-foreground">{leave.to}</td>
                                        <td className="p-3">{leave.days}</td>
                                        <td className="p-3">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(leave.status)}`}>
                                                {leave.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Leaves;
