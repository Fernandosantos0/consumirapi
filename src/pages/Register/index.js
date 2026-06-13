import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
    const dispatch = useDispatch();

    // Pegando os dados do Redux
    const id = useSelector(state => state.auth.user.id);
    const nomeStored = useSelector(state => state.auth.user.node);
    const emailStored = useSelector(state => state.auth.user.email);
    const isLoading = useSelector(state => state.auth.isLoading);

	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

    React.useEffect(() => {
        if(!id) return;

        setNome(nomeStored);
        setEmail(emailStored);
    }, [])

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

		if (!id && (password.length < 6 || password.length > 16)) {
			formErrors = true;
			toast.error('A senha precisa ter entre 6 a 16 caracteres');
		}

		if (formErrors) return;

        // Disparando uma ação do redux
        dispatch(actions.registerRequest({ nome, email, password, id }));
	}

	return (
		<Container>
			<h1>{id ? 'Editar dados' : 'Crie sua conta'}</h1>

            <Loading isLoading={isLoading} />

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

				<button type="submit">
                    {id ? 'Salvar' : 'Criar minha conta'}
                </button>
			</Form>
		</Container>
	);
}
