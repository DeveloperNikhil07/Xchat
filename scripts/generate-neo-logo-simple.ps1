Add-Type -AssemblyName System.Drawing

$baseDir = Join-Path $PSScriptRoot '..\assets\images'
if (-not (Test-Path $baseDir)) { New-Item -ItemType Directory -Force -Path $baseDir | Out-Null }

function Create-NeoLogo {
    param(
        [int]$Size,
        [string]$OutPath,
        [bool]$IncludeText
    )

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $rect = New-Object System.Drawing.Rectangle 0,0,$Size,$Size
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(255, 8, 18, 44), [System.Drawing.Color]::FromArgb(255, 15, 74, 148), 135)
    $g.FillRectangle($bgBrush, $rect)
    $bgBrush.Dispose()

    $glowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(80, 34, 211, 238))
    $g.FillEllipse($glowBrush, [int]($Size * 0.05), [int]($Size * 0.08), [int]($Size * 0.68), [int]($Size * 0.68))
    $glowBrush.Dispose()

    try {
        $xFont = New-Object System.Drawing.Font('Segoe UI', [int]($Size * 0.5), [System.Drawing.FontStyle]::Bold)
    } catch {
        $xFont = New-Object System.Drawing.Font('Arial', [int]($Size * 0.5), [System.Drawing.FontStyle]::Bold)
    }

    $xBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 240, 248, 255))
    $xShadowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(160, 0, 0, 0))

    $shadowPoint = New-Object System.Drawing.PointF([float]($Size * 0.14), [float]($Size * 0.1))
    $textPoint = New-Object System.Drawing.PointF([float]($Size * 0.12), [float]($Size * 0.08))
    $g.DrawString('X', $xFont, $xShadowBrush, $shadowPoint)
    $g.DrawString('X', $xFont, $xBrush, $textPoint)

    $xShadowBrush.Dispose()
    $xBrush.Dispose()

    if ($IncludeText) {
        try {
            $titleFont = New-Object System.Drawing.Font('Segoe UI', [int]($Size * 0.09), [System.Drawing.FontStyle]::Bold)
            $subtitleFont = New-Object System.Drawing.Font('Segoe UI', [int]($Size * 0.045), [System.Drawing.FontStyle]::Regular)
        } catch {
            $titleFont = New-Object System.Drawing.Font('Arial', [int]($Size * 0.09), [System.Drawing.FontStyle]::Bold)
            $subtitleFont = New-Object System.Drawing.Font('Arial', [int]($Size * 0.045), [System.Drawing.FontStyle]::Regular)
        }

        $titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 236, 244, 255))
        $subtitleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(210, 148, 163, 184))

        $titlePoint = New-Object System.Drawing.PointF([float]($Size * 0.58), [float]($Size * 0.27))
        $subtitlePoint = New-Object System.Drawing.PointF([float]($Size * 0.58), [float]($Size * 0.42))

        $g.DrawString('NeoChat', $titleFont, $titleBrush, $titlePoint)
        $g.DrawString('by X Corp', $subtitleFont, $subtitleBrush, $subtitlePoint)

        $titleFont.Dispose()
        $subtitleFont.Dispose()
        $titleBrush.Dispose()
        $subtitleBrush.Dispose()
    }

    $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

$basePath = Join-Path $PSScriptRoot '..\assets\images'
Create-NeoLogo -Size 1024 -OutPath (Join-Path $basePath 'neochat-splash.png') -IncludeText $true
Create-NeoLogo -Size 512 -OutPath (Join-Path $basePath 'neochat-app-icon.png') -IncludeText $false
Write-Host 'Created NeoChat logo images:'
Write-Host (Join-Path $basePath 'neochat-splash.png')
Write-Host (Join-Path $basePath 'neochat-app-icon.png')