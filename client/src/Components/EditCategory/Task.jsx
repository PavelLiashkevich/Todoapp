import React from 'react';

import editPng from '../../Assets/icons/edit.png';
import closePng from '../../Assets/icons/close.png';

function Task({ id, text, list, onEdit, onRemove, onDone, done }) {
	// Отметка о выполнении задания (в случае выполнения, "checkbox" закрашен мятным цветом)
	const onChangeCheckbox = event => {
		onDone(list.id, id, event.target.checked);
	};

	return (
		<div key={id} className='item-task'>
			<div className='checkbox'>
				<input
					onChange={onChangeCheckbox}
					id={`task-${id}`}
					type='checkbox'
					checked={done}
				/>
				<label htmlFor={`task-${id}`}></label>
			</div>
			<p className='edit-item'>{text}</p>
			<div>
				<img
					onClick={() => onEdit(list.id, { id, text })}
					src={editPng}
					alt='Edit Task'
					className='common-style edit-style'
				/>
				<img
					onClick={() => onRemove(list.id, id)}
					src={closePng}
					alt='Remove Task'
					className='common-style remove-style'
				/>
			</div>
		</div>
	);
}

export default Task;
