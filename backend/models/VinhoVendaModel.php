<?php
    include_once('../config/conn.php');
    class VinhoVendaModel extends conn {

        public function storeVinhoVenda($id_venda, $vinho){

            $conexao = $this->connect();
            $sql = "INSERT INTO vinho_venda (vinho_id, venda_id, quantidade) VALUES (?,?,?)";            
            $query = $conexao->prepare($sql);            
            $query->execute([$vinho['id'], $id_venda, $vinho['quantidade']]);
            $rs = $conexao->lastInsertId() or die(print_r($query->errorInfo(), true));
            $this->disconnect();
            return $rs;

        }
    }