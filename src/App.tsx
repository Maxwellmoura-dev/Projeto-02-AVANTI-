// Importações de dependências e arquivos
import axios from 'axios'; // Biblioteca para fazer requisições HTTP
import './App.css'; // Estilo da aplicação
import { useState } from 'react'; // Hook do React para gerenciar estados

function App() {
  // Estados da aplicação
  const [search, setSearch] = useState(""); // Guarda o texto digitado no input
  const [name, setName] = useState("Aguardando..."); // Nome do usuário retornado pela API
  const [bio, setBio] = useState("Aguardando..."); // Biografia do usuário
  const [avatarURL, setAvatarURL] = useState(""); // URL da imagem de perfil
  const [showContent, setShowContent] = useState(false); // Controla se os dados devem ser exibidos
  const [error, setError] = useState(""); // Mensagem de erro
  const [isLoading, setIsLoading] = useState(false); // Mostra se a busca está em andamento (loading)

  // Função acionada ao clicar no botão de busca
  const handleSearch = () => {
    setIsLoading(true); // Ativa o loading
    setShowContent(false); // Oculta os dados anteriores
    setName("Aguardando...");
    setBio("Aguardando...");
    setAvatarURL("");
    setError(""); // Limpa erros anteriores

    // Faz a requisição para a API do GitHub
    axios
      .get(`https://api.github.com/users/${search}`)
      .then(res => {
        // Se der certo, os dados serão amostrados
        setName(res.data.name);
        setBio(res.data.bio);
        setAvatarURL(res.data.avatar_url);
        setShowContent(true);
        setError("");
      })
      .catch(() => {
        // Em caso de erro apareça a msg
        setError("Nenhum perfil foi encontrado com esse nome de usuário.\nTente novamente");
        setShowContent(false);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false); // loading
        }, 99); // tempo de loading
      });
  };

  return (
    <div className="container-app">
      <div className="container">
        {/* Cabeçalho */}
        <header className='header-top'>
          <ul>
            <img src="./src/img/logogit.png" alt="Logo GitHub" />
            <li>Perfil GitHub</li>
          </ul>
        </header>

        <main>
          {/* Formulário de busca */}
          <div className="form">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Digite um usuário do Github"
                onChange={(e) => setSearch(e.target.value)} // Atualiza o texto digitado
              />
              <button className="search-button" onClick={handleSearch}>
                {/* Ícone de lupa */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
          </div>

          {/* Exibe spinner de carregamento*/}
          {isLoading && <div className="spinner"></div>}

          {/* Exibe erro caso haja */}
          {error && <p className="erro">{error}</p>}

          {/* Exibe os dados do perfil se showContent for true */}
          <div className={`content ${showContent ? 'show' : ''}`}>
            <div>
              <img src={avatarURL} alt="perfil" />
              <div className="info">
                <h1>{name}</h1>
                <p>{bio}</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Elementos decorativos do fundo da página */}
      <div>
        <img className='pontos' src="./src/img/desing.png" alt="" />
        <div className="mancha-azul direita"></div>
        <div className="mancha-azul esquerda"></div>
      </div>
    </div>
  );
}

export default App;
