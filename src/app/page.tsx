"use client";

import { useState } from "react";
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
  ChevronRight
} from "lucide-react";

type Screen = "dashboard" | "gallery" | "editor" | "comments" | "projects" | "tasks" | "notifications";

export default function MedidaFacil() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard, screen: "dashboard" as Screen },
    { name: "Galeria", icon: Image, screen: "gallery" as Screen },
    { name: "Editor", icon: Ruler, screen: "editor" as Screen },
    { name: "Comentários", icon: MessageSquare, screen: "comments" as Screen },
    { name: "Projetos", icon: FolderKanban, screen: "projects" as Screen },
    { name: "Tarefas", icon: CheckSquare, screen: "tasks" as Screen },
    { name: "Notificações", icon: Bell, screen: "notifications" as Screen },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#00FF7F]/10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg transition-all"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold">
            Medida<span className="text-[#00FF7F]">Fácil</span>
          </h1>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-all">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0D0D0D] border-r border-[#00FF7F]/10 z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8 hidden lg:block">
            Medida<span className="text-[#00FF7F]">Fácil</span>
          </h1>
          
          <nav className="space-y-2 mt-16 lg:mt-0">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => {
                    setCurrentScreen(item.screen);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#00FF7F]/10 text-[#00FF7F] shadow-lg shadow-[#00FF7F]/20"
                      : "hover:bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          {currentScreen === "dashboard" && <Dashboard />}
          {currentScreen === "gallery" && <Gallery />}
          {currentScreen === "editor" && <Editor />}
          {currentScreen === "comments" && <Comments />}
          {currentScreen === "projects" && <Projects />}
          {currentScreen === "tasks" && <Tasks />}
          {currentScreen === "notifications" && <Notifications />}
        </div>
      </main>
    </div>
  );
}

