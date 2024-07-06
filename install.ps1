Set-Location web
npm install
npm run build
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

Write-Host "[INFO]: App installed"

Copy-Item -Path .\app\catwork -Destination C:\xampp\htdocs\ -Recurse


