import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {
    Checkbox,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Paper,
    Grid,
    OutlinedInput,
    InputAdornment
} from '@mui/material';
import DatePicker from '../components/BasicDatePicker'
import moment from 'moment';
import 'moment/locale/pt-br'
import CurrencyInput from '../components/CurrencyInput';
import '../App.css'
import dayjs from 'dayjs';
import DateFormat from '../components/DateFormat';
import { NumericFormat } from 'react-number-format';
moment.locale('pt-br')
dayjs.locale('pt-br')


class Form extends Component {
    key = window.location.pathname.replace('/cadastro/', '')
    editarItem = JSON.parse(localStorage.getItem(this.key))

    constructor(props) {
        super(props);

        //referencias para pegar dados dos inputs
        this.nome = React.createRef();
        this.unidade = React.createRef();
        this.quantidade = React.createRef();
        this.preco = React.createRef();
        this.perecivel = React.createRef();
        this.validade = React.createRef();
        this.fabricacao = React.createRef();

        this.alphaRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/; //regex para o input de nome

        this.state = {
            checked: this.editarItem ? this.editarItem.perecivel : false,
            unidade: this.editarItem ? this.editarItem.unidade : 'litro',
        }; //usado para verificar o estado do perecivel e da selecao de unidade

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.setState({
            checked: !this.state.checked
        })
    }

    handleQuantidade = e => {
        this.setState({
            unidade: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const item = {
            nome: this.nome.current.value,
            unidade: this.unidade.current.value,
            quantidade: this.quantidade.current.value,
            preco: this.preco.current.inputElement.value.replace('R$', ''),
            perecivel: this.perecivel.current.checked,
            validade: this.validade.current ? this.validade.current.value : '',
            fabricacao: this.fabricacao.current.value,
        }

        //check de nome
        if (item.nome === '') {
            alert(`Favor inserir nome do produto.`)
            return;
        } else if (item.nome.length > 50) {
            alert(`Limite de caracteres para o nome do produto atingido. (50)`)
            return;
        }

        //check de preço
        if (item.preco === '' || item.preco === '0' || item.preco === '0,' || item.preco === '0,0' || item.preco === '0,00') {
            alert(`Favor inserir preço.`)
            return;
        }

        //check de validade e data de fabricação
        if (isNaN(Date.parse(new Date(DateFormat(item.validade)))) && this.state.checked) {
            alert(`Favor inserir data de validade válida.`)
            return;
        }
        if (item.validade !== '') {
            item.vencido = DateFormat(moment().format('L')) >= DateFormat(item.validade) ? true : false
            let validade = DateFormat(item.validade)
            let fabricacao = DateFormat(item.fabricacao)
            if (fabricacao > validade) {
                alert(`Data de fabricação (${item.fabricacao}) maior que Data de validade (${item.validade}). Favor alterar para uma data válida.`)
                return;
            }
        }

        if (isNaN(Date.parse(new Date(DateFormat(item.fabricacao))))) {
            alert(`Favor inserir data de fabricação válida.`)
            return;
        }

        //add/edit produto
        try {
            localStorage.setItem(`${this.nome.current.value}`, JSON.stringify(item))
            if (window.location.pathname.replace('/cadastro/', '') !== '/cadastro') {
                alert(`Item ${this.nome.current.value} foi modificado!`);
            } else {
                alert(`Item ${this.nome.current.value} foi adicionado!`);
            }
            window.location.reload(false);
        } catch (error) {
            alert(`Erro ao adicionar item!`);
        }
    }

    render() {
        return (
            <form>
                <Paper style={{ padding: 16 }}>
                    <Grid container alignItems="flex-start" spacing={8}>

                        <Grid item xs={12} sx={{ marginTop: "16px" }}>
                            <InputLabel>Nome do produto</InputLabel>
                            <OutlinedInput onKeyDown={(e) => {
                                if (!this.alphaRegex.test(e.key)) {
                                    e.preventDefault();
                                }
                            }} defaultValue={this.editarItem ? this.editarItem.nome : ''} fullWidth inputRef={this.nome} />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel>Unidade de medida</InputLabel>
                            <Select
                                fullWidth
                                name="unidade"
                                label="Unidade de medida"
                                inputRef={this.unidade}
                                defaultValue={this.editarItem ? this.editarItem.unidade : 'litro'}
                                onChange={(e) => this.handleQuantidade(e)}
                            >
                                <MenuItem value="quilograma">Quilograma</MenuItem>
                                <MenuItem value="litro">Litro</MenuItem>
                                <MenuItem value="unidade">Unidade</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel>Quantidade</InputLabel>
                            <NumericFormat allowNegative={false} decimalSeparator={","} thousandSeparator={"."} decimalScale={this.state.unidade === 'litro' || this.state.unidade === 'quilograma' ? 3 : 0} fixedDecimalScale={true}
                                customInput={OutlinedInput} defaultValue={this.editarItem ? this.editarItem.quantidade : 0} fullWidth inputRef={this.quantidade}
                                endAdornment={
                                    <InputAdornment position="end">{
                                        this.state.unidade === 'litro' ? 'lt' : this.state.unidade === 'quilograma' ? 'kg' : 'un'}
                                    </InputAdornment>} />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel>Preço</InputLabel>
                            <div className='precoInputDiv'>
                                <CurrencyInput defaultValue={this.editarItem ? this.editarItem.preco : 0} className="precoInput" innerRef={this.preco} />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel>Perecível</InputLabel>
                            <Checkbox defaultChecked={this.editarItem ? this.editarItem.perecivel : false} onChange={this.handleChange} fullWidth inputRef={this.perecivel} />
                        </Grid>

                        {this.state.checked &&
                            <Grid item xs={12}>
                                <InputLabel>Data de de validade</InputLabel>
                                <DatePicker abel={''} inputRef={this.validade} disableFuture={false} usarDataAtual={this.editarItem ? false : true} dataInserida={this.editarItem ? this.editarItem.validade : false} />
                            </Grid>}

                        <Grid item xs={12}>
                            <InputLabel>Data de fabricação</InputLabel>
                            <DatePicker label={''} inputRef={this.fabricacao} disableFuture={true} usarDataAtual={this.editarItem ? false : true} dataInserida={this.editarItem ? this.editarItem.fabricacao : false} />
                        </Grid>

                        <Grid item style={{ marginTop: 16 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={this.handleSubmit}
                            >
                                Salvar
                            </Button>
                        </Grid>

                        <Grid item style={{ marginTop: 16 }}>
                            <Button
                                variant="contained"
                                color="error"
                                component={Link} to="/"
                            >
                                Cancelar
                            </Button>
                        </Grid>

                    </Grid>
                </Paper>
            </form>
        );

    }
}

export default Form