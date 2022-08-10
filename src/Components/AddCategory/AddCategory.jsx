import React, { useState } from 'react';
import axios from 'axios';

import './addCategory.scss';

import plusSvg from '../../Assets/icons/plus.svg';
import closePng from '../../Assets/icons/close.png';

function AddCategory({ addToList }) {
	// Состояние, отвечающее за видимость окна для добавления новой категории
	const [visiblePopup, setVisiblePopup] = useState(false);

	// Состояние, отвечающее за данные вводимые в "input"
	const [inputValue, setInputValue] = useState('');

	// Функция для добавления новой категории в конец списка(после добавления, popup скрывается и очищается input)
	const addNewCategory = () => {
		if (!inputValue) {
			alert('No data entered');
			return;
		}

		axios
			.post('http://localhost:3000/lists', { name: inputValue })
			.then(({ data }) => {
				if (!inputValue) {
					return data;
				}
				const objList = { ...data, tasks: [] };
				addToList(objList);
				onClose();
			});
	};

	// После нажатия на крестик очищается input и скрывается popup
	const onClose = () => {
		setVisiblePopup(false);
		setInputValue('');
	};

	return (
		<>
			<div
				className='add-category'
				onClick={() => setVisiblePopup(!visiblePopup)}
			>
				<img src={plusSvg} alt='Plus' className='add-category__plus' />
				<span>Add Category</span>
			</div>
			{visiblePopup && (
				<>
					<div className='add-category__popup'>
						<img
							onClick={onClose}
							src={closePng}
							alt='Close popup'
							className='close-popup'
						/>
						<input
							value={inputValue}
							onChange={event => {
								setInputValue(event.target.value);
							}}
							className='field'
							type='text'
							placeholder='Category Name'
						/>
						<div>
							<button onClick={addNewCategory} className='button'>
								Add
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default AddCategory;
