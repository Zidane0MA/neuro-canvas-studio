
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Eye, UserX, Trash2, Search, FilterX } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface User {
  id: string;
  email: string;
  name: string;
  registrationDate: string;
  activePods: number;
  totalPods: number;
  balance: number;
  status: 'online' | 'offline';
}

const USERS_PER_PAGE = 20;

const mockUsers: User[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `user-${i+1}`,
  email: i === 0 ? "admin@example.com" : `usuario${i+1}@example.com`,
  name: i === 0 ? "Admin" : `Usuario ${i+1}`,
  registrationDate: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
  activePods: Math.floor(Math.random() * 3),
  totalPods: Math.floor(Math.random() * 5) + 1,
  balance: parseFloat((Math.random() * 100).toFixed(2)),
  status: Math.random() > 0.3 ? 'offline' : 'online'
}));

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActivePods, setFilterActivePods] = useState(false);
  const [filterOnline, setFilterOnline] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogType, setDialogType] = useState<'detail' | 'suspend' | 'delete' | null>(null);
  const [visibleUsers, setVisibleUsers] = useState(USERS_PER_PAGE);
  const isMobile = useIsMobile();

  const handleSearch = () => {
    let filtered = mockUsers;
    
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterActivePods) {
      filtered = filtered.filter(user => user.activePods > 0);
    }
    
    if (filterOnline) {
      filtered = filtered.filter(user => user.status === 'online');
    }
    
    setUsers(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterActivePods(false);
    setFilterOnline(false);
    setUsers(mockUsers);
  };

  const loadMore = () => {
    setVisibleUsers(prev => prev + USERS_PER_PAGE);
  };

  const openUserDetail = (user: User) => {
    setSelectedUser(user);
    setDialogType('detail');
  };

  const openSuspendDialog = (user: User) => {
    setSelectedUser(user);
    setDialogType('suspend');
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setDialogType('delete');
  };

  const closeDialog = () => {
    setDialogType(null);
    setSelectedUser(null);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Usuarios</h1>
        <p className="text-muted-foreground">Gestiona los usuarios del sistema</p>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por nombre o email"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant={filterActivePods ? "default" : "outline"} onClick={() => {
              setFilterActivePods(!filterActivePods);
              handleSearch();
            }}>
              Pods Activos
            </Button>
            <Button variant={filterOnline ? "default" : "outline"} onClick={() => {
              setFilterOnline(!filterOnline);
              handleSearch();
            }}>
              Conectados
            </Button>
            <Button variant="ghost" onClick={clearFilters}>
              <FilterX className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
            <Button onClick={handleSearch}>
              Buscar
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={isMobile ? "w-[180px]" : ""}>Email</TableHead>
                <TableHead>Nombre</TableHead>
                {!isMobile && <TableHead>Registro</TableHead>}
                <TableHead>Pods</TableHead>
                {!isMobile && <TableHead>Saldo</TableHead>}
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.slice(0, visibleUsers).map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="max-w-[180px] truncate">{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  {!isMobile && <TableCell>{user.registrationDate}</TableCell>}
                  <TableCell>{user.activePods}/{user.totalPods}</TableCell>
                  {!isMobile && <TableCell>{user.balance.toFixed(2)} €</TableCell>}
                  <TableCell>
                    <Badge variant={user.status === 'online' ? 'default' : 'secondary'}>
                      {user.status === 'online' ? 'Online' : 'Offline'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openUserDetail(user)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openSuspendDialog(user)}>
                        <UserX className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(user)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {visibleUsers < users.length && (
          <div className="flex justify-center p-4 border-t">
            <Button variant="outline" onClick={loadMore}>Cargar Más</Button>
          </div>
        )}
      </div>

      {/* User Detail Dialog */}
      <Dialog open={dialogType === 'detail'} onOpenChange={() => dialogType === 'detail' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Usuario</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Email</div>
                  <div className="break-words">{selectedUser.email}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Nombre</div>
                  <div>{selectedUser.name}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Fecha de Registro</div>
                  <div>{selectedUser.registrationDate}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Pods</div>
                  <div>{selectedUser.activePods}/{selectedUser.totalPods}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Saldo</div>
                  <div>{selectedUser.balance.toFixed(2)} €</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Estado</div>
                  <Badge variant={selectedUser.status === 'online' ? 'default' : 'secondary'}>
                    {selectedUser.status === 'online' ? 'Online' : 'Offline'}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Suspend User Dialog */}
      <Dialog open={dialogType === 'suspend'} onOpenChange={() => dialogType === 'suspend' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspender Usuario</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres suspender a este usuario? Sus pods serán detenidos.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <p><strong>Usuario:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={closeDialog}>Cancelar</Button>
            <Button variant="destructive" onClick={closeDialog}>Suspender Usuario</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={dialogType === 'delete'} onOpenChange={() => dialogType === 'delete' && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Usuario</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar a este usuario? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <p><strong>Usuario:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={closeDialog}>Cancelar</Button>
            <Button variant="destructive" onClick={closeDialog}>Eliminar Usuario</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminUsers;
