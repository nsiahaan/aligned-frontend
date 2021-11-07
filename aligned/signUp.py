import os
from re import S
from typing import AsyncIterator
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, RadioField, DateField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Email, InputRequired


gender = ["Male", "Female", "Non-binary"]
astroList = ['aries', 'leo', 'sagittrius', 'taurus', 'virgo', 'capricorn', 'gemini', 'libra', 'aquarius', 'cancer', 'scorpio', 'pisces']
mbtiList = ['INFP', 'ENFP', 'INFJ', 'ENFJ', 'INTJ', "ENTJ", "INTP", "ENTP", "ISFP", "ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"]
sPrefList = ['male', 'female', 'both']
genderList = ['male', 'female', 'non-binary']
class signUp(FlaskForm):
    email = StringField(label='Email', validators=[Email(), DataRequired()])
    password = PasswordField(label='Password', validators=[DataRequired()])
    name = StringField(label="name", validators=[ DataRequired()])
    age = IntegerField(label="age", validators=[DataRequired()])
    gender = RadioField(label="Gender", choices=gender, validators=[DataRequired()])
    birthday = DateField(label='Birthday', validators=[DataRequired()])
    mbti= RadioField("MBTI Sign", choices=mbtiList, validators=[DataRequired()])
    sPref= RadioField("Sexual Preference", choices=sPrefList, validators=[DataRequired()])
    phoneNum= StringField("Phone Number", validators=[DataRequired()])
    submit_form = SubmitField('Submit')