import { ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileNav from "@/components/AdminMobileNav";

const AdminLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <AdminSidebar />
    <AdminMobileNav />
    <main className="lg:ml-64">
      <div className="container mx-auto px-4 py-8 lg:px-8">{children}</div>
    </main>
  </div>
);

export default AdminLayout;
