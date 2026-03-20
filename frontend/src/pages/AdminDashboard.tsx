import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
    Package,
    Settings as SettingIcon,
    Trash2,
    Plus,
    LogOut,
    LayoutDashboard,
    Save,
    ChevronLeft,
    FileText,
    Upload,
    Image as ImageIcon,
    Edit2,
    X
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5069";

interface Product {
    _id: string;
    name: string;
    desc: string;
    useCases: string;
    category: string;
    image?: string;
}

interface Machine {
    _id: string;
    name: string;
    capacity: string;
    features: string[];
    image?: string;
}

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<"products" | "machines" | "brochure">("products");
    const [products, setProducts] = useState<Product[]>([]);
    const [machines, setMachines] = useState<Machine[]>([]);
    const [brochure, setBrochure] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin/login");
        } else {
            fetchData();
            fetchBrochure();
        }
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const pRes = await fetch(`${API_BASE_URL}/api/products`);
            const mRes = await fetch(`${API_BASE_URL}/api/machines`);
            const pData = await pRes.json();
            const mData = await mRes.json();
            setProducts(pData);
            setMachines(mData);
        } catch (error) {
            toast({ variant: "destructive", title: "Fetch Error", description: "Could not load data from backend" });
        } finally {
            setLoading(false);
        }
    };

    const fetchBrochure = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/settings/brochure`);
            const data = await res.json();
            setBrochure(data.value);
        } catch (error) {
            console.error("Error fetching brochure:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        navigate("/admin/login");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const startEdit = (item: any) => {
        setEditingItemId(item._id);
        setFormData({
            ...item,
            features: Array.isArray(item.features) ? item.features.join(', ') : item.features
        });
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingItemId(null);
        setFormData({});
        setSelectedFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");
        const endpoint = activeTab === "products" ? "products" : "machines";
        const method = editingItemId ? "PUT" : "POST";
        const url = editingItemId
            ? `${API_BASE_URL}/api/${endpoint}/${editingItemId}`
            : `${API_BASE_URL}/api/${endpoint}`;

        const data = new FormData();
        data.append("name", formData.name);
        data.append("desc", formData.desc);

        if (activeTab === "products") {
            data.append("category", formData.category);
            data.append("useCases", formData.useCases);
        } else {
            data.append("capacity", formData.capacity);
            data.append("features", formData.features);
        }

        if (selectedFile) {
            data.append("image", selectedFile);
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: { "Authorization": `Bearer ${token}` },
                body: data,
            });

            if (response.ok) {
                toast({ title: "Success", description: `${activeTab.slice(0, -1)} ${editingItemId ? "updated" : "added"} successfully!` });
                fetchData();
                closeForm();
            } else {
                const error = await response.json();
                toast({ variant: "destructive", title: "Error", description: error.message || "Operation failed" });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Submission failed" });
        }
    };

    const handleBrochureUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        const token = localStorage.getItem("adminToken");
        const data = new FormData();
        data.append("file", selectedFile);

        try {
            const response = await fetch(`${API_BASE_URL}/api/settings/brochure`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: data,
            });

            if (response.ok) {
                const result = await response.json();
                setBrochure(result.value);
                toast({ title: "Success", description: "Brochure updated successfully" });
                setSelectedFile(null);
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Brochure upload failed" });
        }
    };

    const deleteBrochure = async () => {
        if (!confirm("Are you sure you want to delete the brochure?")) return;
        const token = localStorage.getItem("adminToken");
        try {
            const response = await fetch(`${API_BASE_URL}/api/settings/brochure`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                setBrochure("");
                toast({ title: "Deleted", description: "Brochure removed successfully" });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Delete failed" });
        }
    };

    const deleteItem = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        const token = localStorage.getItem("adminToken");
        const endpoint = activeTab === "products" ? "products" : "machines";

        try {
            const response = await fetch(`${API_BASE_URL}/api/${endpoint}/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                toast({ title: "Deleted", description: "Item removed successfully" });
                fetchData();
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Delete failed" });
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-primary-foreground flex flex-col pt-10 sticky top-0 h-screen shadow-2xl z-20">
                <div className="px-6 mb-10 flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                    <h2 className="font-heading font-extrabold text-lg tracking-wider">ADMIN</h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <button
                        onClick={() => { setActiveTab("products"); closeForm(); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-heading font-semibold transition-all ${activeTab === "products" ? "bg-accent text-accent-foreground shadow-lg" : "hover:bg-primary-foreground/10 text-primary-foreground/80"}`}
                    >
                        <Package className="h-5 w-5" />
                        Products
                    </button>
                    <button
                        onClick={() => { setActiveTab("machines"); closeForm(); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-heading font-semibold transition-all ${activeTab === "machines" ? "bg-accent text-accent-foreground shadow-lg" : "hover:bg-primary-foreground/10 text-primary-foreground/80"}`}
                    >
                        <SettingIcon className="h-5 w-5" />
                        Infrastructure
                    </button>
                    <button
                        onClick={() => { setActiveTab("brochure"); closeForm(); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-heading font-semibold transition-all ${activeTab === "brochure" ? "bg-accent text-accent-foreground shadow-lg" : "hover:bg-primary-foreground/10 text-primary-foreground/80"}`}
                    >
                        <FileText className="h-5 w-5" />
                        Brochure
                    </button>
                </nav>

                <div className="p-6">
                    <Button variant="destructive" className="w-full gap-2 text-xs font-bold uppercase transition-transform active:scale-95" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto max-h-screen">
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase font-heading font-bold tracking-widest mb-1">
                            <LayoutDashboard className="h-3 w-3" />
                            Overview
                        </div>
                        <h1 className="text-3xl font-heading font-extrabold text-foreground tracking-editorial text-balance">
                            Manage Your <span className="text-accent">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
                        </h1>
                    </div>
                    {activeTab !== "brochure" && !isFormOpen && (
                        <Button variant="gold" className="gap-2 font-bold transition-transform active:scale-95" onClick={() => setIsFormOpen(true)}>
                            <Plus className="h-4 w-4" />
                            Add New {activeTab === "products" ? "Product" : "Machine"}
                        </Button>
                    )}
                </div>

                {activeTab === "brochure" ? (
                    <div className="bg-background rounded-2xl shadow-xl p-10 max-w-2xl border border-accent/10">
                        <h3 className="font-heading font-bold text-xl mb-8 flex items-center gap-2">
                            <span className="h-1.5 w-8 bg-accent rounded-full inline-block" />
                            Full Brochure CRUD
                        </h3>
                        <div className="space-y-8">
                            <div className="p-8 bg-secondary/50 rounded-xl border border-dashed border-border flex flex-col items-center text-center group relative">
                                <FileText className="h-16 w-16 text-accent/40 mb-4 group-hover:text-accent transition-colors duration-500" />
                                {brochure ? (
                                    <>
                                        <p className="text-sm text-foreground/70 mb-2 font-heading font-bold uppercase tracking-widest">
                                            FILE: <span className="text-accent">{brochure}</span>
                                        </p>
                                        <div className="flex gap-4 mt-6">
                                            <a href={`${API_BASE_URL}/uploads/brochure/${brochure}`} target="_blank" className="text-xs font-heading font-bold text-accent hover:underline flex items-center gap-1">
                                                <Upload className="h-3 w-3 rotate-180" /> Preview
                                            </a>
                                            <button onClick={deleteBrochure} className="text-xs font-heading font-bold text-destructive hover:underline flex items-center gap-1">
                                                <Trash2 className="h-3 w-3" /> Delete Permanent
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">No brochure active. System will hide download button.</p>
                                )}
                            </div>

                            <form onSubmit={handleBrochureUpload} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-heading font-bold text-muted-foreground">Select New File (Replaces Existing)</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-muted-foreground file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-heading file:font-extrabold file:bg-accent file:text-accent-foreground hover:file:bg-accent/80 transition-all cursor-pointer bg-secondary rounded-xl p-2 h-14"
                                    />
                                </div>
                                <Button variant="gold" className="w-full h-14 font-bold text-lg gap-2 shadow-xl shadow-accent/20" type="submit" disabled={!selectedFile}>
                                    <Upload className="h-5 w-5" />
                                    Upload & Activate
                                </Button>
                            </form>
                        </div>
                    </div>
                ) : isFormOpen ? (
                    <div className="bg-background rounded-2xl shadow-xl p-10 max-w-2xl border border-accent/10 relative">
                        <button onClick={closeForm} className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-full transition-colors">
                            <X className="h-5 w-5 text-muted-foreground" />
                        </button>
                        <h3 className="font-heading font-bold text-xl mb-8 flex items-center gap-2">
                            <span className="h-1.5 w-8 bg-accent rounded-full inline-block" />
                            {editingItemId ? "Modify" : "Register New"} {activeTab === "products" ? "Product" : "Machine"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-heading font-bold text-muted-foreground">Name</label>
                                    <Input
                                        required
                                        value={formData.name || ""}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="h-12 bg-secondary border-none focus-visible:ring-2 focus-visible:ring-accent"
                                    />
                                </div>
                                {activeTab === "products" ? (
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-heading font-bold text-muted-foreground">Category</label>
                                        <select
                                            required
                                            value={formData.category || ""}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full h-12 bg-secondary rounded-md px-3 border-none font-sans text-sm outline-none focus:ring-2 focus:ring-accent appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTkgOWwtNyA3LTctNyIvPjwvc3ZnPg==')] bg-[length:1.25rem_1.25rem] bg-[right_0.75rem_center] bg-no-repeat"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Tags & Labels">Tags & Labels</option>
                                            <option value="Stickers & Printed Materials">Stickers & Printed Materials</option>
                                            <option value="Packaging Solutions">Packaging Solutions</option>
                                        </select>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-heading font-bold text-muted-foreground">Capacity</label>
                                        <Input
                                            required
                                            value={formData.capacity || ""}
                                            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                            className="h-12 bg-secondary border-none focus-visible:ring-2 focus-visible:ring-accent"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-heading font-bold text-muted-foreground">
                                    {activeTab === "products" ? "Use Cases" : "Features (Comma separated)"}
                                </label>
                                <Input
                                    required
                                    value={activeTab === "products" ? (formData.useCases || "") : (formData.features || "")}
                                    onChange={(e) => setFormData({ ...formData, [activeTab === "products" ? "useCases" : "features"]: e.target.value })}
                                    className="h-12 bg-secondary border-none focus-visible:ring-2 focus-visible:ring-accent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-heading font-bold text-muted-foreground">Upload Image {editingItemId && "(Optional)"}</label>
                                <div className="flex items-center gap-6">
                                    <div className="h-24 w-24 rounded-2xl bg-secondary flex items-center justify-center border border-dashed border-border overflow-hidden shadow-inner group">
                                        {selectedFile ? (
                                            <img src={URL.createObjectURL(selectedFile)} className="w-full h-full object-cover" />
                                        ) : formData.image ? (
                                            <img src={`${API_BASE_URL}/uploads/${formData.image}`} className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="h-10 w-10 text-muted-foreground group-hover:scale-110 transition-transform" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="text-xs font-heading file:bg-accent/10 file:border-0 file:rounded-lg file:px-4 file:py-2 file:text-accent font-bold cursor-pointer"
                                        />
                                        <p className="text-[10px] text-muted-foreground mt-2 italic">Recommended: 800x600px PNG/JPG</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-heading font-bold text-muted-foreground">Description</label>
                                <Textarea
                                    required
                                    value={formData.desc || ""}
                                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                    rows={4}
                                    className="bg-secondary border-none focus-visible:ring-2 focus-visible:ring-accent resize-none p-4"
                                />
                            </div>

                            <div className="pt-4">
                                <Button variant="gold" className="w-full h-14 font-bold text-lg gap-2 shadow-xl shadow-accent/20 transition-transform active:scale-[0.98]" type="submit">
                                    <Save className="h-5 w-5" />
                                    {editingItemId ? "Update Database" : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                        {(activeTab === "products" ? products : machines).map((item) => (
                            <div key={item._id} className="bg-background rounded-2xl shadow-md p-6 border border-transparent hover:border-accent/20 transition-all group overflow-hidden flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="h-16 w-16 rounded-xl bg-accent/5 flex items-center justify-center overflow-hidden border border-border/50 shadow-sm">
                                        {item.image ? (
                                            <img src={`${API_BASE_URL}/uploads/${item.image}`} className="w-full h-full object-cover" />
                                        ) : (
                                            activeTab === "products" ? <Package className="h-6 w-6 text-accent" /> : <SettingIcon className="h-6 w-6 text-accent" />
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => startEdit(item)}
                                            className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteItem(item._id)}
                                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <h4 className="font-heading font-bold text-lg text-foreground mb-1 line-clamp-1">{item.name}</h4>
                                <div className="text-[10px] uppercase font-heading font-bold tracking-widest text-accent mb-4 inline-block bg-accent/5 px-3 py-1 rounded-full w-fit">
                                    {activeTab === "products" ? (item as Product).category : (item as Machine).capacity}
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1 mb-6">{(item as any).desc || (item as any).capacity}</p>
                                <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                                    <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">ID: {item._id.slice(-8)}</span>
                                    <div className="flex gap-1.5">
                                        <span className="h-2 w-2 rounded-full bg-accent" />
                                        <span className="h-2 w-2 rounded-full bg-accent/20" />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {(activeTab === "products" ? products : machines).length === 0 && !loading && (
                            <div className="col-span-full py-20 bg-background/50 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center text-center">
                                <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center mb-6">
                                    {activeTab === "products" ? <Package className="h-12 w-12 text-muted-foreground opacity-20" /> : <SettingIcon className="h-12 w-12 text-muted-foreground opacity-20" />}
                                </div>
                                <h3 className="font-heading font-bold text-xl text-foreground mb-2">No records found</h3>
                                <p className="text-sm text-muted-foreground max-w-xs mb-8">Ready to populate? Click the button above to add your first {activeTab.slice(0, -1)}.</p>
                                <Button variant="gold" className="gap-2 font-bold h-12 px-8" onClick={() => setIsFormOpen(true)}>
                                    <Plus className="h-5 w-5" /> Add New
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
