import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@mui/material';
import '../App.css'

function removerItem(item) {
  var resultado = window.confirm(`Deseja mesmo excluir o produto: ${item.nome}`);
  var nomeItemExcluido = item.nome
  if (resultado) {
    localStorage.removeItem(item.nome);
    window.location.reload(false);
    alert(`Item ${nomeItemExcluido} foi excluido com sucesso!`);
  }
}

function allStorage() {

  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    let item = localStorage.getItem(keys[i])
    values.push(JSON.parse(item));
  }

  return values;
}

const itens = allStorage();

function Listagem() {
  return (
    <div className='Listagem'>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h1>Listagem de itens</h1>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5} sx={{ paddingRight: "14px", }}>
            <Button sx={{
              width: "fit-content",
              marginTop: "10px",
              marginLeft: "auto",
              alignContent: "center",
              alignItems: "center",
              display: "flex",
              justifyContent: "right",
            }} variant="outlined" color="primary" component={Link} to={`/cadastro`} startIcon={<AddIcon />}>Adicionar item</Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Unidade de medida</TableCell>
                <TableCell align="right">Quantidade</TableCell>
                <TableCell align="right">Preço</TableCell>
                <TableCell align="right">Perecível</TableCell>
                <TableCell align="right">Data de validade</TableCell>
                <TableCell align="right">Data de fabricação</TableCell>
                <TableCell align="right">Vencido</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itens.map((item) => (
                <TableRow
                  key={item.nome}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row"> {item.nome}</TableCell>
                  <TableCell align="right">{item.unidade}</TableCell>
                  <TableCell align="right">{item.quantidade} {item.unidade === 'litro' ? "Lt" : item.unidade === "quilograma" ? "Kg" : "Un"}</TableCell>
                  <TableCell align="right">R$ {item.preco}</TableCell>
                  <TableCell align="right">{item.perecivel ? "Sim" : "Não"}</TableCell>
                  <TableCell align="right">{item.validade ? item.validade : "-"}</TableCell>
                  <TableCell align="right">{item.fabricacao}</TableCell>
                  <TableCell align="right">{item.vencido ? "Sim" : "Não"}</TableCell>
                  <TableCell align="right"><Button variant="contained" component={Link} to={`/cadastro/${item.nome}`} startIcon={<EditIcon />}>Editar</Button></TableCell>
                  <TableCell align="right"><Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => removerItem(item)}>Excluir</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div >
  );
}

export default Listagem;
