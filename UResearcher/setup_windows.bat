python -m venv venv
venv\Scripts\activate.bat
python -m pip install --upgrade pip
pip install -r requirements.txt
python -m nltk.downloader 'punkt'
python -m nltk.downloader 'averaged_perceptron_tagger'
