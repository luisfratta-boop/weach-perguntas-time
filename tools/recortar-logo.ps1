# Recorta o "w." branco do slide do pitch e gera assets/logo-w.png com fundo transparente.
# Uso: powershell -File tools/recortar-logo.ps1 "<caminho do PNG de origem>"
param([string]$Origem)
if (-not $Origem) {
  $Origem = (Get-ChildItem "$env:USERPROFILE\Downloads" -Filter "*Macro Sales - Mobile.png" | Select-Object -First 1).FullName
}

Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Bitmap]::FromFile($Origem)

# Area do logo no slide 1920x1080 (canto superior direito)
$rect = New-Object System.Drawing.Rectangle 1728, 98, 96, 60
$escala = 4
$w = $rect.Width * $escala; $h = $rect.Height * $escala

$big = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($big)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), $rect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

# Branco vira opaco, azul vira transparente (alpha pela luminosidade do canal vermelho)
$out = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
for ($y = 0; $y -lt $h; $y++) {
  for ($x = 0; $x -lt $w; $x++) {
    $r = $big.GetPixel($x, $y).R
    $a = [Math]::Max(0, [Math]::Min(255, [int](($r - 40) * 255 / 170)))
    $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, 255, 255, 255))
  }
}
$destino = Join-Path $PSScriptRoot "..\assets\logo-w.png"
$out.Save($destino, [System.Drawing.Imaging.ImageFormat]::Png)
$src.Dispose(); $big.Dispose(); $out.Dispose()
Write-Output "Logo salvo em $destino"
