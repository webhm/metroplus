<?php

namespace App\Action;

use Fusio\Engine\ActionAbstract;
use Fusio\Engine\ContextInterface;
use Fusio\Engine\ParametersInterface;
use Fusio\Engine\RequestInterface;

class HelloWorld extends ActionAbstract
{
    public function handle(RequestInterface $request, ParametersInterface $configuration, ContextInterface $context): mixed
    {

        // Imput
        $xml = file_get_contents('php://input');

        // Extract XML Dcoument
        $dataPedido = simplexml_load_string($xml);
        $pedido = $dataPedido->children('soap', true)->Body->children();

        $codigoPedido = $pedido->Mensagem->PedidoExameLab->codigoPedido;
        $file = 'lisa/pedidos/ingresados/' . $codigoPedido . '.xml';
        file_put_contents($file, $xml, FILE_APPEND);
        chmod($file, 0777);

        // ssh -i C:\Users\mchang\Desktop\apikeys\api.lis\ApiLis2_key.pem azureuser@20.97.208.97

        // Response
        $output = '<?xml version="1.0"?><Mensagem><sucesso><descricao>OPERACAO REALIZADA COM SUCESSO</descricao></sucesso></Mensagem>';

        return $this->response->build(200, ['Content-Type: application/xml'], $output);

    }
}
