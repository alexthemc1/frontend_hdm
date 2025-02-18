/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Check, Delete } from '@mui/icons-material';
import { Box, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

import { Snackbar, Alert } from '@mui/material';

const TodoPage = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error'>('success');
  
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editedTasks, setEditedTasks] = useState<{ [key: number]: string }>({});

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      handleFetchTasks();
      setMessage(`Tâche supprimée avec succès pour l'id : ${id}`);
      setSeverity('success');
      setOpen(true);
    } catch (error) {
      setMessage(`Erreur lors de la suppression pour l'id : ${id}`);
      setSeverity('error');
      setOpen(true);
    }
  };

  const handleTaskChange = (id: number, newName: string) => {
    setEditedTasks(prev => ({...prev, [id]: newName}));
  };

  const handleSave = async (task: Task) => {
    try {
      const newName = editedTasks[task.id];
      if (!newName || newName.trim() === '') return;
      await api.patch(`/tasks/${task.id}`, { name: newName });
      await handleFetchTasks();
      setMessage(`Tâche modifiée avec succès pour l'id : ${task.id}`);
      setSeverity('success');
      setOpen(true);
    } catch (error) {
      setMessage(`Erreur lors de la modification pour l'id : ${task.id}`);
      setSeverity('error');
      setOpen(true);
    }
  };
  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>
      <Snackbar 
        open={open} 
        autoHideDuration={3000} 
        onClose={() => setOpen(false)}
      >
        <Alert severity={severity} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box key={task.id} display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
            <p>{task.id}</p>
            <TextField 
              size="small"
              value={editedTasks[task.id] || task.name}
              onChange={(e) => handleTaskChange(task.id, e.target.value)}
              fullWidth 
              sx={{ maxWidth: 350 }} 
            />
            <Box>
              <IconButton 
                color="success" 
                onClick={() => handleSave(task)}
                disabled={!editedTasks[task.id] || editedTasks[task.id] === task.name}
              >
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default TodoPage;
