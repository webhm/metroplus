<?php

namespace App\Action;

use Fusio\Engine\ActionAbstract;
use Fusio\Engine\ContextInterface;
use Fusio\Engine\ParametersInterface;
use Fusio\Engine\RequestInterface;

class LisaSendInfinity extends ActionAbstract
{
    public function handle(RequestInterface $request, ParametersInterface $configuration, ContextInterface $context): mixed
    {

        // Imput

        if (isset($_GET['numeroPedido'])) {

            $codigoPedido = $_GET['numeroPedido'];

            $fileIngresadas = 'lisa/pedidos/retenidos/' . $codigoPedido . '.xml';

            $xml = file_get_contents($fileIngresadas);

            $dataPedido = simplexml_load_string($xml);
            $pedido = $dataPedido->children('soap', true)->Body->children();

            $codigoPedido = $pedido->Mensagem->PedidoExameLab->codigoPedido;
            $fechaPedido = $pedido->Mensagem->PedidoExameLab->atendimento->dataColetaPedido;

            $usuarioSolicitante = $pedido->Mensagem->PedidoExameLab->atendimento->usuarioSolicitante;

            if ($usuarioSolicitante == 'TVELEZ') {
                $xml = str_replace('HMERPSISTPROD2', 'CAJA2', $xml);

            }

            if ($usuarioSolicitante == 'DARANDA') {
                $xml = str_replace('HMERPSISTPROD2', 'CAJA1', $xml);

            }

            $sts = $this->sendInifnity($xml);

            if ($sts) {

                $fileEnviadas = 'lisa/pedidos/enviados/' . $codigoPedido . '.xml';

                file_put_contents($fileEnviadas, $xml, FILE_APPEND);
                chmod($fileEnviadas, 0777);
                @unlink($fileIngresadas);

            } else {

                $fileErroresEnviadas = 'lisa/pedidos/erroresEnviados/' . $codigoPedido . '.xml';

                file_put_contents($fileErroresEnviadas, $xml, FILE_APPEND);
                chmod($fileErroresEnviadas, 0777);

            }

            // Response
            $output = '<?xml version="1.0"?><Mensagem><sucesso><descricao>OPERACAO REALIZADA COM SUCESSO</descricao></sucesso></Mensagem>';

            return $this->response->build(200, ['Content-Type: application/xml'], $output);

        } else {

            // Response
            $output = '<?xml version="1.0"?><Mensagem><sucesso><descricao>NO EXISTE NUMERO DE PEDIDO</descricao></sucesso></Mensagem>';

            return $this->response->build(200, ['Content-Type: application/xml'], $output);

        }

    }

    public function sendInifnity($xml): mixed
    {

        // PROD http://172.16.253.17:8084/mv-api-hl7bus/proxySaidaMLLP

        // SML http://172.16.253.11:8184/mv-api-hl7bus/proxySaidaMLLP

        $webservice_url = "http://172.16.253.17:8084/mv-api-hl7bus/proxySaidaMLLP";

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
