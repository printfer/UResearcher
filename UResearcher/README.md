# UResearcher


## User Guide

### On Windows 

First, setup user Elsevier Developers Key: 

Copy `instance/config.py.example` to `instance/config.py`

Edit `config.py`, add your key after `ELS_API_KEY = `

When you use UResearcher at the first time run:

`setup_windows.bat`

to use uresearcher, active venv first:

`uresearcher_app_venv\Scripts\activate.bat`

to run it, type: 

`python3 run.py`


### On Linux

First, setup user Elsevier Developers Key:

`cp instance/config.py.example  instance/config.py`

`vi config.py`

Add your key after `ELS_API_KEY = `

When you use UResearcher at the first time run:

`./setup_linux.sh`

to run it, type: 

`./run.sh`



## Developer Guide


