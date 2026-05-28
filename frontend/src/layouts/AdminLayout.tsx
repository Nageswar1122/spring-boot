import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { Button } from '@/components/ui/button';

import {
  ShoppingBasket,
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Menu,
} from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  DialogTitle,
  DialogDescription,
} from '@radix-ui/react-dialog';

/* ================= SIDEBAR LINKS ================= */
const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Package, label: 'Products', path: '/admin/products' },
  { icon: ShoppingCart, label: 'Admin Orders', path: '/admin/orders' },
];

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) =>
    path === '/admin'
      ? location.pathname === '/admin'
      : location.pathname.startsWith(path);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* LOGO */}
      <div className="p-6 border-b">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <ShoppingBasket className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Admin</span>
        </Link>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive(link.path)
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </Link>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <p className="font-medium">{user?.name || 'Admin'}</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>

        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* DESKTOP */}
      <aside className="hidden lg:block w-64 border-r">
        <SidebarContent />
      </aside>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* MOBILE HEADER */}
        <header className="lg:hidden border-b p-4 flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-0 w-64">
              {/* ✅ REQUIRED FOR ACCESSIBILITY (hidden) */}
              <DialogTitle className="sr-only">
                Admin Navigation
              </DialogTitle>
              <DialogDescription className="sr-only">
                Admin sidebar menu
              </DialogDescription>

              <SidebarContent />
            </SheetContent>
          </Sheet>

          <span className="font-bold">Bright Basket Admin</span>
        </header>

        {/* PAGE */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
