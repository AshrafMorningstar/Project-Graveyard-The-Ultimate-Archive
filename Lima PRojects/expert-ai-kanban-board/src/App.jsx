/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * AI Kanban Board - Main Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, MoreHorizontal, BrainCircuit, Activity } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- MOCK AI ENGINE ---
const analyzeTask = (text) => {
  const t = text.toLowerCase();
  const tags = [];
  let points = 2; // Default effort

  // 1. Classification
  if (t.includes('bug') || t.includes('fix') || t.includes('crash')) tags.push({ name: 'Bug', color: 'bg-red-500' });
  if (t.includes('design') || t.includes('ui') || t.includes('ux')) tags.push({ name: 'Design', color: 'bg-pink-500' });
  if (t.includes('api') || t.includes('database') || t.includes('server')) tags.push({ name: 'Backend', color: 'bg-green-500' });
  if (t.includes('urgent') || t.includes('asap')) tags.push({ name: 'High Priority', color: 'bg-orange-500' });

  // 2. Effort Estimation
  if (t.includes('simple') || t.includes('typo')) points = 1;
  else if (t.includes('rewrite') || t.includes('refactor')) points = 8;
  else if (t.includes('analyze') || t.includes('research')) points = 5;
  else if (tags.some(tag => tag.name === 'Backend')) points = 5;

  return { tags, points };
};

// --- DATA ---
const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Design new landing page', tags: [{name:'Design', color:'bg-pink-500'}], points: 5 },
    'task-2': { id: 'task-2', content: 'Fix crash on login', tags: [{name:'Bug', color:'bg-red-500'}, {name:'High Priority', color:'bg-orange-500'}], points: 3 },
    'task-3': { id: 'task-3', content: 'Optimize database queries', tags: [{name:'Backend', color:'bg-green-500'}], points: 8 },
  },
  columns: {
    'col-1': { id: 'col-1', title: 'To Do', taskIds: ['task-1', 'task-2'] },
    'col-2': { id: 'col-2', title: 'In Progress', taskIds: ['task-3'] },
    'col-3': { id: 'col-3', title: 'Done', taskIds: [] },
  },
  columnOrder: ['col-1', 'col-2', 'col-3'],
};

// --- COMPONENTS ---
function App() {
  const [data, setData] = useState(initialData);
  const [newTask, setNewTask] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setIsAiProcessing(true);

    // Simulate AI Latency
    setTimeout(() => {
      const { tags, points } = analyzeTask(newTask);
      
      const newTaskId = uuidv4();
      const newTaskObj = {
        id: newTaskId,
        content: newTask,
        tags,
        points
      };

      setData(prev => {
        const newTasks = { ...prev.tasks, [newTaskId]: newTaskObj };
        const newCol = {
          ...prev.columns['col-1'],
          taskIds: [newTaskId, ...prev.columns['col-1'].taskIds]
        };
        
        return {
          ...prev,
          tasks: newTasks,
          columns: {
            ...prev.columns,
            ['col-1']: newCol
          }
        };
      });

      setNewTask('');
      setIsAiProcessing(false);
    }, 600);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    // Moving within same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };

      setData(prev => ({
        ...prev,
        columns: { ...prev.columns, [newColumn.id]: newColumn }
      }));
      return;
    }

    // Moving to different column
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setData(prev => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
             <BrainCircuit className="text-purple-500" />
             AI Kanban
          </h1>
          <p className="text-gray-400 mt-1">Smart task classification engine v1.4</p>
        </div>
        
        <form onSubmit={addTask} className="flex gap-2 relative">
           <input 
             type="text" 
             value={newTask}
             onChange={e => setNewTask(e.target.value)}
             placeholder="Describe a new task..." 
             className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 w-96 focus:outline-none focus:border-purple-500 transition-colors"
             disabled={isAiProcessing}
           />
           <button 
             type="submit" 
             disabled={!newTask.trim() || isAiProcessing}
             className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
           >
             {isAiProcessing ? <Activity size={18} className="animate-spin" /> : <Plus size={18} />}
             Add
           </button>
           
           {isAiProcessing && (
             <div className="absolute top-full mt-2 left-0 text-xs text-purple-400 animate-pulse">
               Analyzing intent & estimating effort...
             </div>
           )}
        </form>
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 h-full overflow-x-auto pb-4">
          {data.columnOrder.map(colId => {
            const column = data.columns[colId];
            const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

            return (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={clsx(
                      "bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 w-80 flex-shrink-0 border border-gray-700/50 flex flex-col transition-colors",
                      snapshot.isDraggingOver ? "bg-gray-800 border-purple-500/30" : ""
                    )}
                  >
                    <div className="flex justify-between items-center mb-4 px-1">
                      <h3 className="font-bold text-gray-200">{column.title}</h3>
                      <span className="bg-gray-700 text-gray-400 text-xs px-2 py-1 rounded-full">{tasks.length}</span>
                    </div>

                    <div className="space-y-3 min-h-[100px]">
                      {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={clsx(
                                "bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-600 group hover:border-gray-500 transition-all",
                                snapshot.isDragging ? "shadow-xl border-purple-500 rotate-2 z-50" : ""
                              )}
                              style={provided.draggableProps.style}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex flex-wrap gap-1">
                                  {task.tags.map((tag, i) => (
                                    <span key={i} className={twMerge("text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide", tag.color)}>
                                      {tag.name}
                                    </span>
                                  ))}
                                </div>
                                <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreHorizontal size={16} />
                                </button>
                              </div>
                              
                              <p className="text-sm font-medium text-gray-100 mb-3">{task.content}</p>
                              
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <div className="flex -space-x-1.5 overflow-hidden">
                                   <div className="inline-block h-5 w-5 rounded-full ring-2 ring-gray-700 bg-gray-500"></div>
                                </div>
                                <span className={clsx("ml-auto font-mono bg-gray-800 px-1.5 py-0.5 rounded", task.points >= 5 ? "text-orange-400" : "text-green-400")}>
                                  {task.points} pts
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
