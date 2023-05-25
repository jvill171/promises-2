from flask import Flask, render_template
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = "Secret_Shhh"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.debug = True
debug=DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

@app.route('/')
def homepage():
    return render_template('home.html')

@app.route('/numbers')
def numFacts():
    return render_template('numbers.html')

@app.route('/cards')
def cards():
    return render_template('cards.html')

@app.route('/pokemon')
def pokemon():
    return render_template('pokemon.html')