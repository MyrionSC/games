call tsc
call xcopy libs dist  /D /E /C /Q /H /R /Y /K
call xcopy src\index.html dist  /D /E /C /Q /H /R /Y /K
