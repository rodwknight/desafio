<?php 
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include_once('AbstractController.php');
include_once('../models/VinhoModel.php');

class VinhoController extends AbstractController {

    public function getListVinho(){
    
        $model = new VinhoModel();

        $result = $model->getListVinho();

        print_r(json_encode($result));
    }

    public function storeVinho(){
        $model = new VinhoModel();

        $post = $_POST;

        $model->storeVinho($post['nome'], $post['tipo'], $post['peso']);
    }
}

$func = new VinhoController();
switch ($_GET['action']) {
    case 'getListVinho':
        $func->getListVinho();

    break;
    case 'storeVinho':
        $func->storeVinho($_POST);
    break;
}


/*

switch ($_SERVER['REQUEST_METHOD']) {

    case "GET":

        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
    
        $model = new VinhoModel();

        $result = $model->getListVinho();

        print_r(json_encode($result));

    break;

    case "POST":    

        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');

        //$post = file_get_contents('php://input');

        $post = $_POST; // vem como objeto

        print_r(json_encode($obj));
        
    break;

    exit;
}*/