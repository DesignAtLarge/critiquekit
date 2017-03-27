# Feedback Analysis
## To Install
You'll need to install some Python libraries:
- Open up Terminal.
- First `cd` into the project directory.
- `pip install --user eventlet`
- `pip install --user Flask`
- `python server`

## To Run
In Terminal, type:
`python server`

## File Breakdown
- The `data` folder contains Winter 2016 A3-A7 feedback data as csv's
- `readData.py` will read A3-A6 (b/c A7 isn't coded) into dictionaries
- `examine.py` does unique word counting and prints out the ten most and ten least frequent words
