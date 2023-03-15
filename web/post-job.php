<?php
  require '../vendor/autoload.php';
  $client = new GuzzleHttp\Client();
  $jobid = filter_var($_POST['id'], FILTER_VALIDATE_INT);
  header('Content-Type: application/json');
  $form_data = [];

foreach ($_POST as $key => $value) {
    $form_data[$key] = $value;
}

try {
    $response = $client->request('POST', 'https://boards-api.greenhouse.io/v1/boards/verainstituteofjustice/jobs/'.$jobid, [
        'headers' => [
            'Content-Type' => 'application/json',
        ],
        'auth' => ['969bfbf42a90587a1e7ad06d80003db4-5', ''],
        'json' => $form_data
    ]);
    $body = $response->getBody();
    echo $body;
} catch (GuzzleHttp\Exception\ClientException $e) {
    $response = $e->getResponse();
    $responseBodyAsString = $response->getBody()->getContents();
    echo $responseBodyAsString;
}
?>