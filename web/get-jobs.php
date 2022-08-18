<?php
 require '../vendor/autoload.php';
 $client = new GuzzleHttp\Client();
 $res = $client->request('GET', 'https://boards-api.greenhouse.io/v1/boards/verainstituteofjustice/jobs', [
    'auth' => ['0c0c13ae647efe172323492bce235dd3-5', ''],
    'query' => ['content' => 'true']
]);

echo $res->getBody();
?>