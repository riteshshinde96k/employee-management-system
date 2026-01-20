import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Download, Eye, TrendingUp, Calendar } from "lucide-react";

// Mock salary data
const salaryBreakdown = {
    month: "January 2026",
    basicSalary: 3000,
    hra: 1200,
    transportAllowance: 300,
    specialAllowance: 500,
    bonus: 200,
    providentFund: 360,
    tax: 450,
    insurance: 100,
    workingDays: 22,
    presentDays: 21,
    leaveDays: 1,
};

const payslipHistory = [
    { month: "January 2026", gross: 5200, deductions: 910, net: 4290, status: "Paid" },
    { month: "December 2025", gross: 5200, deductions: 910, net: 4290, status: "Paid" },
    { month: "November 2025", gross: 5200, deductions: 910, net: 4290, status: "Paid" },
    { month: "October 2025", gross: 5000, deductions: 850, net: 4150, status: "Paid" },
];

const Salary = () => {
    const [showPayslip, setShowPayslip] = useState(false);

    const grossSalary =
        salaryBreakdown.basicSalary +
        salaryBreakdown.hra +
        salaryBreakdown.transportAllowance +
        salaryBreakdown.specialAllowance +
        salaryBreakdown.bonus;

    const totalDeductions =
        salaryBreakdown.providentFund +
        salaryBreakdown.tax +
        salaryBreakdown.insurance;

    const netSalary = grossSalary - totalDeductions;

    // Attendance-based calculation
    const dailySalary = (salaryBreakdown.basicSalary / salaryBreakdown.workingDays).toFixed(2);
    const attendanceImpact = (dailySalary * (salaryBreakdown.workingDays - salaryBreakdown.presentDays)).toFixed(2);

    const handleDownloadPayslip = () => {
        alert("Payslip downloaded successfully!");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Salary & Payslips</h1>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" onClick={() => setShowPayslip(!showPayslip)} className="flex-1 sm:flex-none gap-2">
                        <Eye className="h-4 w-4" />
                        {showPayslip ? "Hide" : "View"} Payslip
                    </Button>
                    <Button onClick={handleDownloadPayslip} className="flex-1 sm:flex-none gap-2">
                        <Download className="h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-800 mb-1">Gross Salary</p>
                                <div className="text-3xl font-bold text-green-900">${grossSalary.toLocaleString()}</div>
                            </div>
                            <TrendingUp className="h-10 w-10 text-green-600 opacity-50" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-red-800 mb-1">Total Deductions</p>
                                <div className="text-3xl font-bold text-red-900">${totalDeductions.toLocaleString()}</div>
                            </div>
                            <TrendingUp className="h-10 w-10 text-red-600 opacity-50 rotate-180" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-800 mb-1">Net Salary</p>
                                <div className="text-3xl font-bold text-blue-900">${netSalary.toLocaleString()}</div>
                            </div>
                            <Calendar className="h-10 w-10 text-blue-600 opacity-50" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Payslip View */}
            {showPayslip && (
                <Card className="border-2 border-primary/20">
                    <CardHeader className="bg-primary/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl">Payslip for {salaryBreakdown.month}</CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">Employee Management System</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">Employee ID: EMP-12345</p>
                                <p className="text-sm text-muted-foreground">John Doe</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Earnings */}
                            <div>
                                <h3 className="font-semibold text-lg mb-4 text-green-700 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-green-600 rounded"></span>
                                    Earnings
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-muted-foreground">Basic Salary</span>
                                        <span className="font-medium">${salaryBreakdown.basicSalary.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-muted-foreground">House Rent Allowance (HRA)</span>
                                        <span className="font-medium">${salaryBreakdown.hra.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-muted-foreground">Transport Allowance</span>
                                        <span className="font-medium">${salaryBreakdown.transportAllowance.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-muted-foreground">Special Allowance</span>
                                        <span className="font-medium">${salaryBreakdown.specialAllowance.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-muted-foreground">Performance Bonus</span>
                                        <span className="font-medium">${salaryBreakdown.bonus.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between py-3 bg-green-50 px-3 rounded-lg mt-4">
                                        <span className="font-semibold text-green-800">Total Earnings</span>
                                        <span className="font-bold text-green-900">${grossSalary.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Deductions */}
                            <div>
                                <h3 className="font-semibold text-lg mb-4 text-red-700 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-red-600 rounded"></span>
                                    Deductions
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-muted-foreground">Provident Fund (PF)</span>
                                        <span className="font-medium">${salaryBreakdown.providentFund.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-muted-foreground">Income Tax (TDS)</span>
                                        <span className="font-medium">${salaryBreakdown.tax.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-muted-foreground">Health Insurance</span>
                                        <span className="font-medium">${salaryBreakdown.insurance.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between py-3 bg-red-50 px-3 rounded-lg mt-4">
                                        <span className="font-semibold text-red-800">Total Deductions</span>
                                        <span className="font-bold text-red-900">${totalDeductions.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Attendance Impact */}
                        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-semibold mb-3 text-blue-900">Attendance-Linked Calculation</h4>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p className="text-blue-700">Working Days</p>
                                    <p className="font-bold text-blue-900 text-lg">{salaryBreakdown.workingDays}</p>
                                </div>
                                <div>
                                    <p className="text-blue-700">Present Days</p>
                                    <p className="font-bold text-blue-900 text-lg">{salaryBreakdown.presentDays}</p>
                                </div>
                                <div>
                                    <p className="text-blue-700">Leave Days</p>
                                    <p className="font-bold text-blue-900 text-lg">{salaryBreakdown.leaveDays}</p>
                                </div>
                            </div>
                            <p className="text-xs text-blue-800 mt-3">
                                Daily Salary: ${dailySalary} | Leave Impact: ${attendanceImpact} (deducted from basic)
                            </p>
                        </div>

                        {/* Net Salary */}
                        <div className="mt-6 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm mb-1">Net Salary (Take Home)</p>
                                    <p className="text-4xl font-bold">${netSalary.toLocaleString()}</p>
                                </div>
                                <div className="text-right text-sm">
                                    <p className="text-blue-100">Payment Date</p>
                                    <p className="font-semibold">31st {salaryBreakdown.month.split(' ')[0]}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Payslip History */}
            <Card>
                <CardHeader>
                    <CardTitle>Payslip History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="text-left p-3 font-medium">Month</th>
                                    <th className="text-left p-3 font-medium">Gross Salary</th>
                                    <th className="text-left p-3 font-medium">Deductions</th>
                                    <th className="text-left p-3 font-medium">Net Salary</th>
                                    <th className="text-left p-3 font-medium">Status</th>
                                    <th className="text-left p-3 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payslipHistory.map((record, idx) => (
                                    <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                                        <td className="p-3 font-medium">{record.month}</td>
                                        <td className="p-3 text-muted-foreground">${record.gross.toLocaleString()}</td>
                                        <td className="p-3 text-red-600">-${record.deductions.toLocaleString()}</td>
                                        <td className="p-3 font-bold text-green-600">${record.net.toLocaleString()}</td>
                                        <td className="p-3">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {record.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <Button size="sm" variant="outline" onClick={handleDownloadPayslip} className="gap-1">
                                                <Download className="h-3 w-3" /> Download
                                            </Button>
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

export default Salary;
