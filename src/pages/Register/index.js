import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

import axios from '../../services/axios';
import history from '../../services/history';

export default function Register() {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// Função do submit do formulário
	async function handleSubmit(event) {
		event.preventDefault();
		let formErrors = false;

		// Realizando a validação dos dados
		if (nome.length < 2 || nome.length > 100) {
			formErrors = true;
			toast.error('Campo nome deve ter entre 2 e 100 caracteres');
		}

		if (!isEmail(email)) {
			formErrors = true;
			toast.error('E-mail inválido');
		}

		if (password.length < 6 || password.length > 16) {
			formErrors = true;
			toast.error('A senha precisa ter entre 6 a 16 caracteres');
		}

		if (formErrors) return;

		// Registrado no banco de dados
		try {
			await axios.post('/users', {
				nome,
				email,
				password
			});

            toast.success('Você fez seu cadastro');
            history.push('/');
		} catch (err) {
            // const status = get(err, 'response.status', 0);
            const errors = get(err, 'response.data.errors', []);

            errors.forEach(err => toast.error(err));
        }
	}

	return (
		<Container>
			<h1>Crie sua conta</h1>

			<Form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="nome">Nome:</label>
					<input
						type="text"
						name="nome"
						id="nome"
						placeholder="Digite seu nome"
						value={nome}
						onChange={event => setNome(event.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="email">E-mail:</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Digite seu e-mail"
						value={email}
						onChange={event => setEmail(event.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="password">Senha:</label>
					<input
						type="password"
						name="senha"
						id="password"
						placeholder="Digite uma senha"
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
				</div>

				<button type="submit">Criar minha conta</button>
			</Form>
		</Container>
	);
}
