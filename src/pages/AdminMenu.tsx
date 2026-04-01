import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useMenu } from "@/context/MenuContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { categories, MenuItem } from "@/data/menuData";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const emptyForm = { name: "", description: "", price: "", category: "Starters", image: "", isAvailable: true, isPopular: false };

const AdminMenu = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openNew = () => { setEditId(null); setForm(emptyForm); setDialogOpen(true); };
  const openEdit = (item: MenuItem) => {
    setEditId(item.id);
    setForm({ name: item.name, description: item.description, price: item.price.toString(), category: item.category, image: item.image, isAvailable: item.isAvailable, isPopular: item.isPopular || false });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!form.name || !form.price) { toast.error("Name and price are required"); return; }
    const data = { name: form.name, description: form.description, price: parseFloat(form.price), category: form.category, image: form.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", isAvailable: form.isAvailable, isPopular: form.isPopular };
    if (editId) { updateMenuItem(editId, data); toast.success("Item updated"); }
    else { addMenuItem(data); toast.success("Item added"); }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => { deleteMenuItem(id); toast.success("Item deleted"); };

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Menu Management</h1>
          <p className="text-muted-foreground">{menuItems.length} items total</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-primary text-primary-foreground"><Plus className="mr-1 h-4 w-4" /> Add Item</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">{editId ? "Edit" : "Add"} Menu Item</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Name</label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Dish name" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Description</label>
                <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Dish description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Price ($)</label>
                  <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Category</label>
                  <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c !== "All").map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Image URL</label>
                <Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Available</span>
                <Switch checked={form.isAvailable} onCheckedChange={v => setForm({ ...form, isAvailable: v })} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Popular</span>
                <Switch checked={form.isPopular} onCheckedChange={v => setForm({ ...form, isPopular: v })} />
              </div>
              <Button onClick={handleSubmit} className="w-full bg-primary text-primary-foreground">{editId ? "Update" : "Add"} Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <tr key={item.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3"><img src={item.image} alt={item.name} className="h-10 w-10 rounded object-cover" loading="lazy" /></td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{item.name}</td>
                  <td className="hidden px-4 py-3 text-sm text-muted-foreground sm:table-cell">{item.category}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">${item.price.toFixed(2)}</td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${item.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {item.isAvailable ? "Available" : "Sold Out"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(item)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMenu;
