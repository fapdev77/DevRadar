import React, { useState, useEffect } from 'react';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';


//Conceitos fundamentais
// components
// -> Bloco isoloado de HTML, CSS e JS, o qual não interfere no restante da aplicacao.
// -> Uma funcao que retorna o html ou uma acao executada pela aplicacao. 
// -> Componente sempre tem que ter a primeira letra em maiuscula, ex: App, CreateID, ShowMenu...
// -> Um componente por arquivo é a regra.

// estado
// -> Informaçoes mantidas pelo componente, lembrar do conceito de imutabilidade.

// propriedade
// -> Informações que um componente PAI passa para o componente FILHO


function App() {
  // guarda lista de devs 
  const [devs, setDevs] = useState([]);



  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    // roda funcao para carregar a listagem de devs cadastrados.
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    

    const response = await api.post('/devs',data)
    console.log('Dados do response...' + JSON.stringify(response.data));

    // Apos criar um novo usuario, exibe ele na lista
    setDevs([...devs, response.data]);
    
  }

  return (
    <div id="app"> 
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} /> 
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
