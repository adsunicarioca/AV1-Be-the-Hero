import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  const ongId = localStorage.getItem("ongId");
  async function handleNewIncidet(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value
    };
    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongId
        }
      });
      history.push("/profile");
    } catch (error) {
      alert("Erro ao cadastrar caso, tente novamente.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="be the hero"></img>

          <h1>Cadastrar no caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={handleNewIncidet}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          ></input>
          <textarea
            placeholder="Descrição do caso"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          ></input>

          <button className="button" type="submit">
            cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
