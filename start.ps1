Start-Process -FilePath "node.exe" -ArgumentList "server.js" -WindowStyle Hidden
$uri = "http://localhost:2391"
Start-Process $uri
