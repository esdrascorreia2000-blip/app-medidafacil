"use client";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Image, 
  Ruler, 
  MessageSquare, 
  FolderKanban, 
  CheckSquare, 
  Bell,
  Menu,
  X,
  Search,
  Plus,
  TrendingUp,
  Users,
  Award,
  Camera,
  Edit3,
  Share2,
  Star,
  Clock,
  ChevronRight,
  Settings,
  LogOut,
  User,
  Zap,
  WifiOff,
  Wifi,
  Moon,
  Sun,
  Command,
  Filter,
  Download,
  Upload,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Sparkles
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Screen = "dashboard" | "gallery" | "editor" | "comments" | "projects" | "tasks" | "notifications";

export default function MedidaFacil() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showSearch, setShowSearch] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Verificar autenticação
  useEffect(() => {
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        router.push("/auth");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    } else {
      router.push("/auth");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  // Simular status de conexão
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "k") {
          e.preventDefault();
          setShowSearch(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard, screen: "dashboard" as Screen },
    { name: "Galeria", icon: Image, screen: "gallery" as Screen },
    { name: "Editor", icon: Ruler, screen: "editor" as Screen },
    { name: "Comentários", icon: MessageSquare, screen: "comments" as Screen },
    { name: "Projetos", icon: FolderKanban, screen: "projects" as Screen },
    { name: "Tarefas", icon: CheckSquare, screen: "tasks" as Screen },
    { name: "Notificações", icon: Bell, screen: "notifications" as Screen },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00FF7F]/20 border-t-[#00FF7F] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#0D0D0D] text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-5 duration-300">
          <div className="bg-[#00FF7F] text-black px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 font-semibold">
            <Sparkles size={20} />
            {toastMessage}
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 animate-in fade-in duration-200">
          <div className="bg-[#1A1A1A] border border-[#00FF7F]/20 rounded-2xl w-full max-w-2xl mx-4 shadow-2xl animate-in slide-in-from-top-10 duration-300">
            <div className="flex items-center gap-3 p-4 border-b border-[#00FF7F]/10">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar em tudo... (Ctrl+K)"
                className="flex-1 bg-transparent focus:outline-none text-white"
                autoFocus
              />
              <button
                onClick={() => setShowSearch(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {["Projetos", "Tarefas", "Medidas", "Fotos"].map((category) => (
                <div key={category} className="p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-all">
                  <p className="text-sm text-gray-400">{category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 ${theme === "dark" ? "bg-[#0D0D0D]/95" : "bg-white/95"} backdrop-blur-sm border-b ${theme === "dark" ? "border-[#00FF7F]/10" : "border-gray-200"}`}>
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 ${theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-100"} rounded-lg transition-all`}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold">
            Medida<span className="text-[#00FF7F]">Fácil</span>
          </h1>
          <div className="flex items-center gap-2">
            {!isOnline && (
              <div className="text-red-400 animate-pulse">
                <WifiOff size={18} />
              </div>
            )}
            <button className={`p-2 ${theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-100"} rounded-lg transition-all`}>
              <Bell size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 ${theme === "dark" ? "bg-[#0D0D0D] border-[#00FF7F]/10" : "bg-white border-gray-200"} border-r z-40 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="mb-8">
            <h1 className="text-2xl font-bold hidden lg:block">
              Medida<span className="text-[#00FF7F]">Fácil</span>
            </h1>
          </div>
          
          {/* User Profile */}
          <div className={`mb-6 p-4 ${theme === "dark" ? "bg-white/5" : "bg-gray-50"} rounded-xl border ${theme === "dark" ? "border-[#00FF7F]/10" : "border-gray-200"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FF7F] to-[#00CC66] flex items-center justify-center text-black font-bold text-lg">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <p className="font-semibold truncate">{user?.email?.split("@")[0] || "Usuário"}</p>
                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Premium Pro</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white/10 rounded-full h-1.5">
                <div className="bg-[#00FF7F] h-1.5 rounded-full w-3/4 transition-all duration-500" />
              </div>
              <span className="text-xs text-[#00FF7F] font-semibold">75%</span>
            </div>
          </div>

          <nav className="space-y-2 flex-1 mt-4 lg:mt-0">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => {
                    setCurrentScreen(item.screen);
                    setSidebarOpen(false);
                    showNotification(`Navegando para ${item.name}`);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[#00FF7F]/10 text-[#00FF7F] shadow-lg shadow-[#00FF7F]/20 scale-105"
                      : `${theme === "dark" ? "hover:bg-white/5 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"}`
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <ChevronRight size={16} className="ml-auto animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-2 pt-4 border-t border-[#00FF7F]/10">
            <button
              onClick={() => setShowSearch(true)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${theme === "dark" ? "hover:bg-white/5 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-600"}`}
            >
              <Command size={20} />
              <span className="font-medium">Buscar</span>
              <span className={`ml-auto text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>⌘K</span>
            </button>
            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                showNotification(`Tema ${theme === "dark" ? "claro" : "escuro"} ativado`);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${theme === "dark" ? "hover:bg-white/5 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-600"}`}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              <span className="font-medium">Tema</span>
            </button>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${theme === "dark" ? "hover:bg-white/5 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-600"}`}
            >
              <LogOut size={20} />
              <span className="font-medium">Sair</span>
            </button>
          </div>

          {/* Online Status */}
          <div className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-lg ${isOnline ? "bg-green-500/10" : "bg-red-500/10"}`}>
            {isOnline ? <Wifi size={16} className="text-green-400" /> : <WifiOff size={16} className="text-red-400" />}
            <span className={`text-xs font-semibold ${isOnline ? "text-green-400" : "text-red-400"}`}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          {!user?.id ? (
            <div className="text-center py-12">Carregando...</div>
          ) : (
            <>
              {currentScreen === "dashboard" && <Dashboard theme={theme} showNotification={showNotification} userId={user.id} />}
              {currentScreen === "gallery" && <Gallery theme={theme} showNotification={showNotification} userId={user.id} />}
              {currentScreen === "editor" && <Editor theme={theme} showNotification={showNotification} userId={user.id} />}
              {currentScreen === "comments" && <Comments theme={theme} showNotification={showNotification} userId={user.id} userName={user?.email?.split("@")[0]} />}
              {currentScreen === "projects" && <Projects theme={theme} showNotification={showNotification} userId={user.id} />}
              {currentScreen === "tasks" && <Tasks theme={theme} showNotification={showNotification} userId={user.id} />}
              {currentScreen === "notifications" && <Notifications theme={theme} showNotification={showNotification} userId={user.id} />}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function Dashboard({ theme, showNotification, userId }: { theme: "dark" | "light"; showNotification: (msg: string) => void; userId: string }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadData();
    }
  }, [userId]);

  const loadData = async () => {
    if (!userId) return;
    
    const { data: projectsData } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(3);

    const { data: tasksData } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId);

    setProjects(projectsData || []);
    setTasks(tasksData || []);
    setLoading(false);
  };

  const stats = [
    { label: "Projetos Ativos", value: projects.length.toString(), change: "+3", icon: FolderKanban, color: "blue" },
    { label: "Tarefas Pendentes", value: tasks.filter(t => t.status === "pending").length.toString(), change: "+12", icon: CheckSquare, color: "green" },
    { label: "Colaboradores", value: "8", change: "+2", icon: Users, color: "purple" },
    { label: "Taxa Conclusão", value: "94%", change: "+5%", icon: TrendingUp, color: "orange" },
  ];

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>Visão geral dos seus projetos</p>
        </div>
        <div className="flex gap-3">
          <button className={`flex items-center gap-2 px-4 py-2 ${theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"} rounded-lg transition-all`}>
            <Filter size={18} />
            Filtrar
          </button>
          <button
            onClick={() => showNotification("Novo projeto criado!")}
            className="flex items-center gap-2 px-6 py-3 bg-[#00FF7F] text-black font-semibold rounded-lg hover:bg-[#00FF7F]/90 transition-all hover:scale-105 shadow-lg shadow-[#00FF7F]/20"
          >
            <Plus size={20} />
            Novo Projeto
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${theme === "dark" ? "bg-white/5 border-[#00FF7F]/10 hover:border-[#00FF7F]/30" : "bg-white border-gray-200 hover:border-[#00FF7F]/50"} backdrop-blur-sm border rounded-xl p-6 transition-all hover:scale-105 cursor-pointer animate-in slide-in-from-bottom-4 duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.color === "blue" ? "bg-blue-500/20" :
                  stat.color === "green" ? "bg-green-500/20" :
                  stat.color === "purple" ? "bg-purple-500/20" :
                  "bg-orange-500/20"
                }`}>
                  <Icon className={
                    stat.color === "blue" ? "text-blue-400" :
                    stat.color === "green" ? "text-green-400" :
                    stat.color === "purple" ? "text-purple-400" :
                    "text-orange-400"
                  } size={24} />
                </div>
                <span className="text-[#00FF7F] text-sm font-semibold flex items-center gap-1">
                  <TrendingUp size={14} />
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-sm`}>{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Projects */}
      <div className={`${theme === "dark" ? "bg-white/5 border-[#00FF7F]/10" : "bg-white border-gray-200"} backdrop-blur-sm border rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Projetos Recentes</h3>
          <button className="text-[#00FF7F] hover:text-[#00FF7F]/80 text-sm font-semibold transition-all">
            Ver todos
          </button>
        </div>
        {projects.length === 0 ? (
          <p className="text-center text-gray-400 py-8">Nenhum projeto ainda. Crie seu primeiro projeto!</p>
        ) : (
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`${theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-gray-50 hover:bg-gray-100"} rounded-lg p-4 transition-all cursor-pointer group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold group-hover:text-[#00FF7F] transition-colors">{project.name}</h4>
                  <span className="text-[#00FF7F] text-sm font-semibold">{project.progress}%</span>
                </div>
                <div className={`w-full ${theme === "dark" ? "bg-white/10" : "bg-gray-200"} rounded-full h-2 mb-3 overflow-hidden`}>
                  <div
                    className="bg-gradient-to-r from-[#00FF7F] to-[#00CC66] h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className={`flex items-center gap-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  <span className="flex items-center gap-1">
                    <CheckSquare size={16} />
                    {project.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.priority === "high" ? "bg-red-500/20 text-red-400" :
                    project.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-blue-500/20 text-blue-400"
                  }`}>
                    {project.priority === "high" ? "Alta" : project.priority === "medium" ? "Média" : "Baixa"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Gallery({ theme, showNotification, userId }: { theme: "dark" | "light"; showNotification: (msg: string) => void; userId: string }) {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, [userId]);

  const loadPhotos = async () => {
    const { data } = await supabase
      .from("photos")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setPhotos(data || []);
    setLoading(false);
  };

  const handleAddPhoto = async () => {
    const { data, error } = await supabase
      .from("photos")
      .insert([
        {
          title: `Foto ${photos.length + 1}`,
          category: "Interno",
          measurements_count: Math.floor(Math.random() * 15) + 1,
          user_id: userId,
        },
      ])
      .select();

    if (!error && data) {
      setPhotos([data[0], ...photos]);
      showNotification("Foto adicionada com sucesso!");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Galeria de Fotos</h2>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>Todas as suas fotos com medidas</p>
        </div>
        <div className="flex gap-3">
          <button className={`flex items-center gap-2 px-4 py-2 ${theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"} rounded-lg transition-all`}>
            <Upload size={18} />
            Upload
          </button>
          <button
            onClick={handleAddPhoto}
            className="flex items-center gap-2 px-6 py-3 bg-[#00FF7F] text-black font-semibold rounded-lg hover:bg-[#00FF7F]/90 transition-all hover:scale-105 shadow-lg shadow-[#00FF7F]/20"
          >
            <Camera size={20} />
            Nova Foto
          </button>
        </div>
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-12">
          <Camera className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-400">Nenhuma foto ainda. Adicione sua primeira foto!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`group ${theme === "dark" ? "bg-white/5 border-[#00FF7F]/10 hover:border-[#00FF7F]/30" : "bg-white border-gray-200 hover:border-[#00FF7F]/50"} backdrop-blur-sm border rounded-xl overflow-hidden transition-all hover:scale-105 cursor-pointer animate-in slide-in-from-bottom-4 duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video bg-gradient-to-br from-[#00FF7F]/20 to-transparent flex items-center justify-center relative">
                <Image className="text-[#00FF7F]/50 group-hover:scale-110 transition-transform" size={48} />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Ruler size={12} />
                  {photo.measurements_count}
                </div>
                <div className="absolute top-3 left-3 bg-[#00FF7F]/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#00FF7F]">
                  {photo.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1 group-hover:text-[#00FF7F] transition-colors">{photo.title}</h3>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {new Date(photo.created_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Editor({ theme, showNotification, userId }: { theme: "dark" | "light"; showNotification: (msg: string) => void; userId: string }) {
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeasurements();
  }, [userId]);

  const loadMeasurements = async () => {
    const { data } = await supabase
      .from("measurements")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (data && data.length > 0) {
      setMeasurements(data);
    } else {
      // Dados padrão se não houver medidas
      setMeasurements([
        { id: "1", label: "Largura", value: "3.50", unit: "m" },
        { id: "2", label: "Altura", value: "2.80", unit: "m" },
        { id: "3", label: "Profundidade", value: "4.20", unit: "m" },
      ]);
    }
    setLoading(false);
  };

  const handleAddMeasurement = async () => {
    const { data, error } = await supabase
      .from("measurements")
      .insert([
        {
          label: "Nova Medida",
          value: "0.00",
          unit: "m",
          user_id: userId,
        },
      ])
      .select();

    if (!error && data) {
      setMeasurements([data[0], ...measurements]);
      showNotification("Medida adicionada!");
    }
  };

  const handleUpdateMeasurement = async (id: string, value: string) => {
    const measurement = measurements.find(m => m.id === id);
    if (!measurement) return;

    setMeasurements(measurements.map(m => m.id === id ? { ...m, value } : m));

    if (measurement.user_id) {
      await supabase
        .from("measurements")
        .update({ value })
        .eq("id", id);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Editor de Medidas</h2>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>Adicione e edite medidas com precisão</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => showNotification("Medidas exportadas!")}
            className={`flex items-center gap-2 px-4 py-2 ${theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"} rounded-lg transition-all`}
          >
            <Download size={18} />
            Exportar
          </button>
          <button
            onClick={handleAddMeasurement}
            className="flex items-center gap-2 px-6 py-3 bg-[#00FF7F] text-black font-semibold rounded-lg hover:bg-[#00FF7F]/90 transition-all hover:scale-105 shadow-lg shadow-[#00FF7F]/20"
          >
            <Plus size={20} />
            Nova Medida
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className={`${theme === "dark" ? "bg-white/5 border-[#00FF7F]/10" : "bg-white border-gray-200"} backdrop-blur-sm border rounded-xl p-6`}>
          <h3 className="text-xl font-bold mb-6">Medidas Atuais</h3>
          <div className="space-y-4">
            {measurements.map((measurement, index) => (
              <div
                key={measurement.id}
                className={`${theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-gray-50 hover:bg-gray-100"} rounded-lg p-4 transition-all animate-in slide-in-from-left-4 duration-500`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <label className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{measurement.label}</label>
                  <button className={`p-1 ${theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-200"} rounded transition-all`}>
                    <Edit3 size={16} className="text-[#00FF7F]" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={measurement.value}
                    onChange={(e) => handleUpdateMeasurement(measurement.id, e.target.value)}
                    className={`flex-1 ${theme === "dark" ? "bg-white/5 border-[#00FF7F]/20 focus:border-[#00FF7F]/50" : "bg-white border-gray-200 focus:border-[#00FF7F]/50"} border rounded-lg px-4 py-3 text-2xl font-bold focus:outline-none transition-all`}
                  />
                  <span className={`text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{measurement.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${theme === "dark" ? "bg-white/5 border-[#00FF7F]/10" : "bg-white border-gray-200"} backdrop-blur-sm border rounded-xl p-6`}>
          <h3 className="text-xl font-bold mb-6">Visualização 3D</h3>
          <div className="aspect-square bg-gradient-to-br from-[#00FF7F]/10 to-transparent rounded-lg flex items-center justify-center border border-[#00FF7F]/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
            <Ruler className="text-[#00FF7F]/50 animate-pulse" size={64} />
          </div>
          <div className="mt-6 space-y-3">
            <div className={`flex justify-between text-sm p-3 ${theme === "dark" ? "bg-white/5" : "bg-gray-50"} rounded-lg`}>
              <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Área Total</span>
              <span className="font-semibold text-[#00FF7F]">
                {(parseFloat(measurements[0]?.value || "0") * parseFloat(measurements[2]?.value || "0")).toFixed(2)} m²
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Comments({ theme, showNotification, userId, userName }: { theme: "dark" | "light"; showNotification: (msg: string) => void; userId: string; userName?: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, [userId]);

  const loadComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setComments(data || []);
    setLoading(false);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          text: newComment,
          user_id: userId,
          user_name: userName || "Usuário",
          reactions: 0,
        },
      ])
      .select();

    if (!error && data) {
      setComments([data[0], ...comments]);
      setNewComment("");
      showNotification("Comentário enviado!");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold">Comentários</h2>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>Colabore com sua equipe em tempo real</p>
      </div>

      <div className={`${theme === "dark" ? "bg-white/5 border-[#00FF7F]/10" : "bg-white border-gray-200"} backdrop-blur-sm border rounded-xl p-6`}>
        <form onSubmit={handleAddComment} className="flex gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF7F] to-[#00CC66] flex items-center justify-center text-black font-bold flex-shrink-0">
            {userName?.charAt(0).toUpperCase() || "U"}
          </div>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Adicione um comentário..."
            className={`flex-1 ${theme === "dark" ? "bg-white/5 border-[#00FF7F]/10 focus:border-[#00FF7F]/50" : "bg-white border-gray-200 focus:border-[#00FF7F]/50"} border rounded-lg px-4 py-3 focus:outline-none transition-all`}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#00FF7F] text-black font-semibold rounded-lg hover:bg-[#00FF7F]/90 transition-all hover:scale-105"
          >
            Enviar
          </button>
        </form>

        {comments.length === 0 ? (
          <p className="text-center text-gray-400 py-8">Nenhum comentário ainda. Seja o primeiro!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div
                key={comment.id}
                className={`flex gap-3 p-4 ${theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-gray-50 hover:bg-gray-100"} rounded-lg transition-all animate-in slide-in-from-bottom-4 duration-500`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-[#00FF7F]/20 flex items-center justify-center text-[#00FF7F] font-bold flex-shrink-0">
                  {comment.user_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{comment.user_name}</span>
                    <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                      {new Date(comment.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-2`}>{comment.text}</p>
                  <div className="flex items-center gap-3">
                    <button className={`flex items-center gap-1 text-xs ${theme === "dark" ? "text-gray-400 hover:text-[#00FF7F]" : "text-gray-600 hover:text-[#00FF7F]"} transition-colors`}>
                      <Star size={14} />
                      {comment.reactions}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Projects({ theme, showNotification, userId }: { theme: "dark" | "light"; showNotification: (msg: string) => void; userId: string }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadProjects();
    }
  }, [userId]);

  const loadProjects = async () => {
    if (!userId) return;
    
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setProjects(data || []);
    setLoading(false);
  };

  const handleAddProject = async () => {
    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          name: `Projeto ${projects.length + 1}`,
          status: "Em Andamento",
          progress: 0,
          priority: "medium",
          user_id: userId,
        },
      ])
      .select();

    if (!error && data) {
      setProjects([data[0], ...projects]);
      showNotification("Novo projeto criado!");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Projetos</h2>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>Gerencie todos os seus projetos</p>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center gap-2 px-6 py-3 bg-[#00FF7F] text-black font-semibold rounded-lg hover:bg-[#00FF7F]/90 transition-all hover:scale-105 shadow-lg shadow-[#00FF7F]/20"
        >
          <Plus size={20} />
          Novo Projeto
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <FolderKanban className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-400">Nenhum projeto ainda. Crie seu primeiro projeto!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`${theme === "dark" ? "bg-white/5 border-[#00FF7F]/10 hover:border-[#00FF7F]/30" : "bg-white border-gray-200 hover:border-[#00FF7F]/50"} backdrop-blur-sm border rounded-xl p-6 transition-all hover:scale-[1.02] cursor-pointer animate-in slide-in-from-bottom-4 duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      project.priority === "high" ? "bg-red-500/20 text-red-400" :
                      project.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-blue-500/20 text-blue-400"
                    }`}>
                      {project.priority === "high" ? "Alta" : project.priority === "medium" ? "Média" : "Baixa"}
                    </span>
                  </div>
                  <span className="text-sm text-[#00FF7F]">{project.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className={`p-2 ${theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"} rounded-lg transition-all`}>
                    <Share2 size={18} />
                  </button>
                  <button className={`p-2 ${theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-100"} rounded-lg transition-all`}>
                    <Star size={18} />
                  </button>
                </div>
              </div>

              <div className={`w-full ${theme === "dark" ? "bg-white/10" : "bg-gray-200"} rounded-full h-2 mb-4 overflow-hidden`}>
                <div
                  className="bg-gradient-to-r from-[#00FF7F] to-[#00CC66] h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              <div className={`flex items-center gap-6 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                <span className="flex items-center gap-2">
                  <Target size={16} />
                  {project.progress}%
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {new Date(project.created_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Tasks({ theme, showNotification, userId }: { theme: "dark" | "light"; showNotification: (msg: string) => void; userId: string }) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadTasks();
    }
  }, [userId]);

  const loadTasks = async () => {
    if (!userId) return;
    
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setTasks(data || []);
    setLoading(false);
  };

  const handleAddTask = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          title: `Tarefa ${tasks.length + 1}`,
          priority: "medium",
          status: "pending",
          user_id: userId,
        },
      ])
      .select();

    if (!error && data) {
      setTasks([data[0], ...tasks]);
      showNotification("Nova tarefa criada!");
    }
  };

  const toggleTask = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    
    await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", id);

    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
    showNotification("Status da tarefa atualizado!");
  };

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Tarefas</h2>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>Organize suas atividades</p>
        </div>
        <button
          onClick={handleAddTask}
          className="flex items-center gap-2 px-6 py-3 bg-[#00FF7F] text-black font-semibold rounded-lg hover:bg-[#00FF7F]/90 transition-all hover:scale-105 shadow-lg shadow-[#00FF7F]/20"
        >
          <Plus size={20} />
          Nova Tarefa
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <CheckSquare className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-400">Nenhuma tarefa ainda. Crie sua primeira tarefa!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className={`${theme === "dark" ? "bg-white/5 border-[#00FF7F]/10 hover:border-[#00FF7F]/30" : "bg-white border-gray-200 hover:border-[#00FF7F]/50"} backdrop-blur-sm border rounded-xl p-4 transition-all hover:scale-[1.01] cursor-pointer animate-in slide-in-from-bottom-4 duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={task.status === "completed"}
                  onChange={() => toggleTask(task.id, task.status)}
                  className="mt-1 w-5 h-5 rounded border-[#00FF7F]/30 bg-white/5 checked:bg-[#00FF7F] cursor-pointer transition-all"
                />
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 transition-all ${task.status === "completed" ? "line-through text-gray-500" : ""}`}>
                    {task.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      task.priority === "high" ? "bg-red-500/20 text-red-400" :
                      task.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-blue-500/20 text-blue-400"
                    }`}>
                      {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(task.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Notifications({ theme, showNotification, userId }: { theme: "dark" | "light"; showNotification: (msg: string) => void; userId: string }) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, [userId]);

  const loadNotifications = async () => {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setNotifications(data || []);
    setLoading(false);
  };

  const markAllAsRead = async () => {
    await supabase
      .from("notifications")
      .update({ unread: false })
      .eq("user_id", userId)
      .eq("unread", true);

    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    showNotification("Todas as notificações marcadas como lidas!");
  };

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Notificações</h2>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}>Fique por dentro de tudo</p>
        </div>
        {notifications.some(n => n.unread) && (
          <button
            onClick={markAllAsRead}
            className="text-[#00FF7F] hover:text-[#00FF7F]/80 font-semibold transition-all"
          >
            Marcar todas como lidas
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-400">Nenhuma notificação ainda.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`${theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-white hover:bg-gray-50"} backdrop-blur-sm border rounded-xl p-4 transition-all cursor-pointer animate-in slide-in-from-bottom-4 duration-500 ${
                notification.unread ? "border-[#00FF7F]/30" : theme === "dark" ? "border-[#00FF7F]/10" : "border-gray-200"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  notification.type === "task" ? "bg-blue-500/20" :
                  notification.type === "comment" ? "bg-purple-500/20" :
                  notification.type === "badge" ? "bg-[#00FF7F]/20" :
                  "bg-orange-500/20"
                }`}>
                  {notification.type === "task" && <CheckSquare size={20} className="text-blue-400" />}
                  {notification.type === "comment" && <MessageSquare size={20} className="text-purple-400" />}
                  {notification.type === "badge" && <Award size={20} className="text-[#00FF7F]" />}
                  {notification.type === "project" && <FolderKanban size={20} className="text-orange-400" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold">{notification.title}</h3>
                    {notification.unread && (
                      <div className="w-2 h-2 rounded-full bg-[#00FF7F] flex-shrink-0 mt-2 animate-pulse" />
                    )}
                  </div>
                  <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-sm mb-2`}>{notification.message}</p>
                  <div className={`flex items-center gap-2 text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                    <Clock size={12} />
                    {new Date(notification.created_at).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
