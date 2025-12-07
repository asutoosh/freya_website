@echo off
REM Quick Reset Script for Testing
REM This script resets all IP sessions and localStorage instructions

echo ========================================
echo  IP Access Control - Quick Reset
echo ========================================
echo.

REM Check if data directory exists
if not exist "data" (
    echo Creating data directory...
    mkdir data
)

REM Reset IP sessions
echo Resetting IP sessions...
echo {} > data\ip-sessions.json
echo [OK] IP sessions cleared

echo.
echo ========================================
echo  Next Steps:
echo ========================================
echo 1. Clear browser localStorage:
echo    - Open browser console (F12)
echo    - Run: localStorage.clear()
echo    - Refresh page
echo.
echo 2. Restart dev server:
echo    - Press Ctrl+C to stop current server
echo    - Run: npm run dev
echo.
echo ========================================
echo  Reset Complete!
echo ========================================
pause
