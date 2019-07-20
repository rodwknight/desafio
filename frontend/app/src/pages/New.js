import React, { Component } from 'react';
import api from '../services/api';
import './New.css';

class New extends Component {

    state = {
        nome: '',
        tipo: '',
        peso: ''
    }
    handleSubmit = async e => {

        e.preventDefault();
        const data = new FormData();

        data.append('nome', this.state.nome);
        data.append('tipo', this.state.tipo);
        data.append('peso', this.state.peso);

        await api.post('VinhoController?action=storeVinho', data);

        this.props.history.push('/');

    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {

        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    name="nome"
                    placeholder="Nome do Vinho"
                    onChange={this.handleChange}
                    value={this.state.nome}
                />
                <input 
                    type="text"
                    name="tipo"
                    placeholder="Tipo do Vinho"
                    onChange={this.handleChange}
                    value={this.state.tipo}
                />
                <input 
                    type="text"
                    name="peso"
                    placeholder="Peso do Vinho"
                    onChange={this.handleChange}
                    value={this.state.peso}
                />
                <button type="submit">Enviar</button>
            </form>
        );
    }
}
export default New;