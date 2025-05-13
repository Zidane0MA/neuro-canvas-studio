
import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Server, Play, StopCircle, Terminal, ExternalLink, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Pod, initialAdminPods, togglePodStatus, deletePod } from "@/utils/podUtils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const AdminPods = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<string>("");
  const [pods, setPods] = useState<Pod[]>([]);
  
  // Cargar pods iniciales o desde localStorage al iniciar
  useEffect(() => {
    const savedPods = localStorage.getItem('adminPods');
    if (savedPods) {
      setPods(JSON.parse(savedPods));
    } else {
      setPods(initialAdminPods);
    }
  }, []);
  
  // Guardar pods en localStorage cuando cambien
  useEffect(() => {
    if (pods.length > 0) {
      localStorage.setItem('adminPods', JSON.stringify(pods));
    }
  }, [pods]);
  
  const viewLogs = (podName: string) => {
    // Simulate fetching logs
    setLogs(`[System] Iniciando ${podName}...\n[Info] Cargando configuración\n[Info] Conectando GPU\n[Info] Iniciando servicios\n[System] ${podName} iniciado correctamente.`);
  };

  // Manejar inicio/parada de pods
  const handleTogglePod = (podId: string) => {
    setPods(prevPods => 
      prevPods.map(pod => 
        pod.id === podId ? togglePodStatus(pod) : pod
      )
    );
  };
  
  // Manejar eliminación de pods
  const handleDeletePod = (podId: string) => {
    setPods(prevPods => deletePod(podId, prevPods));
    toast.success("Pod eliminado correctamente");
  };

  return (
    <DashboardLayout title="Administración de Pods">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Pods</h1>
          <p className="text-muted-foreground">Gestiona los contenedores desplegados</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-right">
            <div className="text-muted-foreground">Saldo</div>
            <div className="font-semibold">
              {typeof user?.balance === 'number' && user?.balance === Infinity ? '∞ €' : `${user?.balance?.toFixed(2) || 0} €`}
            </div>
          </div>
          
          <Link to="/admin/pods/deploy">
            <Button className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              <span>Deploy</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6">
        {pods.length > 0 ? (
          pods.map((pod) => (
            <Card key={pod.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    {pod.name}
                    <Badge variant={pod.status === "running" ? "default" : "secondary"} className="ml-2">
                      {pod.status === "running" ? "Ejecutando" : "Detenido"}
                    </Badge>
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Usuario: {pod.user}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tiempo Activo</span>
                        <span>{pod.uptime}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU</span>
                        <span>{pod.status === "running" ? `${pod.cpu}%` : "No disponible"}</span>
                      </div>
                      {pod.status === "running" && (
                        <Progress value={pod.cpu} className="h-2" />
                      )}
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memoria</span>
                        <span>{pod.status === "running" ? pod.memory : "No disponible"}</span>
                      </div>
                      {pod.status === "running" && (
                        <Progress value={parseInt(pod.memory.split('/')[0].replace('GB', '')) / parseInt(pod.memory.split('/')[1].replace('GB', '')) * 100} className="h-2" />
                      )}
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>GPU</span>
                        <span>{pod.status === "running" ? `${pod.gpu}%` : "No disponible"}</span>
                      </div>
                      {pod.status === "running" && (
                        <Progress value={pod.gpu} className="h-2" />
                      )}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 flex flex-wrap justify-end items-center gap-3">
                    {pod.status === "running" ? (
                      <Button 
                        variant="outline" 
                        className="flex gap-2 items-center"
                        onClick={() => handleTogglePod(pod.id)}
                      >
                        <StopCircle className="h-4 w-4" />
                        Detener
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="flex gap-2 items-center"
                        onClick={() => handleTogglePod(pod.id)}
                      >
                        <Play className="h-4 w-4" />
                        Iniciar
                      </Button>
                    )}
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="flex gap-2 items-center text-red-500">
                          <Trash2 className="h-4 w-4" />
                          Eliminar
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción eliminará el pod "{pod.name}" y no se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeletePod(pod.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex gap-2 items-center">
                          <ExternalLink className="h-4 w-4" />
                          Connect
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Conectar a {pod.name}</DialogTitle>
                          <DialogDescription>
                            Accede a tu pod mediante los siguientes puertos:
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {pod.ports.map((port) => (
                            <div key={port} className="flex justify-between items-center">
                              <div>Puerto {port}</div>
                              <Button variant="outline" disabled={pod.status !== "running"}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Abrir
                              </Button>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex gap-2 items-center" onClick={() => viewLogs(pod.name)}>
                          <Terminal className="h-4 w-4" />
                          Logs
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                          <DialogTitle>Logs de {pod.name}</DialogTitle>
                          <DialogDescription>
                            Registro de actividad del pod
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <div className="bg-black rounded-md p-4 h-[300px] text-white font-mono text-sm overflow-auto whitespace-pre-line">
                            {logs || "No hay logs disponibles."}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10">
            <Server className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No hay pods desplegados</h3>
            <p className="text-muted-foreground mb-6">Despliega un pod con GPU para comenzar</p>
            <Link to="/admin/pods/deploy">
              <Button className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                <span>Deploy un pod</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminPods;
