import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users, Clock, CalendarCheck } from "lucide-react";

const TeamLeadDashboard = () => {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Engineering Team</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Team Attendance</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">10/12</div>
                        <p className="text-xs text-muted-foreground">2 Members on leave</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leave Requests</CardTitle>
                        <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Pending Approval</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Team Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Mock List */}
                        {["Alice (Frontend)", "Bob (Backend)", "Charlie (DevOps)"].map((member, i) => (
                            <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                                        {member.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{member}</p>
                                        <p className="text-xs text-muted-foreground">Active</p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Present
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TeamLeadDashboard;
