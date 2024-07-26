document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:8080/api/pessoas';

    // Criar Pessoa
    document.getElementById('createPersonForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const email = document.getElementById('email').value;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, cpf, dataNascimento, email })
            });

            if (response.ok) {
                alert('Pessoa criada com sucesso');
                document.getElementById('createPersonForm').reset();
            } else {
                alert('Erro ao criar pessoa');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao criar pessoa');
        }
    });

    // Listar Pessoas
    document.getElementById('listPeopleButton').addEventListener('click', async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erro ao buscar pessoas');
            }
            const people = await response.json();

            const peopleList = document.getElementById('peopleList');
            peopleList.innerHTML = '';

            people.forEach(person => {
                const li = document.createElement('li');
                li.textContent = `ID: ${person.id}, Nome: ${person.nome}, CPF: ${person.cpf}, Data de Nascimento: ${person.dataNascimento}, Email: ${person.email}`;
                peopleList.appendChild(li);
            });
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao listar pessoas');
        }
    });

    // Consultar Pessoa por ID
    document.getElementById('getPersonButton').addEventListener('click', async () => {
        const id = document.getElementById('personId').value;

        try {
            const response = await fetch(`${apiUrl}/${id}`);
            const person = await response.json();

            const personDetails = document.getElementById('personDetails');
            if (response.ok) {
                personDetails.innerHTML = `
                    <p>ID: ${person.id}</p>
                    <p>Nome: ${person.nome}</p>
                    <p>CPF: ${person.cpf}</p>
                    <p>Data de Nascimento: ${person.dataNascimento}</p>
                    <p>Email: ${person.email}</p>
                `;
            } else {
                personDetails.innerHTML = '<p>Pessoa não encontrada</p>';
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao buscar pessoa');
        }
    });

    // Deletar Pessoa por ID
    document.getElementById('deletePersonButton').addEventListener('click', async () => {
        const id = document.getElementById('deleteId').value;

        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            });

            const deleteMessage = document.getElementById('deleteMessage');
            if (response.ok) {
                deleteMessage.innerHTML = '<p>Pessoa deletada com sucesso</p>';
            } else {
                deleteMessage.innerHTML = '<p>Erro ao deletar pessoa</p>';
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao deletar pessoa');
        }
    });
});
