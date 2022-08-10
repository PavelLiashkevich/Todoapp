import React from 'react';

import './footer.scss';

import gitPng from '../../Assets/icons/git.png';
import linkedinPng from '../../Assets/icons/linkedin.png';
import telegramPng from '../../Assets/icons/telegram.png';

function Footer() {
	return (
		<div className='footer'>
			<a
				href='https://github.com/PavelLiashkevich'
				target='_blank'
				rel='noreferrer'
			>
				<img src={gitPng} alt='GitHub' />
			</a>
			<a
				href='https://www.linkedin.com/in/pavel-liashkevich/'
				target='_blank'
				rel='noreferrer'
			>
				<img src={linkedinPng} alt='LinkedIn' />
			</a>
			<a
				href='https://telegram.me/pavelleshkevich'
				target='_blank'
				rel='noreferrer'
			>
				<img src={telegramPng} alt='Telegram' />
			</a>
		</div>
	);
}

export default Footer;
