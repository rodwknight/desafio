<?php 

abstract class AbstractController {

    private $method;

    public function __construct(){
        $this->method = $_SERVER['REQUEST_METHOD'];
    }

    public function getMethod(){
        return $this->method;
    }

}