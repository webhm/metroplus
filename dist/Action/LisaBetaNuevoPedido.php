<?php

namespace App\Action;

use Fusio\Engine\ActionAbstract;
use Fusio\Engine\ContextInterface;
use Fusio\Engine\ParametersInterface;
use Fusio\Engine\RequestInterface;

class LisaBetaNuevoPedido extends ActionAbstract
{
    public function handle(RequestInterface $request, ParametersInterface $configuration, ContextInterface $context): mixed
    {

        // Imput
        $xml = file_get_contents('php://input');

        // Extract XML Dcoument
        $dataPedido = simplexml_load_string($xml);

        $pedido = $dataPedido->children('soap', true)->Body->children();

        $codigoPedido = $pedido->Mensagem->PedidoExameLab->codigoPedido;

        $fileIngresadas = 'lisa/pedidos/ingresados/' . $codigoPedido . '.xml';
        file_put_contents($fileIngresadas, $xml, FILE_APPEND);
        chmod($fileIngresadas, 0777);

        $output = '<?xml version="1.0"?><Mensagem><sucesso><descricao>OPERACAO REALIZADA COM SUCESSO</descricao></sucesso></Mensagem>';

        // ssh -i C:\Users\mchang\Desktop\apikeys\api.lis\ApiLis2_key.pem azureuser@20.97.208.97

        return $this->response->build(200, ['Content-Type: application/xml'], $output);

    }

    public function sendInifnity($xml): mixed
    {

        $webservice_url = "http://172.16.253.11:8184/mv-api-hl7bus/proxySaidaMLLP";

        $headers = array(
            'Content-Type: text/xml; charset=utf-8',
            'Content-Length: ' . strlen($xml),
        );

        $ch = curl_init($webservice_url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $data = curl_exec($ch);

        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($http_code == 200) {
            return true;
        } else {
            return false;
        }

        curl_close($ch);

    }
}
