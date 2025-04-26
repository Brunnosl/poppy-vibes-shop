
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"user" | "creator">("user");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    try {
      setIsLoading(true);
      // Simulate registration process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to home after registration
      window.location.href = "/";
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-poppy-purple/30 to-white">
      <div className="p-4">
        <Link to="/" className="inline-flex items-center text-gray-700 hover:text-poppy-pink">
          <ArrowLeft size={18} className="mr-1" />
          <span>Back</span>
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-poppy-pink to-poppy-purple">
              Create Account
            </h1>
            <p className="text-gray-500">Join the POPPY community today</p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md pr-10"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className={cn(
                      "flex items-center justify-center p-3 border border-gray-300 rounded-md cursor-pointer transition-colors",
                      accountType === "user"
                        ? "bg-poppy-pink/10 border-poppy-pink"
                        : "hover:bg-gray-50"
                    )}
                    onClick={() => setAccountType("user")}
                  >
                    <input
                      type="radio"
                      name="accountType"
                      value="user"
                      checked={accountType === "user"}
                      onChange={() => setAccountType("user")}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-sm font-medium">User</div>
                      <div className="text-xs text-gray-500">Shop & Discover</div>
                    </div>
                  </div>
                  
                  <div
                    className={cn(
                      "flex items-center justify-center p-3 border border-gray-300 rounded-md cursor-pointer transition-colors",
                      accountType === "creator"
                        ? "bg-poppy-pink/10 border-poppy-pink"
                        : "hover:bg-gray-50"
                    )}
                    onClick={() => setAccountType("creator")}
                  >
                    <input
                      type="radio"
                      name="accountType"
                      value="creator"
                      checked={accountType === "creator"}
                      onChange={() => setAccountType("creator")}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-sm font-medium">Creator</div>
                      <div className="text-xs text-gray-500">Share & Earn</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-6 bg-poppy-pink hover:bg-poppy-pink/90 text-foreground rounded-md",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            
            <div className="text-sm text-center">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="text-poppy-pink hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-poppy-pink hover:underline">
                Privacy Policy
              </Link>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-poppy-pink hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Google
              </button>
              <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
