<?php
    include_once('../config/conn.php');
    class VendaModel extends conn {


        public function storeVenda($total, $distancia){

            $conexao = $this->connect();
            $sql = "INSERT INTO venda (total, distancia) VALUES (?,?)";            
            $query = $conexao->prepare($sql);            
            $query->execute([$total, $distancia]);
            $rs = $conexao->lastInsertId() or die(print_r($query->errorInfo(), true));
            $this->disconnect();

            return $rs;

        }
    }