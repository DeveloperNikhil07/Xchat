Add-Type -AssemblyName System.Drawing

$baseDir = Join-Path $PSScriptRoot '..\assets\images'
if (-not (Test-Path $baseDir)) { New-Item -ItemType Directory -Force -Path $baseDir | Out-Null }

function New-LogoImage {
    param(
        [int]$Size,
        [string]$OutPath,
        [bool]$IncludeText
    )

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    # background gradient
    $rect = New-Object System.Drawing.Rectangle 0,0,$Size,$Size
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(255, 5, 18, 46), [System.Drawing.Color]::FromArgb(255, 14, 63, 131), 135)
    $g.FillRectangle($bgBrush, $rect)
    $bgBrush.Dispose()

    # large glow circle
    $glowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(60, 34, 211, 238))
    $glowSize = [int]($Size * 0.75)
    $g.FillEllipse($glowBrush, [int]($Size * 0.1), [int]($Size * 0.12), $glowSize, $glowSize)
    $glowBrush.Dispose()

    # full white X with shadow
    $fontSize = [int]($Size * 0.48)
    try {
        $font = New-Object System.Drawing.Font('Segoe UI', $fontSize, [System.Drawing.FontStyle]::Bold)
    } catch {
        $font = New-Object System.Drawing.Font('Arial', $fontSize, [System.Drawing.FontStyle]::Bold)
    }

    $stringFormat = New-Object System.Drawing.StringFormat
    $stringFormat.Alignment = [System.Drawing.StringAlignment]::Center
    $stringFormat.LineAlignment = [System.Drawing.StringAlignment]::Center

    $xRect = New-Object System.Drawing.RectangleF([int]($Size * 0.08), [int]($Size * 0.05), [int]($Size * 0.42), [int]($Size * 0.9))

    $shadowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(160, 0, 0, 0))
    $shadowRect = $xRect
    $shadowRect.X += $Size * 0.025
    $shadowRect.Y += $Size * 0.025
    $g.DrawString('X', $font, $shadowBrush, $shadowRect, $stringFormat)
    $shadowBrush.Dispose()

    $xBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 245, 250, 255))
    $g.DrawString('X', $font, $xBrush, $xRect, $stringFormat)
    $xBrush.Dispose()

    if ($IncludeText) {
        $titleFontSize = [int]($Size * 0.085)
        $subtitleFontSize = [int]($Size * 0.045)
        try {
            $titleFont = New-Object System.Drawing.Font('Segoe UI', $titleFontSize, [System.Drawing.FontStyle]::Bold)
            $subtitleFont = New-Object System.Drawing.Font('Segoe UI', $subtitleFontSize, [System.Drawing.FontStyle]::Regular)
        } catch {
            $titleFont = New-Object System.Drawing.Font('Arial', $titleFontSize, [System.Drawing.FontStyle]::Bold)
            $subtitleFont = New-Object System.Drawing.Font('Arial', $subtitleFontSize, [System.Drawing.FontStyle]::Regular)
        }

        $titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 234, 244, 255))
        $subtitleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(190, 148, 163, 184))

        $titleX = [int]($Size * 0.60)
        $titleY = [int]($Size * 0.28)
        $subtitleY = [int]($Size * 0.45)
        $g.DrawString('NeoChat', $titleFont, $titleBrush, $titleX, $titleY)
        $g.DrawString('by X Corp', $subtitleFont, $subtitleBrush, $titleX, $subtitleY)

        $titleFont.Dispose()
        $subtitleFont.Dispose()
        $titleBrush.Dispose()
        $subtitleBrush.Dispose()
    }

    $# small chat bubble detail
    $bubbleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
    $triangle = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $bubbleWidth = [int]($Size * 0.12)
    $bubbleHeight = [int]($Size * 0.09)
    $bubbleX = [int]($Size * 0.64)
    $bubbleY = [int]($Size * 0.61)
    $triangle.AddEllipse($bubbleX, $bubbleY, $bubbleWidth, $bubbleHeight)
    $g.FillPath($bubbleBrush, $triangle)
    $bubbleBrush.Dispose()

    $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

$logoDir = (Join-Path $baseDir 'neochat-splash.png')
$iconDir = (Join-Path $baseDir 'neochat-app-icon.png')

New-LogoImage -Size 1024 -OutPath $logoDir -IncludeText $true
New-LogoImage -Size 512 -OutPath $iconDir -IncludeText $false
Write-Host "Created logo: $logoDir"
Write-Host "Created icon: $iconDir"