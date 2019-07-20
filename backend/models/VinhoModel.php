<?php
    include_once('../config/conn.php');
    class VinhoModel extends conn {

        public function getListVinho(){

            $query= $this->connect()->prepare('SELECT * FROM vinho');
            $query->execute(null);
             
            if(isset($class)){
                $rs = $query->fetchAll(PDO::FETCH_CLASS,null) or die(print_r($query->errorInfo(), true));
            }else{
                $rs = $query->fetchAll(PDO::FETCH_OBJ) or die(print_r($query->errorInfo(), true));
            }
            $this->disconnect();
            return $rs;
        }

        public function storeVinho($nome, $tipo, $peso){

            $conexao = $this->connect();
            $sql = "INSERT INTO vinho (nome, tipo, peso) VALUES (?,?,?)";            
            $query = $conexao->prepare($sql);            
            $query->execute([$nome, $tipo, $peso]);
            $rs = $conexao->lastInsertId() or die(print_r($query->errorInfo(), true));
            $this->disconnect();
            return $rs;

        }
    }