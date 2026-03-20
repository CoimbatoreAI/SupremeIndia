import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Shield } from "lucide-react";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5069/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("adminToken", data.token);
                localStorage.setItem("adminEmail", data.email);
                toast({ title: "Login Successful", description: "Welcome back, Admin!" });
                navigate("/admin/dashboard");
            } else {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: data.message || "Invalid credentials",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong. Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary p-4">
            <div className="w-full max-w-md bg-background rounded-xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 mb-4">
                        <Shield className="h-8 w-8 text-accent" />
                    </div>
                    <h1 className="font-heading font-extrabold text-2xl text-foreground">Admin Login</h1>
                    <p className="text-muted-foreground text-sm mt-1">Access Supreme India Dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-heading font-semibold text-foreground">Email Address</label>
                        <Input
                            type="email"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12 border-border focus:border-accent"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-heading font-semibold text-foreground">Password</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-12 border-border focus:border-accent"
                        />
                    </div>
                    <Button variant="gold" className="w-full h-12 text-base font-bold" type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
