import React from 'react';
import './editCategory.scss';
import editPng from '../../Assets/icons/edit.png';

function EditCategory({ list }) {
	console.log(list);
	return (
		<>
			<div className='todo__list-right'>
				<h2>{list.name}</h2>
				<img src={editPng} alt='Edit Category' className='todo__edit-image' />
			</div>
			<div className='todo__items'>
				{list.tasks.map(task => (
					<div key={task.id}>
						<div className='checkbox'>
							<input id={`task-${task.id}`} type='checkbox' />
							<label htmlFor={`task-${task.id}`}></label>
						</div>
						<input
							type='text'
							readOnly
							value={task.text}
							className='input-item'
						/>
					</div>
				))}
			</div>
		</>
	);
}

export default EditCategory;
