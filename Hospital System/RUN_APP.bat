@echo off
echo Starting Smart Hospital System...

:: Start Backend in a new window
start "Hospital Backend" cmd /k "cd /d C:\Users\sheet\OneDrive\Desktop\Hospital System\backend && npm start"

:: Start Frontend in a new window
start "Hospital Frontend" cmd /k "cd /d C:\Users\sheet\OneDrive\Desktop\Hospital System\frontend && npm run dev"

echo.
echo ==========================================
echo Servers are starting! 
echo Please wait a few seconds, then go to:
echo http://localhost:5173
echo ==========================================
pause