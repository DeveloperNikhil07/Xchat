Add-Type -AssemblyName System.Drawing

function New-GradientBitmap {
    param(
        [int]$Width,
        [int]$Height
    )

    $bmp = New-Object System.Drawing.Bitmap $Width, $Height
    for ($y = 0; $y -lt $Height; $y++) {
        for ($x = 0; $x -lt $Width; $x++) {
            $r = [int](7 + ($x / $Width) * 20)
            $g = [int](18 + ($y / $Height) * 80)
            $b = [int](34 + ($x / $Width) * 80)
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g, $b))
        }
    }
    return $bmp
}

function Draw-Text {
    param(
        [System.Drawing.Graphics]$Graphics,
        [string]$Text,
        [System.Drawing.Font]$Font,
        [System.Drawing.Color]$Color,
        [int]$X,
        [int]$Y
    )
    $brush = New-Object System.Drawing.SolidBrush $Color
    $Graphics.DrawString($Text, $Font, $brush, $X, $Y)
    $brush.Dispose()
}

function Create-Logo {
    param(
        [int]$Size,
        [string]$OutPath,
        [bool]$IncludeText
    )

    $bmp = New-GradientBitmap -Width $Size -Height $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    # soft glow circle under the X
    $glowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(35, 34, 211, 238))
    $g.FillEllipse($glowBrush, [int]($Size * 0.1), [int]($Size * 0.1), [int]($Size * 0.8), [int]($Size * 0.8))
    $glowBrush.Dispose()

    # large X using text
    try {
        $font = New-Object System.Drawing.Font('Segoe UI', [int]($Size * 0.55), [System.Drawing.FontStyle]::Bold)
    } catch {
        $font = New-Object System.Drawing.Font('Arial', [int]($Size * 0.55), [System.Drawing.FontStyle]::Bold)
    }

    $shadowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(160, 0, 0, 0))
    $g.DrawString('X', $font, $shadowBrush, [int]($Size * 0.12 + 12), [int]($Size * 0.08 + 12))
    $shadowBrush.Dispose()

    $xBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
    $g.DrawString('X', $font, $xBrush, [int]($Size * 0.12), [int]($Size * 0.08))
    $xBrush.Dispose()

    if ($IncludeText) {
        try {
            $textFont = New-Object System.Drawing.Font('Segoe UI', [int]($Size * 0.08), [System.Drawing.FontStyle]::Bold)
        } catch {
            $textFont = New-Object System.Drawing.Font('Arial', [int]($Size * 0.08), [System.Drawing.FontStyle]::Bold)
        }

        Draw-Text -Graphics $g -Text 'NeoChat' -Font $textFont -Color [System.Drawing.Color]::FromArgb(255, 222, 234, 255) -X [int]($Size * 0.45) -Y [int]($Size * 0.58)
        Draw-Text -Graphics $g -Text 'by X Corp' -Font $textFont -Color [System.Drawing.Color]::FromArgb(180, 148, 163, 184) -X [int]($Size * 0.45) -Y [int]($Size * 0.70)
        $textFont.Dispose()
    }

    $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

$baseDir = Join-Path $PSScriptRoot '..\assets\images'
if (-not (Test-Path $baseDir)) { New-Item -ItemType Directory -Force -Path $baseDir | Out-Null }

Create-Logo -Size 1024 -OutPath (Join-Path $baseDir 'neochat-splash.png') -IncludeText $true
Create-Logo -Size 512 -OutPath (Join-Path $baseDir 'neochat-icon.png') -IncludeText $false
Create-Logo -Size 1024 -OutPath (Join-Path $baseDir 'neochat-splash-icon.png') -IncludeText $true
Create-Logo -Size 1024 -OutPath (Join-Path $baseDir 'neochat-app-icon.png') -IncludeText $false

Write-Host 'Created NeoChat logo files:'
Write-Host "  $baseDir\neochat-splash.png"
Write-Host "  $baseDir\neochat-icon.png"
Write-Host "  $baseDir\neochat-splash-icon.png"
Write-Host "  $baseDir\neochat-app-icon.png"