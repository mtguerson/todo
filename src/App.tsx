import './global.css';
import { Header } from './components/Header';
import styles from './App.module.css';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { ListHeader } from './components/ListHeader';
import { Empty } from './components/Empty';
import { useState } from 'react';
import { Item } from './components/Item';

export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [inputValue, setInputValue] = useState('')

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1
    }

    return prevValue
  }, 0)

  function handleAddTask() {
    if (!inputValue) {
      return
    }

    const newTask: ITask = {
      id: new Date().getTime(),
      text: inputValue,
      isChecked: false,
    }

    setTasks((state) => [...state, newTask])
    setInputValue('')
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id)

    if (!confirm('Deseja mesmo apagar essa tarefa?')) {
      return
    }

    setTasks(filteredTasks)
  }

  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value }
      }

      return { ...task }
    })

    setTasks(updatedTasks)
  }

  return (
    <div>
      <Header />

      <section className={styles.wrapper}>
        <div className={styles.content}>
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <Button onClick={handleAddTask} />
        </div>

        <div className={styles.tasksList}>
          <ListHeader tasksCounter={tasks.length} checkedTasksCounter={checkedTasksCounter} />

          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={handleRemoveTask}
                  toggleTaskStatus={handleToggleTask}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </div>
  )
}
