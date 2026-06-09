import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture } from './styled';

/* Axios */
import axios from '../../services/axios';

export default function Alunos() {
	const [alunos, setAlunos] = useState([]);

	// Realizando a requisição
	useEffect(() => {
		async function getData() {
			const response = await axios.get('/alunos');
			const alunos = await response.data;
			setAlunos(alunos);
		}

		getData();
	}, []);

	return (
		<Container>
			<h1>Alunos</h1>

            <AlunoContainer>
                { alunos.map(aluno => (
                    <div key={String(aluno.id)}>

                        <ProfilePicture>
                            {/* Operador Ternário */}
                            { get(aluno, 'Fotos[0].url', false) ? (
                                <img src={aluno.Fotos[0].url} aly={aluno.nome} />
                            ) : (
                                <FaUserCircle size={36} />
                            )}
                        </ProfilePicture>

                        <span>{aluno.nome}</span>
                        <span>{aluno.email}</span>

                        {/* Links de navegação */}
                        <Link to={`/aluno/${aluno.id}/edit`}>
                            <FaEdit size={16}/>
                        </Link>

                        <Link to={`/aluno/${aluno.id}/delete`}>
                            <FaWindowClose size={16}/>
                        </Link>
                    </div>
                )) }
            </AlunoContainer>
		</Container>
	);
}
