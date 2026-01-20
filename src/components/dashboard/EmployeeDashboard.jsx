import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Clock, Calendar, DollarSign, LogIn, LogOut } from "lucide-react";

const EmployeeDashboard = () => {
    const [punchedIn, setPunchedIn] = useState(false);

    return (
        <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold">Good Morning, User!</h2>
                        <p className="text-muted-foreground">Don't forget to mark your attendance today.</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        {!punchedIn ? (
                            <Button size="lg" onClick={() => setPunchedIn(true)} className="gap-2 w-full md:w-auto">
                                <LogIn className="h-4 w-4" /> Punch In (09:00 AM)
                            </Button>
                        ) : (
                            <Button variant="destructive" size="lg" onClick={() => setPunchedIn(false)} className="gap-2 w-full md:w-auto">
                                <LogOut className="h-4 w-4" /> Punch Out
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">My Attendance</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">95%</div>
                        <p className="text-xs text-muted-foreground">Average check-in: 09:05 AM</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12 Days</div>
                        <p className="text-xs text-muted-foreground">Available (Annual)</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Next Salary</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$4,200</div>
                        <p className="text-xs text-muted-foreground">Expected on 31st Jan</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {[
                                { date: "Jan 19", in: "09:02 AM", out: "06:05 PM", status: "Present" },
                                { date: "Jan 18", in: "09:00 AM", out: "06:00 PM", status: "Present" },
                                { date: "Jan 17", in: "09:15 AM", out: "06:10 PM", status: "Late" },
                            ].map((day, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0 hover:bg-muted/50 px-2 rounded-sm cursor-pointer transition-colors">
                                    <span className="font-medium">{day.date}</span>
                                    <div className="text-sm text-muted-foreground">
                                        <span className="mr-3">{day.in} - {day.out}</span>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${day.status === 'Late' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                            {day.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Holidays</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 p-3 border rounded-md bg-muted/20">
                                <div className="bg-primary/10 p-2 rounded text-primary">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Republic Day</p>
                                    <p className="text-xs text-muted-foreground">26 January, Sunday</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
