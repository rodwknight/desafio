<?php 
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include_once('AbstractController.php');
include_once('../models/VendaModel.php');
include_once('../models/VinhoVendaModel.php');

class VendaController extends AbstractController {

    public function storeVenda(){
        $model = new VendaModel();
        $post = $_POST;
        $id_venda = $model->storeVenda($post['total'], $post['distancia']);

        $obj = json_decode($post['vinhos'], true);

        $model_vinhoVenda = new VinhoVendaModel();

        foreach($obj as  $key => $value){
            $model_vinhoVenda->storeVinhoVenda($id_venda, $value);
        }
    }
}

$func = new VendaController();
switch ($_GET['action']) {
    case 'storeVenda':
        $func->storeVenda($_POST);
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