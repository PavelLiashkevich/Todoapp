import { useState, useEffect } from 'react';

import './App.scss';

import Header from './Components/Header/Header';
import CategoryTasks from './Components/CategoryTasks/CategoryTasks';
import AddCategory from './Components/AddCategory/AddCategory';
import EditTasks from './Components/EditCategory/EditTasks';
import Footer from './Components/Footer/Footer';

import axios from 'axios';

import listSvg from './Assets/icons/list.svg';

function App() {
	// Состояние, отвечающее за список категорий из фейковой базы данных (db.json)
	const [lists, setLists] = useState(null);

	// Состояние, отвечающее за применение css-класс 'active', для выбранной нами категории заданий
	const [activeItem, setActiveItem] = useState(null);

	useEffect(() => {
		// Получение данных из фейковой БД, а именно категории заданий и сами задания, относящиеся к каждой категории
		axios.get('http://localhost:3002/lists?_embed=tasks').then(({ data }) => {
			setLists(data);
		});
	}, []);

	// Добавление новой категории из input
	const addToList = obj => {
		const newList = [...lists, obj];
		setLists(newList);
	};

	// Создание нового задания и добавления в список(происходит сравнение, в какой категории мы пытаемся добавить новое задание)
	const onAddTask = (listId, taskObj) => {
		const newList = lists.map(item => {
			if (item.id === listId) {
				item.tasks = [...item.tasks, taskObj];
			}
			return item;
		});
		setLists(newList);
	};

	// Удаление задания из списка при нажатии на крестик
	const onRemoveTask = (listId, taskId) => {
		if (window.confirm('Are you sure?')) {
			const newList = lists.map(item => {
				if (item.id === listId) {
					item.tasks = item.tasks.filter(task => task.id !== taskId);
				}
				return item;
			});
			setLists(newList);

			// Удаление задания из БД
			axios.delete('http://localhost:3002/tasks/' + taskId).catch(() => {
				alert('Error');
			});
		}
	};

	// Изменение названия категории заданий, при нажатии на иконку "Редактировать"
	const onEditCategory = (id, title) => {
		const newList = lists.map(item => {
			if (item.id === id) {
				item.name = title;
			}
			return item;
		});
		setLists(newList);
	};

	// Изменение текста задания через "prompt"
	const onEditTask = (listId, taskObj) => {
		const newTaskText = window.prompt('Task text:', taskObj.text);

		if (!newTaskText) {
			return;
		}

		// Сравниваем в какой категории мы хотим поменять текст задания, далее сравниваем id задания, которое хотим изменить с id из БД, если все хорошо, заменяем текст на новый из "prompt"
		const newList = lists.map(list => {
			if (list.id === listId) {
				list.tasks = list.tasks.map(task => {
					if (task.id === taskObj.id) {
						task.text = newTaskText;
					}
					return task;
				});
			}
			return list;
		});
		setLists(newList);

		// Обновление в БД
		axios
			.patch('http://localhost:3002/tasks/' + taskObj.id, {
				text: newTaskText,
			})
			.catch(() => {
				alert('Error');
			});
	};

	// Отметка о выполнении задания (в случае выполнения, "checkbox" закрашен мятным цветом)
	const onDoneTask = (listId, taskId, done) => {
		const newList = lists.map(list => {
			if (list.id === listId) {
				list.tasks = list.tasks.map(task => {
					if (task.id === taskId) {
						task.done = done;
					}
					return task;
				});
			}
			return list;
		});
		setLists(newList);

		// Обновление в БД
		axios
			.patch('http://localhost:3002/tasks/' + taskId, {
				done: done,
			})
			.catch(() => {
				alert('Error');
			});
	};

	// Изменение ширины блоков с категориями и заданиями (при помощи событий мыши)
	const editWidth = event => {
		let dragX = event.clientX;

		const block1 = document.querySelector('.todo__category-tasks');

		document.onmousemove = function onMouseMove(event) {
			block1.style.width = block1.offsetWidth + event.clientX - dragX + 'px';
			dragX = event.clientX;
		};

		document.onmouseup = () =>
			(document.onmousemove = document.onmouseup = null);
	};

	return (
		<>
			<Header />

			<div className='todo'>
				<div className='todo__category-tasks'>
					<div className='todo__list-left'>
						<ul className='active'>
							<li>
								<img src={listSvg} alt='List' className='todo__list' />
								<span>All category</span>
							</li>
						</ul>

						{lists ? (
							<CategoryTasks
								items={lists}
								onRemove={id => {
									const newList = lists.filter(item => item.id !== id);
									setLists(newList);
								}}
								onClickItem={item => {
									setActiveItem(item);
								}}
								activeItem={activeItem}
							/>
						) : (
							'Loading...'
						)}

						<AddCategory addToList={addToList} />
					</div>
				</div>
				<div onMouseDown={editWidth} className='line'></div>
				<div className='todo__edit-tasks'>
					{lists && activeItem && (
						<EditTasks
							list={activeItem}
							onAddTask={onAddTask}
							onEditTitle={onEditCategory}
							onEditTask={onEditTask}
							onRemoveTask={onRemoveTask}
							onDoneTask={onDoneTask}
						/>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
}

export default App;
