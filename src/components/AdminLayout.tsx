import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileNav from "@/components/AdminMobileNav";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <AdminMobileNav />
      <main className="lg:ml-64">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex justify-end px-4 py-3 lg:px-8">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;