
REM Use XP's for command. For example from the command line (in a batch file use %%x instead) to do a recursive move do:

REM for /r %x in (foo) do ls %x
REM move "%x" "drive:\path\bar"
REM To do a recursive rename do:

REM do ren "%x" *.cpp
REM Example batch:
REM for /r "< DIR >" %%x in (*.c) do ren "%%x" *.cpp

for /r %%i in (*Widget*) do echo %%i "%%i"

