import React from "react"

import "./editTasks.scss"

import AddTask from "./AddTask"
import Task from "./Task"

import axios from "axios"

import editPng from "../../Assets/icons/edit.png"

function EditTasks({ list, onEditTitle, onAddTask, onEditTask, onRemoveTask, onDoneTask }) {
  // Изменение названия категории в блоке с заданиями (через "prompt")
  const editTitle = () => {
    const newTitle = window.prompt("Title Name", list.name)
    if (newTitle) {
      onEditTitle(list.id, newTitle)
      axios
        .patch(`${process.env.REACT_APP_SERVER_API}/lists` + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Error")
        })
    }
  }

  return (
    <>
      <div className='todo__list-right'>
        <div className='title'>
          <h2>{list.name}</h2>
        </div>

        <img onClick={editTitle} src={editPng} alt='Edit Category' className='todo__edit-image' />
      </div>
      <div className='todo__items'>
        {list.tasks && !list.tasks.length && <h3>no tasks</h3>}
        {list && list.tasks.map(task => <Task {...task} key={task.id} list={list} onEdit={onEditTask} onRemove={onRemoveTask} onDone={onDoneTask} />)}

        <AddTask key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </>
  )
}

export default EditTasks
