#!/usr/bin/env bash

## apt
apt update
apt upgrade
apt install python3 
apt install python3-venv  

## setup venv
python3 -m venv venv
source venv/bin/activate
python3 -m pip install --upgrade pip
pip install -r requirements.txt
python3 -m nltk.downloader 'punkt'
python3 -m nltk.downloader 'averaged_perceptron_tagger'
