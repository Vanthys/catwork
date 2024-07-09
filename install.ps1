Write-Output "[INFO]: Installation script stated"

Set-Location web
$nodeVersion = node -v 2>&1

if ($nodeVersion -match "command not found" -or $nodeVersion -match "is not recognized") {
    Write-Host "[INFO]: Node.js not installed. Skipping web re-build."
} else {
    Write-Output "[INFO]: Node.js is installed, version: $nodeVersion"
    npm install
    npm run build
}


if (Test-Path -Path C:\xampp\htdocs\assets){
    Remove-Item C:\xampp\htdocs\assets -Recurse
    Write-Host "[INFO]: Removed old web installation"
}
Set-Location ..

Copy-Item -Path .\web\dist\* -Destination C:\xampp\htdocs\ -Recurse
Write-Host "[INFO]: Web installed"

if (Test-Path -Path C:\xampp\htdocs\catwork){
    Remove-Item C:\xampp\htdocs\catwork -Recurse
    Write-Host "[INFO]: Removed old app installation"
}

Copy-Item -Path .\app\catwork -Destination C:\xampp\htdocs\ -Recurse
Write-Host "[INFO]: App installed"



Write-Host "[INFO]: Importing Database"
$mysqlHost = "localhost"
$mysqlUser = "fh_2024_webphp"
$mysqlPassword = "fh_2024_webphp"
$sqlScriptPath = "./app/fh_2024_team_1.sql"

$mysqlCommand = "C:\xampp\mysql\bin\mysql.exe -h $mysqlHost -u $mysqlUser -p$mysqlPassword"
Start-Process "cmd.exe" -ArgumentList "/c $mysqlCommand < $sqlScriptPath" -NoNewWindow -Wait
Write-Host "[INFO]: Imported Database"
Write-Host "\n\n"
Write-Host "[INFO]: Installation finished" -ForegroundColor Green

$headers = @("Username", "Password")

$rows = @(
    @{ Username = "Batman"; Password = "Robin" },
    @{ Username = "admin"; Password = "password" }
)

Write-Host ""
Write-Host ("{0,-20} {1,-20}" -f $headers[0], $headers[1])
Write-Host ("{0,-20} {1,-20}" -f ("-" * 20), ("-" * 20))

foreach ($row in $rows) {
    Write-Host ("{0,-20} " -f $row.Username) -NoNewline
    Write-Host ("{0,-20}" -f $row.Password) -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Use the credentials above to log in, or create your own user using sign up."
Write-Host "Visit: http://localhost/catwork"



