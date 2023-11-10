import React from 'react';
import { useSelector } from 'react-redux';

import './Home.css'

export default function () {

    const currentUser = useSelector(state => state.user);

    return (  
        <div className='main'>
            <div className='header'>
                <h1>{currentUser?.name ? `Olá, ${currentUser?.name}, ` : ''}Esta aplicação possui as seguinter funcionalidades:</h1>
            </div>
            <div>

                <h3>Back-end (NestJS):</h3>

                <li>Configurar um servidor NestJS para lidar com as solicitações HTTP relacionadas ao aplicativo de gerenciamento de tarefas;</li>
                <li>Criar um banco de dados PostgreSQL para armazenar as informações das tarefas;</li>
                <li>Criar modelos de dados para representar as tarefas, com campos como título, descrição, data de criação, data de conclusão, etc;</li>
                <li>Criar endpoints RESTful para ações como criar, listar, atualizar e excluir tarefas;</li>
                <li>Implementar autenticação de usuário usando JWT (JSON Web Tokens) para proteger as rotas de gerenciamento de tarefas;</li>
                
                
                <h3>Front-end (React):</h3>
                
                <li>Criar uma interface de usuário para exibir uma lista de tarefas, incluindo título, descrição, status (concluída ou não), e data de criação;</li>
                <li>Implementar um formulário de criação de tarefas que permita aos usuários adicionar novas tarefas;</li>
                <li>Adicionar funcionalidade para editar tarefas existentes, incluindo a capacidade de atualizar o título, a descrição e o status;</li>
                <li>Implementar a capacidade de excluir tarefas;</li>
                <li>Integrar a autenticação do usuário, exigindo que os usuários façam login para acessar o aplicativo.</li>
                
                
                <h3>Desafios Adicionais</h3>
                
                <li>Crie um arquivo Dockerfile para o back-end (NestJS) e outro para o front-end (React) para definir as instruções de construção dos contêineres;</li>
                <li>Crie um arquivo docker-compose.yml para orquestrar a execução dos contêineres, permitindo que eles se comuniquem entre si</li>
                

                
            </div>
        </div>
     );
}
