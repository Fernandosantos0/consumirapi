import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import {
	FaUserCircle,
	FaEdit,
	FaWindowClose,
	FaExclamation
} from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';

import Loading from '../../components/Loading';

/* Axios */
import axios from '../../services/axios';
import { toast } from 'react-toastify';

export default function Alunos() {
	const [alunos, setAlunos] = useState([]);
	const [isLoading, SetIsLoading] = useState(false);

	// Realizando a requisição
	useEffect(() => {
		async function getData() {
			SetIsLoading(true);

			const response = await axios.get('/alunos');
			const alunos = await response.data;
			setAlunos(alunos);

			SetIsLoading(false);
		}

		getData();
	}, []);

	// Função para mudar o ícone de apagar contato
	const handleDeleteAsk = function (event) {
		event.preventDefault();

		const exclamation = event.currentTarget.nextElementSibling;
		exclamation.setAttribute('display', 'block');

		// Removendo o ícone de apagar
		event.currentTarget.remove();
	};

    // Função para apagar
    const handleDelete = async (event, id, indice) => {
        event.persist();

        try {
            SetIsLoading(true);

            await axios.delete(`/alunos/${id}`);

            const novosAlunos = [ ...alunos ];
            novosAlunos.splice(indice, 1)

            setAlunos(novosAlunos);
        } catch(e) {
            const errors = get(e, 'response.data.errors', []);
            const status = get(e, 'response.status', 0);

            if(status === 401) {
                toast.error('Você precisa fazer login');
                return;
            } else {
                errors.forEach('Ocorreu um erro ao excluir aluno');
            }

        } finally {
            SetIsLoading(false);
        }
    };

	return (
		<Container>
			<Loading isLoading={isLoading} />

			<h1>Alunos</h1>

            <NovoAluno to='/aluno'>Novo Aluno</NovoAluno>

			<AlunoContainer>
				{alunos.map((aluno, indice) => (
					<div key={String(aluno.id)}>
						<ProfilePicture>
							{/* Operador Ternário */}
							{get(aluno, 'Fotos[0].url', false) ? (
								<img
									src={aluno.Fotos[0].url}
									aly={aluno.nome}
								/>
							) : (
								<FaUserCircle size={36} />
							)}
						</ProfilePicture>

						<span>{aluno.nome}</span>
						<span>{aluno.email}</span>

						{/* Links de navegação */}
						<Link to={`/aluno/${aluno.id}/edit`}>
							<FaEdit size={16} />
						</Link>

						<Link
							onClick={handleDeleteAsk}
							to={`/aluno/${aluno.id}/delete`}
						>
							<FaWindowClose size={16} />
						</Link>

						<FaExclamation
							size={16}
							display="none"
							cursor="pointer"
							onClick={event => handleDelete(event, aluno.id, indice)}
						/>
					</div>
				))}
			</AlunoContainer>
		</Container>
	);
}
