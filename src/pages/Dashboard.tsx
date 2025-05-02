
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { InstanceCard } from "@/components/dashboard/InstanceCard";
import { Activity, BarChart3, Cpu, ServerIcon, Users } from "lucide-react";

const Dashboard = () => {
  // Datos de ejemplo para las instancias
  const instances = [
    {
      id: "instance-1",
      name: "ComfyUI-1",
      status: "running",
      uptime: "2h 15m",
      cpu: "25%",
      memory: "4.2GB / 8GB",
      gpu: "65%",
    },
    {
      id: "instance-2",
      name: "ComfyUI-2",
      status: "stopped",
      uptime: "-",
      cpu: "-",
      memory: "-",
      gpu: "-",
    },
  ];

  return (
    <div className="min-h-screen flex">
      <DashboardNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="container flex-1 py-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Administra tus instancias de ComfyUI</p>
            </div>
            <Button className="flex items-center gap-2">
              <ServerIcon className="h-4 w-4" />
              <span>Nueva Instancia</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Instancias Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">2</div>
                  <ServerIcon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">CPU Promedio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">25%</div>
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">1</div>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Imágenes Generadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">42</div>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Rendimiento del Sistema</CardTitle>
              <CardDescription>Uso de recursos durante las últimas 24 horas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                <div className="flex flex-col items-center text-muted-foreground">
                  <BarChart3 className="h-10 w-10 mb-2" />
                  <p>Gráfico de rendimiento (Placeholder)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold mb-4">Instancias de ComfyUI</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {instances.map((instance) => (
              <InstanceCard key={instance.id} instance={instance} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
