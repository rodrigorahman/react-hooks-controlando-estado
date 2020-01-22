import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import contatoBanco from './model/contato';

function App() {

  const [contatos, setContatos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [contatoSelecionado, setContatoSelecionado] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    console.log('Executando use Effect');
    setShowLoading(true);
    setTimeout(() => {
      setContatos(contatoBanco)
      setShowLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (contatoSelecionado) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [contatoSelecionado]);

  const excluirContato = () => {
    setShowLoading(true);
    setShowModal(false);
    setTimeout(() => {
      const contatoNew = contatos.filter(c => c.id !== contatoSelecionado.id);
      setContatos(contatoNew);
      setContatoSelecionado(null);
      setShowLoading(false);
    }, 1000);
  };


  return (
    <div className={ 'p-4' }>
      { showLoading && (<div> Loading </div>) }

      <Table>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th></th>
        </tr>
        { contatos.map(c => (
          <tr>
            <td>{ c.id }</td>
            <td>{ c.nome }</td>
            <td><a href={ 'javascript:' } onClick={ () => setContatoSelecionado(c) }>Delete</a></td>
          </tr>
        )) }
      </Table>
      <Modal isOpen={ showModal } toggle={ () => {
      } }>
        <ModalHeader toggle={ () => setContatoSelecionado(null) }>Confirma Exclusão</ModalHeader>
        <ModalBody>
          Confirma Exclusão de { contatoSelecionado && contatoSelecionado.nome }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ excluirContato }>Confirma Exclusão</Button>{ ' ' }
          <Button color="secondary" onClick={ () => setContatoSelecionado(null) }>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
