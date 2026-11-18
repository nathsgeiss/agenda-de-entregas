$nodePasta = Join-Path $PSScriptRoot '.tools/node-v26.13.1-win-x64'
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    if (-not (Test-Path (Join-Path $nodePasta 'node.exe'))) {
        throw 'Instale o Node.js LTS ou restaure a versão local em .tools.'
    }
    $env:Path = "$nodePasta;$env:Path"
}
Push-Location $PSScriptRoot
try { & npm.cmd run dev -- --host 127.0.0.1 @args }
finally { Pop-Location }
