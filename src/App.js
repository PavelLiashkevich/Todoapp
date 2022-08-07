import { useState, useEffect } from 'react';
import './App.scss';
import Header from './Components/Header/Header';
import CategoryTasks from './Components/CategoryTasks/CategoryTasks';
import AddCategory from './Components/AddCategory/AddCategory';
import EditCategory from './Components/EditCategory/EditCategory';

import axios from 'axios';
import DataBase from './Assets/db.json';
import listSvg from './Assets/icons/list.svg';

function App() {
	// Отрисовка названия каждой категории из фейковой базы данных (db.json)
	const [lists, setLists] = useState(
		DataBase.lists.map(item => {
			item.name = item.name;
			return item;
		})
	);

	// Создание нового массива, добавление в него уже имеющегося списка категорий, а также новой категории из input
	const addToList = obj => {
		const newList = [...lists, obj];
		setLists(newList);
	};

	useEffect(() => {
		// Получение данных из фейковой БД
		axios
			.get('http://localhost:3002/lists?_expand=&_embed=tasks')
			.then(({ data }) => {
				setLists(data);
			});
	}, []);

	return (
		<>
			<Header />

			<div className='todo'>
				<div className='todo__category-tasks'>
					<div className='todo__list-left'>
						<ul className='active'>
							<li>
								<img src={listSvg} alt='List' className='todo__list' />
								<span>All tasks</span>
							</li>
						</ul>

						<CategoryTasks
							items={lists}
							onRemove={id => {
								const newList = lists.filter(item => item.id !== id);
								setLists(newList);
							}}
							deleteCategory
						/>

						<AddCategory addToList={addToList} />
					</div>
				</div>
				<div className='todo__edit-tasks'>
					{lists && <EditCategory list={lists[1]} />}
				</div>
			</div>
		</>
	);
}

export default App;
