import React, { useState, useEffect } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const project = {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };

    api.post("/repositories", project).then((response) => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const index = repositories.findIndex((repository) => repository.id === id);
    repositories.splice(index, 1);

    setRepositories([...repositories]);
  }

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
