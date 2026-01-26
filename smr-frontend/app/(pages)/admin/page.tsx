import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard overview",
};

// --- Mock Data ---
const stats = [
  { title: "Total Revenue", value: "$12,500", change: "+10%" },
  { title: "Total Users", value: "5,234", change: "+5%" },
  { title: "Active Trips", value: "1,250", change: "+8%" },
  { title: "New Sign-ups", value: "320", change: "+12%" },
];

const recentActivity = [
  {
    id: "TRP-001",
    user: "Lucas Bennett",
    date: "2023-08-15",
    status: "Completed",
    amount: "$25.00",
    initial: "LB",
  },
  {
    id: "TRP-002",
    user: "Sophia Carter",
    date: "2023-08-16",
    status: "Completed",
    amount: "$30.00",
    initial: "SC",
  },
  {
    id: "TRP-003",
    user: "Owen Davis",
    date: "2023-08-17",
    status: "Cancelled",
    amount: "$0.00",
    initial: "OD",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-medium">{stat.change}</span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <svg viewBox="0 0 500 150" className="h-[200px] w-full">
              <path
                d="M0,120 Q50,50 100,100 T200,80 T300,120 T400,40 T500,60"
                fill="none"
                className="stroke-primary"
                strokeWidth="3"
              />
            </svg>
            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Trips Per Day</CardTitle>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-end gap-2">
              {[60, 80, 90, 85, 70, 50, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-muted transition-colors hover:bg-primary"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Trip ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage />
                        <AvatarFallback>{item.initial}</AvatarFallback>
                      </Avatar>
                      {item.user}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.id}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.date}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Completed" ? "default" : "secondary"
                      }
                      className={
                        item.status === "Completed"
                          ? "bg-primary/10 text-primary border-0"
                          : ""
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
