import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Financial insights and analytics</p>
        </div>
        <Button>📥 Export PDF</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-green-600">$12,450</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Last Month</p>
                  <p className="text-2xl font-bold">$10,200</p>
                </div>
              </div>
              <div className="text-center">
                <span className="text-green-600 font-semibold">↑ 22% increase</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Pie chart will be here (install recharts)
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profit Trend (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center text-muted-foreground">
            Line chart will be here (install recharts)
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-green-50 dark:bg-green-950 rounded">
              <span className="font-medium">Total Revenue (YTD)</span>
              <span className="font-bold text-green-600">$125,400</span>
            </div>
            <div className="flex justify-between p-3 bg-red-50 dark:bg-red-950 rounded">
              <span className="font-medium">Total Expenses (YTD)</span>
              <span className="font-bold text-red-600">$78,250</span>
            </div>
            <div className="flex justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded">
              <span className="font-medium">Net Profit (YTD)</span>
              <span className="font-bold text-blue-600">$47,150</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
