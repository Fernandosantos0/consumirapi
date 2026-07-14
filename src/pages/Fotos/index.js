import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Title, Form } from './styled';

import Loading from '../../components/Loading';

import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match }) {
    const dispatch = useDispatch();
	const id = get(match, 'params.id', '');

	const [isLoading, setIsLoading] = React.useState(false);
	const [foto, setFoto] = React.useState('');

	React.useEffect(() => {
		const getData = async () => {
			try {
                setIsLoading(true);
				const { data } = await axios.get(`/alunos/${id}`);
				setFoto(get(data, 'Fotos[0].url', ''));
			} catch {
                toast.error('Erro ao obter imagem');
                setIsLoading(false);
                history.push('/')
            } finally {
                setIsLoading(false);
            }
		};

		getData();
	}, [id]);

    const handleChange = async event => {
        const file = event.target.files[0];

        // Função do JS para criar uma url de um objeto
        const fotoURL = URL.createObjectURL(file);
        setFoto(fotoURL);

        // Criando um formulário via JS
        /* OBS.: è preciso criar um formulário via a classe FormData para o envio de arquivos no axios */
        const formData = new FormData();
        formData.append('aluno_id', id);
        formData.append('foto', file);

        // Enviando a foto para o servidor com o axios
        try {
            setIsLoading(true);

            /* OBS.: Quando se envia arquivo, é importante envia o cabeçalho da requisição */
            await axios.post(`/fotos`, formData, {
                /* Importante envia esse cabeçalho, se não o arquivo não será enviado */
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Foto enviada com sucesso!');
            setIsLoading(false);
        } catch(err) {
            const { status } = get(err, 'response', 0);
            const { data } = get(err, 'response', '');

            setIsLoading(false);

            toast.error('Erro ao enviar foto');
            if(status === 401) dispatch(actions.loginFailure());
        }
    };

	return (
		<Container>
			<Loading isLoading={isLoading} />

			<Title>Fotos</Title>

			<Form
				method="POST"
				acceptCharset="utf-8"
				encType="multipart/form-data"
			>
				<label htmlFor="foto">
					{foto ? <img src={foto} alt="Foto" /> : 'Selecionar'}

					<input type="file" name="foto" id="foto" onChange={handleChange} required />
				</label>
			</Form>
		</Container>
	);
}

// Validando o props
Fotos.propTypes = {
	match: PropTypes.shape({}).isRequired
};
