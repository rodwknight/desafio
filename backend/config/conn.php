<?php
abstract class conn{

    /*Evita que a classe seja clonada*/
    private function __clone(){}
     
    /*Método que destroi a conexão com banco de dados e remove da memória todas as variáveis setadas*/
    public function __destruct() {
        $this->disconnect();
        foreach ($this as $key => $value) {
            unset($this->$key);
        }
    }
          
    public function connect(){
        try
        {
            $this->conexao = new PDO("mysql:host=localhost;port=3306;dbname=desafio", "root", "");
        }
        catch (PDOException $i)
        {
            //se houver exceção, exibe
            die("Erro: <code>" . $i->getMessage() . "</code>");
        }
         
        return ($this->conexao);
    }
     
    public function disconnect(){
        $this->conexao = null;
    }
}