import React from 'react';
import './categoryTasks.scss';
import closePng from '../../Assets/icons/close.png';
import axios from 'axios';

// Компонент отрисовывающий название каждой категории

const CategoryTasks = ({ items, deleteCategory, onRemove }) => {
	const removeCategory = item => {
		if (window.confirm('Are you sure?')) {
			axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
				onRemove(item.id);
			});
		}
	};

	return (
		<div className='items'>
			<ul>
				{items.map((item, index) => (
					<li key={index} className={`item ${item.active ? 'active' : ''}`}>
						<span>{item.name}</span>
						<img
							src={closePng}
							alt='Delete Category'
							className='item__delete'
							onClick={() => removeCategory(item)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryTasks;