function Dashboard() {
  const stats = [
    { label: "Projetos Ativos", value: "12", change: "+3", icon: FolderKanban },
    { label: "Medidas Hoje", value: "48", change: "+12", icon: Ruler },
    { label: "Colaboradores", value: "8", change: "+2", icon: Users },
    { label: "Taxa Conclusão", value: "94%", change: "+5%", icon: TrendingUp },
  ];

  const recentProjects = [
    { name: "Reforma Apartamento 301", progress: 75, tasks: 12, members: 4 },
    { name: "Casa Jardim Europa", progress: 45, tasks: 8, members: 3 },
    { name: "Escritório Tech Hub", progress: 90, tasks: 15, members: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-gray-400 mt-1">Visão geral dos seus projetos</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#00FF7F] text-black font-semibold rounded-lg hover:bg-[#00FF7F]/90 transition-all hover:scale-105 shadow-lg shadow-[#00FF7F]/20">
          <Plus size={20} />
          Novo Projeto
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-[#00FF7F]/10 rounded-xl p-6 hover:border-[#00FF7F]/30 transition-all hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="text-[#00FF7F]" size={24} />
                <span className="text-[#00FF7F] text-sm font-semibold">{stat.change}</span>
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Projects */}
      <div className="bg-white/5 backdrop-blur-sm border border-[#00FF7F]/10 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Projetos Recentes</h3>
        <div className="space-y-4">
          {recentProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{project.name}</h4>
                <span className="text-[#00FF7F] text-sm font-semibold">{project.progress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                <div
                  className="bg-[#00FF7F] h-2 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <CheckSquare size={16} />
                  {project.tasks} tarefas
                </span>
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  {project.members} membros
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white/5 backdrop-blur-sm border border-[#00FF7F]/10 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Conquistas Recentes</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["Mestre das Medidas", "Colaborador Pro", "100 Projetos", "Líder de Equipe"].map((badge, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#00FF7F]/20 to-transparent border border-[#00FF7F]/30 rounded-lg p-4 text-center hover:scale-105 transition-all"
            >
              <Award className="text-[#00FF7F] mx-auto mb-2" size={32} />
              <p className="text-sm font-semibold">{badge}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const photos = [
    { id: 1, title: "Sala Principal", date: "Hoje", measurements: 8 },
    { id: 2, title: "Cozinha Integrada", date: "Ontem", measurements: 12 },
    { id: 3, title: "Quarto Master", date: "2 dias atrás", measurements: 6 },
    { id: 4, title: "Banheiro Suite", date: "3 dias atrás", measurements: 5 },
    { id: 5, title: "Área Externa", date: "1 semana atrás", measurements: 10 },
    { id: 6, title: "Escritório", date: "1 semana atrás", measurements: 7 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Galeria de Fotos</h2>
          <p className="text-gray-400 mt-1">Todas as suas fotos com medidas</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#00FF7F] text-black font-semibold rounded-lg hover:bg-[#00FF7F]/90 transition-all hover:scale-105 shadow-lg shadow-[#00FF7F]/20">
          <Camera size={20} />
          Nova Foto
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar fotos..."
            className="w-full bg-white/5 border border-[#00FF7F]/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[#00FF7F]/50 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group bg-white/5 backdrop-blur-sm border border-[#00FF7F]/10 rounded-xl overflow-hidden hover:border-[#00FF7F]/30 transition-all hover:scale-105 cursor-pointer"
          >
            <div className="aspect-video bg-gradient-to-br from-[#00FF7F]/20 to-transparent flex items-center justify-center relative">
              <Image className="text-[#00FF7F]/50" size={48} />
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                {photo.measurements} medidas
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{photo.title}</h3>
              <p className="text-sm text-gray-400">{photo.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Editor() {
  const [measurements, setMeasurements] = useState([
    { id: 1, label: "Largura", value: "3.50", unit: "m" },
    { id: 2, label: "Altura", value: "2.80", unit: "m" },
    { id: 3, label: "Profundidade", value: "4.20", unit: "m" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Editor de Medidas</h2>
          <p className="text-gray-400 mt-1">Adicione e edite medidas com precisão</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#00FF7F] text-black font-semibold rounded-lg hover:bg-[#00FF7F]/90 transition-all hover:scale-105 shadow-lg shadow-[#00FF7F]/20">
          <Plus size={20} />
          Nova Medida
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <div className="bg-white/5 backdrop-blur-sm border border-[#00FF7F]/10 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">Medidas Atuais</h3>
          <div className="space-y-4">
            {measurements.map((measurement) => (
              <div
                key={measurement.id}
                className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm text-gray-400">{measurement.label}</label>
                  <button className="p-1 hover:bg-white/10 rounded transition-all">
                    <Edit3 size={16} className="text-[#00FF7F]" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={measurement.value}
                    className="flex-1 bg-white/5 border border-[#00FF7F]/20 rounded-lg px-4 py-3 text-2xl font-bold focus:outline-none focus:border-[#00FF7F]/50 transition-all"
                  />
                  <span className="text-xl text-gray-400">{measurement.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-white/5 backdrop-blur-sm border border-[#00FF7F]/10 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">Visualização</h3>
          <div className="aspect-square bg-gradient-to-br from-[#00FF7F]/10 to-transparent rounded-lg flex items-center justify-center border border-[#00FF7F]/20">
            <Ruler className="text-[#00FF7F]/50" size={64} />
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Área Total</span>
              <span className="font-semibold text-[#00FF7F]">14.70 m²</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Perímetro</span>
              <span className="font-semibold text-[#00FF7F]">15.40 m</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Volume</span>
              <span className="font-semibold text-[#00FF7F]">41.16 m³</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Comments() {
  const comments = [
    { id: 1, user: "João Silva", text: "Medida da porta precisa ser revisada", time: "5 min atrás", avatar: "JS" },
    { id: 2, user: "Maria Santos", text: "Confirmado! Altura do teto está correta.", time: "1 hora atrás", avatar: "MS" },
    { id: 3, user: "Pedro Costa", text: "Podemos adicionar medida da janela?", time: "2 horas atrás", avatar: "PC" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Comentários</h2>
        <p className="text-gray-400 mt-1">Colabore com sua equipe</p>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-[#00FF7F]/10 rounded-xl p-6">
        <div className="flex gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#00FF7F]/20 flex items-center justify-center text-[#00FF7F] font-bold">
            VC
          </div>
          <input
            type="text"
            placeholder="Adicione um comentário..."
            className="flex-1 bg-white/5 border border-[#00FF7F]/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00FF7F]/50 transition-all"
          />
          <button className="px-6 py-3 bg-[#00FF7F] text-black font-semibold rounded-lg hover:bg-[#00FF7F]/90 transition-all">
            Enviar
          </button>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-full bg-[#00FF7F]/20 flex items-center justify-center text-[#00FF7F] font-bold flex-shrink-0">
                {comment.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{comment.user}</span>
                  <span className="text-xs text-gray-400">{comment.time}</span>
                </div>
                <p className="text-gray-300">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const projects = [
    { id: 1, name: "Reforma Apartamento 301", status: "Em Andamento", progress: 75, members: 4, tasks: 12 },
    { id: 2, name: "Casa Jardim Europa", status: "Em Andamento", progress: 45, members: 3, tasks: 8 },
    { id: 3, name: "Escritório Tech Hub", status: "Quase Concluído", progress: 90, members: 5, tasks: 15 },
    { id: 4, name: "Loja Centro Comercial", status: "Planejamento", progress: 20, members: 2, tasks: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Projetos</h2>
          <p className="text-gray-400 mt-1">Gerencie todos os seus projetos</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#00FF7F] text-black font-semibold rounded-lg hover:bg-[#00FF7F]/90 transition-all hover:scale-105 shadow-lg shadow-[#00FF7F]/20">
          <Plus size={20} />
          Novo Projeto
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white/5 backdrop-blur-sm border border-[#00FF7F]/10 rounded-xl p-6 hover:border-[#00FF7F]/30 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                <span className="text-sm text-[#00FF7F]">{project.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                  <Share2 size={18} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                  <Star size={18} />
                </button>
              </div>
            </div>

            <div className="w-full bg-white/10 rounded-full h-2 mb-4">
              <div
                className="bg-[#00FF7F] h-2 rounded-full transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <CheckSquare size={16} />
                {project.tasks} tarefas
              </span>
              <span className="flex items-center gap-2">
                <Users size={16} />
                {project.members} membros
              </span>
              <span className="flex items-center gap-2">
                <TrendingUp size={16} />
                {project.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tasks() {
  const tasks = [
    { id: 1, title: "Medir parede principal", project: "Apartamento 301", priority: "Alta", status: "pending" },
    { id: 2, title: "Revisar medidas da cozinha", project: "Casa Jardim", priority: "Média", status: "pending" },
    { id: 3, title: "Adicionar fotos do banheiro", project: "Escritório Tech", priority: "Baixa", status: "completed" },
    { id: 4, title: "Calcular área total", project: "Loja Centro", priority: "Alta", status: "pending" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Tarefas</h2>
          <p className="text-gray-400 mt-1">Organize suas atividades</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#00FF7F] text-black font-semibold rounded-lg hover:bg-[#00FF7F]/90 transition-all hover:scale-105 shadow-lg shadow-[#00FF7F]/20">
          <Plus size={20} />
          Nova Tarefa
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white/5 backdrop-blur-sm border border-[#00FF7F]/10 rounded-xl p-4 hover:border-[#00FF7F]/30 transition-all hover:scale-[1.01] cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={task.status === "completed"}
                className="mt-1 w-5 h-5 rounded border-[#00FF7F]/30 bg-white/5 checked:bg-[#00FF7F] cursor-pointer"
              />
              <div className="flex-1">
                <h3 className={`font-semibold mb-1 ${task.status === "completed" ? "line-through text-gray-500" : ""}`}>
                  {task.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <FolderKanban size={14} />
                    {task.project}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    task.priority === "Alta" ? "bg-red-500/20 text-red-400" :
                    task.priority === "Média" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-blue-500/20 text-blue-400"
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Notifications() {
  const notifications = [
    { id: 1, type: "task", title: "Nova tarefa atribuída", message: "João Silva atribuiu 'Medir parede' para você", time: "5 min atrás", unread: true },
    { id: 2, type: "comment", title: "Novo comentário", message: "Maria Santos comentou no projeto Apartamento 301", time: "1 hora atrás", unread: true },
    { id: 3, type: "badge", title: "Nova conquista!", message: "Você desbloqueou o badge 'Mestre das Medidas'", time: "2 horas atrás", unread: false },
    { id: 4, type: "project", title: "Projeto atualizado", message: "Casa Jardim Europa atingiu 50% de conclusão", time: "1 dia atrás", unread: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Notificações</h2>
          <p className="text-gray-400 mt-1">Fique por dentro de tudo</p>
        </div>
        <button className="text-[#00FF7F] hover:text-[#00FF7F]/80 font-semibold transition-all">
          Marcar todas como lidas
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white/5 backdrop-blur-sm border rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer ${
              notification.unread ? "border-[#00FF7F]/30" : "border-[#00FF7F]/10"
            }`}
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
                    <div className="w-2 h-2 rounded-full bg-[#00FF7F] flex-shrink-0 mt-2" />
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-2">{notification.message}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock size={12} />
                  {notification.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
