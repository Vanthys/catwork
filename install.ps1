cd web
npm install
npm run build
if (Test-Path -Path C:\xampp\htdocs\assets){
    Remove-Item C:\xampp\htdocs\assets -Recurse
    }
cd ..

Copy-Item -Path .\web\dist\* -Destination C:\xampp\htdocs\ -Recurse

