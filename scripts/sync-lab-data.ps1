# 将 data/*.json 同步到 data/lab-data.js（供直接双击 index.html 时使用）
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

$keys = @("site", "research", "outcomes", "people", "news", "resources", "recruitment")
$parts = @()

foreach ($k in $keys) {
  $path = Join-Path "data" "$k.json"
  if (-not (Test-Path $path)) {
    throw "缺少文件: $path"
  }
  $json = (Get-Content $path -Raw -Encoding UTF8).Trim()
  $parts += "  ${k}: $json"
}

$lines = @("window.LAB_DATA = {") + ($parts -join ",`n") + "};"
$out = Join-Path "data" "lab-data.js"
$lines -join "`n" | Set-Content $out -Encoding UTF8
Write-Host "已生成 $out"
