import React, { useState } from 'react';

import axios from '../../api';

import plusSvg from '../../Assets/icons/plus.svg';

function AddTask({ list, onAddTask }) {
	// Состояние, отвечающее за видимость форм
	const [visibleForm, setVisibleForm] = useState(false);

	// Состояние, отвечающее за вводимые данные в "input"
	const [inputValue, setInputValue] = useState('');

	// Метод, отвечающий за переключение между формами, а также очистку input после переключения
	const switchForm = () => {
		setVisibleForm(!visibleForm);
		setInputValue('');
	};

	// Добавления задания(obj - пример объекта одного из заданий, на основе которого собирается новый)
	const addTask = () => {
		const obj = {
			listId: list.id,
			text: inputValue,
			completed: false,
		};

		// Отправка запроса в задания, если успешно, получаем данные, а далее срабатывает метод "onAddTask" и наш список с заданиями обновляется
		axios
			.post(`${process.env.REACT_APP_SERVER_API}/tasks`, obj)
			.then(({ data }) => {
				if (!inputValue) {
					alert("You haven't entered the task text");
					return;
				}
				onAddTask(list.id, data);
				switchForm();
			});
	};

	return (
		<div className='tasks__form'>
			{!visibleForm ? (
				<div onClick={switchForm} className='tasks__form-new'>
					<img src={plusSvg} alt='Plus Task' className='add-task' />
					<span>New Task</span>
				</div>
			) : (
				<div className='tasks__form-block'>
					<div>
						<input
							className='field field-width'
							type='text'
							placeholder='Task'
							value={inputValue}
							onChange={event => setInputValue(event.target.value)}
						/>
					</div>

					<button onClick={addTask} className='button-task'>
						Add Task
					</button>
					<button onClick={switchForm} className='button-task own-class'>
						Cancel
					</button>
				</div>
			)}
		</div>
	);
}

export default AddTask;
