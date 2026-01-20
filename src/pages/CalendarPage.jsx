import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWeekend } from "date-fns";

// Mock holidays data
const holidays = [
    { date: new Date(2026, 0, 26), name: "Republic Day", type: "Public Holiday" },
    { date: new Date(2026, 2, 8), name: "Holi", type: "Public Holiday" },
    { date: new Date(2026, 3, 14), name: "Dr. Ambedkar Jayanti", type: "Restricted Holiday" },
    { date: new Date(2026, 7, 15), name: "Independence Day", type: "Public Holiday" },
    { date: new Date(2026, 9, 2), name: "Gandhi Jayanti", type: "Public Holiday" },
    { date: new Date(2026, 9, 24), name: "Dussehra", type: "Public Holiday" },
    { date: new Date(2026, 10, 13), name: "Diwali", type: "Public Holiday" },
    { date: new Date(2026, 11, 25), name: "Christmas", type: "Public Holiday" },
];

const CalendarPage = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Get day of week for first day (0 = Sunday)
    const firstDayOfWeek = monthStart.getDay();

    const isHoliday = (date) => {
        return holidays.find(h => isSameDay(h.date, date));
    };

    const getDayClass = (date) => {
        const holiday = isHoliday(date);
        const weekend = isWeekend(date);

        if (holiday?.type === "Public Holiday") {
            return "bg-red-100 text-red-900 border-red-300";
        }
        if (holiday?.type === "Restricted Holiday") {
            return "bg-orange-100 text-orange-900 border-orange-300";
        }
        if (weekend) {
            return "bg-gray-100 text-gray-600";
        }
        return "bg-white hover:bg-blue-50";
    };

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Holiday Calendar</h1>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                        <span>Public Holiday</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
                        <span>Restricted Holiday (RH)</span>
                    </div>
                </div>
            </div>

            {/* Calendar */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CardTitle className="text-2xl">
                            {format(currentMonth, "MMMM yyyy")}
                        </CardTitle>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button
                                onClick={previousMonth}
                                className="flex-1 sm:flex-none px-4 py-2 rounded-md border hover:bg-muted transition-colors"
                            >
                                ← Previous
                            </button>
                            <button
                                onClick={nextMonth}
                                className="flex-1 sm:flex-none px-4 py-2 rounded-md border hover:bg-muted transition-colors"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Calendar Grid */}
                    <div className="overflow-x-auto pb-2">
                        <div className="grid grid-cols-7 gap-2 min-w-[600px] md:min-w-0">
                            {/* Day Headers */}
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                <div key={day} className="text-center font-semibold p-2 text-sm">
                                    {day}
                                </div>
                            ))}

                            {/* Empty cells for days before month starts */}
                            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                                <div key={`empty-${idx}`} className="aspect-square"></div>
                            ))}

                            {/* Calendar Days */}
                            {daysInMonth.map((date) => {
                                const holiday = isHoliday(date);
                                return (
                                    <div
                                        key={date.toISOString()}
                                        className={`aspect-square border-2 rounded-lg p-2 transition-all cursor-pointer ${getDayClass(date)}`}
                                    >
                                        <div className="font-semibold text-sm">{format(date, "d")}</div>
                                        {holiday && (
                                            <div className="text-xs mt-1 font-medium line-clamp-2">
                                                {holiday.name}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Holidays List */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Public Holidays */}
                <Card>
                    <CardHeader>
                        <CardTitle>Public Holidays</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {holidays
                                .filter(h => h.type === "Public Holiday")
                                .map((holiday, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
                                        <div>
                                            <p className="font-medium">{holiday.name}</p>
                                            <p className="text-sm text-muted-foreground">{format(holiday.date, "MMMM dd, yyyy")}</p>
                                        </div>
                                        <div className="text-xs px-2 py-1 bg-red-200 text-red-900 rounded font-medium">
                                            {format(holiday.date, "EEE")}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Restricted Holidays */}
                <Card>
                    <CardHeader>
                        <CardTitle>Restricted Holidays (RH)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {holidays
                                .filter(h => h.type === "Restricted Holiday")
                                .map((holiday, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-200">
                                        <div>
                                            <p className="font-medium">{holiday.name}</p>
                                            <p className="text-sm text-muted-foreground">{format(holiday.date, "MMMM dd, yyyy")}</p>
                                        </div>
                                        <div className="text-xs px-2 py-1 bg-orange-200 text-orange-900 rounded font-medium">
                                            {format(holiday.date, "EEE")}
                                        </div>
                                    </div>
                                ))}
                            {holidays.filter(h => h.type === "Restricted Holiday").length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">No restricted holidays listed</p>
                            )}
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-xs text-blue-900">
                                <strong>Note:</strong> You can avail up to 2 restricted holidays per year. Apply in advance through the Leave Management section.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Summary Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-3xl font-bold text-blue-600">
                                {holidays.filter(h => h.type === "Public Holiday").length}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Public Holidays</p>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-orange-600">
                                {holidays.filter(h => h.type === "Restricted Holiday").length}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Restricted Holidays</p>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-green-600">52</div>
                            <p className="text-sm text-muted-foreground mt-1">Weekends</p>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-purple-600">305</div>
                            <p className="text-sm text-muted-foreground mt-1">Working Days</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CalendarPage;
