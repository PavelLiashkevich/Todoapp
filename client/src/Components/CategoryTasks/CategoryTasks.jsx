import React from 'react';

import './categoryTasks.scss';

import axios from '../../api';

import closePng from '../../Assets/icons/close.png';

const CategoryTasks = ({ items, onRemove, onClickItem, activeItem }) => {
	// При нажатии на крестик, удаление выбранной категории
	const removeCategory = item => {
		if (window.confirm('Are you sure?')) {
			axios.delete('/lists' + item.id).then(() => {
				onRemove(item.id);
			});
		}
	};

	return (
		<div className='items'>
			<ul>
				{items.map((item, index) => (
					<li
						key={index}
						className={`item ${activeItem === item ? 'active' : ''}`}
						onClick={onClickItem ? () => onClickItem(item) : null}
					>
						<span>
							{item.name}
							{item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`}
						</span>
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
