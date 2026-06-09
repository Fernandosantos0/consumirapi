import React from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

import * as actions from '../../store/modules/auth/actions';

export default function Login() {
    const dispatch = useDispatch();

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	// Função para logar
	const handleSubmit = function (event) {
		event.preventDefault();
		let formErrors = false;

		// Realizando a validação dos dados
		if (!isEmail(email)) {
			formErrors = true;
			toast.error('E-mail inválido');
		}

		if (password.length < 6 || password.length > 16) {
			formErrors = true;
			toast.error('A senha precisa ter entre 6 a 16 caracteres');
		}

		if (formErrors) return;

        // Realizando a ação para logar
		dispatch(actions.loginRequest({ email, password }));
	};

	return (
		<Container>
			<h1>Login</h1>

			<Form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={event => setEmail(event.target.value)}
						placeholder="Digite seu e-mail"
					/>
				</div>

				<div>
					<label htmlFor="password">Senha:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={event => setPassword(event.target.value)}
						placeholder="Digite sua senha"
					/>
				</div>

				<button type="submit">Acessar</button>
			</Form>
		</Container>
	);
}
