import io
import re
import pandas as pd
import tensorflow
from sklearn.model_selection import train_test_split
from absl import logging
import uvicorn
from tensorflow.keras.models import load_model
from fastapi import FastAPI, File, UploadFile
import easyocr
import pytesseract
from PIL import Image


logging.set_verbosity(logging.ERROR)  # ignore notification
app = FastAPI()

@app.post("/ocr")
async def perform_ocr(file: UploadFile = File(...)):
    # OCR
    deteksi = easyocr.Reader(['id'], gpu=False)
    foto = await file.read()  # Read the file content as bytes
    text_ = deteksi.readtext(foto)
    values = [result[1] for result in text_]

    # Load the model
    model = load_model('model.h5')

     # Loading data
    df = pd.read_csv('indonesian_names6.csv',delimiter=";")

    texts = df['Name']
    labels = df['Type']

    NUM_WORDS = 10000
    MAX_TEXT_LEN = 100

    tokenizer = tensorflow.keras.preprocessing.text.Tokenizer(num_words=NUM_WORDS)
    tokenizer.fit_on_texts(texts)  # training 
    
    # Function to make predictions using the loaded model
    def ml_pipeline(text: str) -> str:
        """LSTM model prediction function for this sample"""
        try:
            sequence = tokenizer.texts_to_sequences([text])
            sequence = tensorflow.keras.preprocessing.sequence.pad_sequences(sequence, maxlen=MAX_TEXT_LEN)
            if sequence.max() == 0:
                return 'Enter the proper words'
            else:
                predict = model.predict(sequence, verbose=0)
                if predict > 0.7:
                    return 'The text is Not a Name'
                else:
                    return 'The text is Name'
        except AttributeError:
            return 'Enter the text'
        
    
    image = Image.open(io.BytesIO(foto))  # Create an image object from the bytes
    # Perform OCR using pytesseract
    text = pytesseract.image_to_string(image)

    # REGEX
    def find_email(text):
        pattern = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"
        matches = re.findall(pattern, text)

        if matches:
         for match in matches:
            print(match)
            return(match)
            
        else:
            print("Tidak ada email tertera")

    email_address=find_email(text)
    ########### UNTUK NO HP ############
  
    nomorhp_katakunci = ['+62', '08']
    nomor_hp = ''
    
    for bbox, text, score in text_:
            lowercase_text = text.lower()
            cleaned_text = re.sub(r'\D', '', lowercase_text)
    
            if any(keyword in lowercase_text for keyword in nomorhp_katakunci):
                nomor_hp = cleaned_text

    if not nomor_hp:
            nomor_hp = '-'

    nomor_hp_baru = nomor_hp.replace('08', '628')

    name = []
    for value in values:
        if ml_pipeline(value) == "The text is Name":
            loopName = value
            name.append(loopName)
            print(value)

    phoneNumber = f'+{nomor_hp_baru}'
    print(phoneNumber)

    


    response_data = {
        "name": name,
        "email": email_address,
        "phoneNumber": phoneNumber
    }

    return response_data


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1',port=8501)
    
    
