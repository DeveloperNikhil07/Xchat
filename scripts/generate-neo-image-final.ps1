Add-Type -AssemblyName System.Drawing

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
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(255, 6, 18, 40), [System.Drawing.Color]::FromArgb(255, 12, 62, 120), 135)
    $g.FillRectangle($bgBrush, $rect)
    $bgBrush.Dispose()

    $glowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(80, 34, 211, 238))
    $g.FillEllipse($glowBrush, [int]($Size * 0.06), [int]($Size * 0.08), [int]($Size * 0.75), [int]($Size * 0.75))
    $glowBrush.Dispose()

    try {
        $font = New-Object System.Drawing.Font('Segoe UI', [int]($Size * 0.49), [System.Drawing.FontStyle]::Bold)
    } catch {
        $font = New-Object System.Drawing.Font('Arial', [int]($Size * 0.49), [System.Drawing.FontStyle]::Bold)
    }

    $stringFormat = New-Object System.Drawing.StringFormat
    $stringFormat.Alignment = [System.Drawing.StringAlignment]::Center
    $stringFormat.LineAlignment = [System.Drawing.StringAlignment]::Center

    $xRect = New-Object System.Drawing.RectangleF([int]($Size * 0.08), [int]($Size * 0.08), [int]($Size * 0.45), [int]($Size * 0.84))

    $shadowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(180, 0, 0, 0))
    $shadowRect = New-Object System.Drawing.RectangleF($xRect.X + [int]($Size * 0.02), $xRect.Y + [int]($Size * 0.02), $xRect.Width, $xRect.Height)
    $g.DrawString('X', $font, $shadowBrush, $shadowRect, $stringFormat)
    $shadowBrush.Dispose()

    $xBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
    $g.DrawString('X', $font, $xBrush, $xRect, $stringFormat)
    $xBrush.Dispose()

    if ($IncludeText) {
        try {
            $titleFont = New-Object System.Drawing.Font('Segoe UI', [int]($Size * 0.095), [System.Drawing.FontStyle]::Bold)
            $subtitleFont = New-Object System.Drawing.Font('Segoe UI', [int]($Size * 0.048), [System.Drawing.FontStyle]::Regular)
        } catch {
            $titleFont = New-Object System.Drawing.Font('Arial', [int]($Size * 0.095), [System.Drawing.FontStyle]::Bold)
            $subtitleFont = New-Object System.Drawing.Font('Arial', [int]($Size * 0.048), [System.Drawing.FontStyle]::Regular)
        }

        $titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 235, 244, 255))
        $subtitleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(200, 148, 163, 184))

        $g.DrawString('NeoChat', $titleFont, $titleBrush, [int]($Size * 0.58), [int]($Size * 0.33))
        $g.DrawString('by X Corp', $subtitleFont, $subtitleBrush, [int]($Size * 0.58), [int]($Size * 0.45))

        $titleFont.Dispose()
        $subtitleFont.Dispose()
        $titleBrush.Dispose()
        $subtitleBrush.Dispose()
    }

    $bubbleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
    $g.FillEllipse($bubbleBrush, [int]($Size * 0.62), [int]($Size * 0.62), [int]($Size * 0.13), [int]($Size * 0.09))
    $bubblePoints = [System.Drawing.Point[]]@(
        [System.Drawing.Point]::new([int]($Size * 0.69), [int]($Size * 0.69)),
        [System.Drawing.Point]::new([int]($Size * 0.68), [int]($Size * 0.76)),
        [System.Drawing.Point]::new([int]($Size * 0.74), [int]($Size * 0.69))
    )
    $g.FillPolygon($bubbleBrush, $bubblePoints)
    $bubbleBrush.Dispose()

    $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

$basePath = Join-Path $PSScriptRoot '..\assets\images'
if (-not (Test-Path $basePath)) { New-Item -ItemType Directory -Force -Path $basePath | Out-Null }
Create-NeoLogo -Size 1024 -OutPath (Join-Path $basePath 'neochat-splash.png') -IncludeText $true
Create-NeoLogo -Size 512 -OutPath (Join-Path $basePath 'neochat-app-icon.png') -IncludeText $false
Write-Host 'Created final NeoChat logo assets:'
Write-Host (Join-Path $basePath 'neochat-splash.png')
Write-Host (Join-Path $basePath 'neochat-app-icon.png')