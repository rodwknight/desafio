import React, { Component } from 'react';
import api from '../services/api';

import './Feed.css';

/*import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';*/

class Feed extends Component {
    state = {
        feed : [],
        car : [],
        quantidade : '',
        showModal : 'hide',
        _distancia : '',
        total_peso : 0,
        valor_total : 0,
        aux_valor : 0
    };

    

    async componentDidMount(){
        const response = await api.get('VinhoController?action=getListVinho');
        this.setState({ feed: response.data[0]['id'] ? response.data: [] });
    }

    handleSubmit = async function(quantidade, id, e) {
        e.preventDefault();
        this.setState({ car: [...this.state.car, {
            id   : id,
            nome : this.state.feed[id-1].nome,
            tipo : this.state.feed[id-1].tipo,
            peso : this.state.feed[id-1].peso,
            quantidade : quantidade ? quantidade : 1,
        }]})
    }

    handleChange = e => {
        this.setState({ quantidade: e.target.value });
    }
    handleChangeModal = e => {
        this.setState({ _distancia: parseInt(e.target.value)?parseInt(e.target.value):0 });
        this.setState({valor_total : this.state.aux_valor});
        if(e.target.value > 100){
            this.setState({valor_total : (this.state.valor_total*e.target.value)/100 });
            this.state.valor_total = (this.state.valor_total*e.target.value)/100;
        }
    }

    handleShow = e => {
        this.setState({ showModal: e });
        this.setState({total_peso : 0});
        this.setState({valor_total : 0});
        this.state.total_peso = 0;
        this.state.valor_total = 0;
        this.state.car.forEach(item => {
            this.aux = 0;
            this.aux = parseInt(item.peso*item.quantidade);
            this.state.total_peso += this.aux;
            this.setState({ total_peso: this.state.total_peso });
        });
        this.setState({valor_total : (parseInt((this.state.total_peso/1000).toString().charAt(0))*5)});
        this.state.valor_total = (parseInt((this.state.total_peso/1000).toString().charAt(0))*5);
        this.setState({aux_valor : this.state.valor_total});
    }
    onSubmitModal = async e => {
        e.preventDefault();
        const data = new FormData();

        data.append('total', this.state.valor_total);
        data.append('distancia', this.state._distancia);
        data.append('vinhos', JSON.stringify(this.state.car));

        await api.post('VendaController?action=storeVenda', data);

        this.handleShow('hide');
    }
    render() {
        return (
            <section id='post-list'>
                <div className={this.state.showModal + ' bg-modal'}>
                    <div className="modal-content">
                        <div className="modal-body">
                            <table className="table-venda">
                                <thead>
                                    <tr className="row-table">
                                        <th>NOME</th>
                                        <th>TIPO</th>
                                        <th>PESO</th>
                                        <th>QUANTIDADE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.car.map((item, i) => (
                                    <tr key={i} className="row-table">
                                        <td>{item.nome}</td>
                                        <td>{item.tipo}</td>
                                        <td>{item.peso}</td>
                                        <td>{item.quantidade}</td>
                                    </tr>                                    
                                ))}
                                </tbody>    
                            </table>
                        </div>
                        <div className="modal-footer">
                            <form name="form-finaliza" onSubmit={this.onSubmitModal}>
                                <input 
                                    type="text"
                                    name="_distancia"
                                    placeholder="Distancia"
                                    value={this.state._distancia}
                                    onChange={this.handleChangeModal}
                                /> Km
                                <div>Peso Total: {this.state.total_peso}g</div>
                                <div>Valor Total: R${this.state.valor_total}</div>
                                <div className="actions">
                                    <button type="submit" className="finaliza-compra" >Fechar Pedido</button>
                                    <button onClick={(e) => this.handleShow('hide')} >Sair</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <a href="http://localhost:3000/new" className="btn-novo" >Novo Vinho</a>
                <button onClick={(e) => this.handleShow('show')} className="btn-venda" >Registrar Venda</button>
                {this.state.feed.map(post => (
                    <article key={post.id}>
                        <header>
                            <div className="user-info" >
                                <h3>{post.nome}</h3>
                                <span className="tipo">Tipo do Vinho: {post.tipo}</span>
                            </div>
                        </header>
                        <footer>
                            <form name={'form-quant-'+post.id} onSubmit={(e) => this.handleSubmit(this.state.quantidade, post.id, e)}>
                                <input 
                                    type="text"
                                    name="Quantidade"
                                    placeholder="Quantidade"
                                    onChange={this.handleChange}
                                    defaultValue="1"
                                />
                                <div className="actions">
                                    <button type="submit" className="add-carrinho" >Add Carrinho</button>
                                </div>
                            </form>
                            <strong>Peso: {post.peso}g </strong>
                        </footer>
                    </article>               
                ))}             
            </section>
        );
    }
}

export default Feed;