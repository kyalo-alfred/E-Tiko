import { useEffect, useRef, useState } from 'react';
import { usersApi } from '../lib/api';
import type { User } from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const dataTableInstance = useRef<any>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0 && tableRef.current && !dataTableInstance.current) {
      initializeDataTable();
    }
  }, [users]);

  const loadUsers = async () => {
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const initializeDataTable = async () => {
    // Dynamically import DataTables
    if (typeof window !== 'undefined') {
      try {
        // Load jQuery
        const jQueryScript = document.createElement('script');
        jQueryScript.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
        jQueryScript.async = true;
        document.head.appendChild(jQueryScript);

        await new Promise((resolve) => {
          jQueryScript.onload = resolve;
        });

        // Load DataTables CSS
        const dataTablesCSS = document.createElement('link');
        dataTablesCSS.rel = 'stylesheet';
        dataTablesCSS.href = 'https://cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css';
        document.head.appendChild(dataTablesCSS);

        // Load DataTables JS
        const dataTablesScript = document.createElement('script');
        dataTablesScript.src = 'https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js';
        dataTablesScript.async = true;
        document.head.appendChild(dataTablesScript);

        await new Promise((resolve) => {
          dataTablesScript.onload = resolve;
        });

        // Initialize DataTable
        if (tableRef.current && (window as any).$) {
          dataTableInstance.current = (window as any).$(tableRef.current).DataTable({
            pageLength: 10,
            order: [[4, 'desc']],
            columnDefs: [
              { orderable: false, targets: 5 }
            ]
          });
        }
      } catch (error) {
        console.error('Failed to initialize DataTables:', error);
      }
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await usersApi.delete(userToDelete.id);
      
      // Update local state
      const updatedUsers = users.filter(u => u.id !== userToDelete.id);
      setUsers(updatedUsers);
      
      // Destroy and reinitialize DataTable
      if (dataTableInstance.current) {
        dataTableInstance.current.destroy();
        dataTableInstance.current = null;
      }
      
      toast.success('User deleted successfully');
      setUserToDelete(null);
      
      // Reinitialize DataTable after state update
      setTimeout(() => {
        if (updatedUsers.length > 0) {
          initializeDataTable();
        }
      }, 100);
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage all users in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table ref={tableRef} className="w-full display" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <Badge variant={user.role === 'organizer' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setUserToDelete(user)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user account for {userToDelete?.name}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
