import { useState, useEffect } from 'react';
import { addRevenue, getRevenues } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency, formatDate } from '@/lib/utils';

type Revenue = {
  id: number;
  description: string;
  amount: number;
  date: string;
};

export default function RevenuesPage() {
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });

  const fetchRevenues = async () => {
    try {
      const response = await getRevenues();
      setRevenues(response.data);
    } catch (error) {
      console.error('Error fetching revenues:', error);
    }
  };

  useEffect(() => {
    fetchRevenues();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addRevenue({
        description: formData.description,
        amount: parseFloat(formData.amount),
        date: formData.date,
      });
      fetchRevenues(); // Re-fetch revenues to update the list
      setFormData({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding revenue:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Revenues</h1>
          <p className="text-muted-foreground">Manage your income sources</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '➕ Add Revenue'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Client Payment"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Amount</label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Save Revenue</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Revenue History</CardTitle>
        </CardHeader>
        <CardContent>
          {revenues.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <span className="text-4xl mb-4 block">💰</span>
              <p>No revenues added yet</p>
              <p className="text-sm">Click "Add Revenue" to get started</p>
            </div>
          ) : (
            <div>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="pb-3 font-medium">Description</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenues.map((revenue) => (
                      <tr key={revenue.id} className="border-b last:border-0">
                        <td className="py-3">{revenue.description}</td>
                        <td className="py-3 text-green-600 font-semibold">
                          {formatCurrency(revenue.amount)}
                        </td>
                        <td className="py-3 text-muted-foreground">{formatDate(revenue.date)}</td>
                        <td className="py-3">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List */}
              <div className="md:hidden space-y-4">
                {revenues.map((revenue) => (
                  <div key={revenue.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{revenue.description || "Revenue"}</div>
                      <div className="text-green-600 font-semibold">{formatCurrency(revenue.amount)}</div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 mb-3">{formatDate(revenue.date)}</div>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
