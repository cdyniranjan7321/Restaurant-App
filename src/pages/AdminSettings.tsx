import AdminLayout from "@/components/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminSettings = () => {
  const handleSave = () => toast.success("Settings saved!");

  return (
    <AdminLayout>
      <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Settings</h1>
      <div className="max-w-2xl space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Restaurant Name</label>
          <Input defaultValue="La Maison" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Address</label>
          <Input defaultValue="123 Gourmet Avenue, Culinary District" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Phone</label>
          <Input defaultValue="+1 (555) 123-4567" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
          <Input defaultValue="info@lamaison.com" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Opening Time</label>
            <Input type="time" defaultValue="11:00" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Closing Time</label>
            <Input type="time" defaultValue="23:00" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Tax Rate (%)</label>
          <Input type="number" defaultValue="10" />
        </div>
        <Button onClick={handleSave} className="bg-primary text-primary-foreground">Save Settings</Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
