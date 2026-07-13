import React from 'react';
import { get } from 'lodash';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

import Loading from '../../components/Loading';

import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
    const dispatch = useDispatch();

	// const id = props.match.params;
	const id = get(match, 'params.id', 0);

	const [nome, setNome] = React.useState('');
	const [sobrenome, setSobrenome] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [idade, setIdade] = React.useState('');
	const [peso, setPeso] = React.useState('');
	const [altura, setAltura] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	// Buscando aluno na API
	React.useEffect(() => {
		if (!id) return;

		async function getData() {
			try {
				setIsLoading(true);
				const { data } = await axios.get(`/alunos/${id}`);
				const Foto = get(data, 'Fotos[0].url', '');

				setNome(data.nome);
				setSobrenome(data.sobrenome);
				setEmail(data.email);
				setIdade(data.idade);
				setPeso(data.peso);
				setAltura(data.altura);
			} catch (e) {
				const errors = get(e, 'response.data.errors', []);
				const status = get(e, 'response.status', 0);

				// Verificando se houve um erro 400
				if (status === 400)
					errors.forEach(error => toast.error(error));

				// Redirecionando
				history.push('/');
			} finally {
				setIsLoading(false);
			}
		}

		getData();
	}, [id]);

	// Função para cadastrar ou editar aluno
	const handleSubmit = async event => {
		event.preventDefault();

		// Validando os campos
		let formErrors = false;

		if (nome.length < 2 || nome.length > 255) {
			toast.error('Nome precisa ter entre 2 a 255 caracteres');
			formErrors = true;
		}

		if (sobrenome.length < 2 || sobrenome.length > 255) {
			toast.error('Sobrenome precisa ter entre 2 a 255 caracteres');
			formErrors = true;
		}

		if (!isEmail(email)) {
			toast.error('E-mail inválido');
			formErrors = true;
		}

		if (!isInt(String(idade), { min: 0 })) {
			toast.error('Idade inválido');
			formErrors = true;
		}

		if (!isFloat(String(peso))) {
			toast.error(
				'Peso precisa ser um número inteiro ou de ponto flutuante'
			);
			formErrors = true;
		}

		if (!isFloat(String(altura))) {
			toast.error(
				'Altura precisa ser um número inteiro ou de ponto flutuante'
			);
			formErrors = true;
		}

		if (formErrors) return;

		// Cadastrando ou Editando
		try {
			setIsLoading(true);

			if (id) {
				// Editando
				await axios.put(`/alunos/${id}`, {
					nome,
					sobrenome,
					idade,
					email,
					peso,
					altura
				});

				toast.success('Aluno(a) editado(a) com sucesso!');
			} else {
				// Criando
				const { data } = await axios.post('/alunos', {
					nome,
					sobrenome,
					idade,
					email,
					peso,
					altura
				});

				toast.success('Aluno(a) criado(a) com sucesso!');
                history.push(`/aluno/${data.id}/edit`);
			}
		} catch (e) {
			const status = get(e, 'response.status', 0);
			const data = get(e, 'response.data', {});
			const errors = get(data, 'errors', []);

			if (errors.length > 0) {
				errors.forEach(error => toast.error(error));
            } else {
                toast.error('Erro desconhecido');
            }

            if(status === 401)  dispatch(actions.loginFailure());
		} finally {
            setIsLoading(false);
        }
	};

	return (
		<Container>
			<Loading isLoading={isLoading} />

			<h1>{id ? 'Editar Aluno' : 'Novo Aluno'}</h1>

			{/* Formulário de cadastro ou edição */}
			<Form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="nome">Nome:</label>
					<input
						type="text"
						name="nome"
						value={nome}
						onChange={event => setNome(event.target.value)}
						id="nome"
						placeholder="Digite seu nome"
					/>
				</div>

				<div>
					<label htmlFor="sobrenome">Sobrenome:</label>
					<input
						type="text"
						name="sobrenome"
						value={sobrenome}
						onChange={event => setSobrenome(event.target.value)}
						id="sobrenome"
						placeholder="Digite seu sobrenome"
					/>
				</div>

				<div>
					<label htmlFor="email">email:</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={event => setEmail(event.target.value)}
						id="email"
						placeholder="Digite seu email"
					/>
				</div>

				<div>
					<label htmlFor="idade">Idade:</label>
					<input
						type="number"
						name="iddae"
						value={idade}
						onChange={event => setIdade(event.target.value)}
						id="idade"
						placeholder="Digite sua idade"
						min={0}
					/>
				</div>

				<div>
					<label htmlFor="peso">Peso:</label>
					<input
						type="text"
						name="peso"
						value={peso}
						onChange={event => setPeso(event.target.value)}
						id="peso"
						placeholder="Digite seu peso"
					/>
				</div>

				<div>
					<label htmlFor="altura">Altura:</label>
					<input
						type="text"
						name="altura"
						value={altura}
						onChange={event => setAltura(event.target.value)}
						id="altura"
						placeholder="Digite sua altura"
					/>
				</div>

				<button type="submit">{id ? 'Editar' : 'Cadastrar'}</button>
			</Form>
		</Container>
	);
}

// Validando os props
Aluno.propTypes = {
	match: PropTypes.shape({}).isRequired
};
