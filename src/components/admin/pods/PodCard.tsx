
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Server, Play, StopCircle, Terminal, ExternalLink, Trash2 } from "lucide-react";
import { Pod } from "@/utils/podUtils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface PodCardProps {
  pod: Pod;
  onTogglePod: (podId: string) => void;
  onDeletePod: (podId: string) => void;
  viewLogs: (podName: string) => void;
  logs: string;
}

export const PodCard: React.FC<PodCardProps> = ({
  pod,
  onTogglePod,
  onDeletePod,
  viewLogs,
  logs
}) => {
  return (
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
            <PodStats pod={pod} />
          </div>
          
          <div className="lg:col-span-2 flex flex-wrap justify-end items-center gap-3">
            {pod.status === "running" ? (
              <Button 
                variant="outline" 
                className="flex gap-2 items-center"
                onClick={() => onTogglePod(pod.id)}
              >
                <StopCircle className="h-4 w-4" />
                Detener
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="flex gap-2 items-center"
                onClick={() => onTogglePod(pod.id)}
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
                    onClick={() => onDeletePod(pod.id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <PodConnectDialog pod={pod} />
            <PodLogsDialog pod={pod} viewLogs={viewLogs} logs={logs} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PodStats: React.FC<{ pod: Pod }> = ({ pod }) => {
  return (
    <>
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
    </>
  );
};

const PodConnectDialog: React.FC<{ pod: Pod }> = ({ pod }) => {
  return (
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
            <div key={port.number} className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium">{port.service}</span>
                <span className="text-sm text-muted-foreground">Puerto {port.number}</span>
              </div>
              <Button variant="outline" disabled={pod.status !== "running"}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Abrir
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PodLogsDialog: React.FC<{ pod: Pod, viewLogs: (podName: string) => void, logs: string }> = ({ pod, viewLogs, logs }) => {
  return (
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
  );
};
