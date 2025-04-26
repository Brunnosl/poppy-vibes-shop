
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 z-10 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-around h-16">
          <NavItem path="/" icon={<Home size={24} />} label="Home" isActive={isActive("/")} />
          <NavItem path="/search" icon={<Search size={24} />} label="Search" isActive={isActive("/search")} />
          <NavItem path="/cart" icon={<ShoppingBag size={24} />} label="Cart" isActive={isActive("/cart")} />
          <NavItem path="/profile" icon={<User size={24} />} label="Profile" isActive={isActive("/profile")} />
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-poppy-pink to-poppy-purple bg-clip-text text-transparent">
                  POPPY
                </span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <NavItem path="/" label="Home" isActive={isActive("/")} />
                <NavItem path="/search" label="Search" isActive={isActive("/search")} />
                <NavItem path="/cart" label="Cart" isActive={isActive("/cart")} />
                <NavItem path="/profile" label="Profile" isActive={isActive("/profile")} />
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center">
                <Link to="/login" className="text-foreground px-4 py-2 rounded-md">
                  Login
                </Link>
                <Link to="/register" className="bg-poppy-pink text-foreground px-4 py-2 rounded-md ml-2">
                  Sign Up
                </Link>
              </div>
            </div>
            
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-foreground">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-20 md:hidden">
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="text-foreground">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <NavItem path="/" label="Home" isActive={isActive("/")} onClick={toggleMenu} />
            <NavItem path="/search" label="Search" isActive={isActive("/search")} onClick={toggleMenu} />
            <NavItem path="/cart" label="Cart" isActive={isActive("/cart")} onClick={toggleMenu} />
            <NavItem path="/profile" label="Profile" isActive={isActive("/profile")} onClick={toggleMenu} />
            <div className="pt-8 flex flex-col space-y-4">
              <Link 
                to="/login" 
                className="text-foreground px-8 py-3 rounded-md border border-gray-200"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-poppy-pink text-foreground px-8 py-3 rounded-md"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavItemProps {
  path: string;
  label: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ path, label, icon, isActive, onClick }: NavItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "flex flex-col items-center justify-center text-sm",
        isActive
          ? "text-poppy-pink font-semibold"
          : "text-gray-500 hover:text-poppy-pink"
      )}
      onClick={onClick}
    >
      {icon && <div className="mb-1">{icon}</div>}
      <span>{label}</span>
      {isActive && (
        <div className="h-1 w-1 bg-poppy-pink rounded-full mt-1 md:hidden"></div>
      )}
    </Link>
  );
};

export default Navbar;
