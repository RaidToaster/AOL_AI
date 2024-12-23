from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import base64
from io import BytesIO
from PIL import Image


app = Flask(__name__)
CORS(app)


model_best = load_model('face_model.h5')


class_names = ['Angry', 'Disgusted', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

@app.route('/detect_emotion', methods=['POST'])
def detect_emotion():
    try:
        data = request.json
        img_data = base64.b64decode(data['image'])
        img = Image.open(BytesIO(img_data))
        img = np.array(img)

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=3, minSize=(30, 30), maxSize=(300, 300))

        emotions = []
        for (x, y, w, h) in faces:
            face_roi = img[y:y + h, x:x + w]

            face_image = cv2.resize(face_roi, (48, 48))
            face_image = cv2.cvtColor(face_image, cv2.COLOR_BGR2GRAY)
            face_image = image.img_to_array(face_image)
            face_image = np.expand_dims(face_image, axis=0)

            predictions = model_best.predict(face_image)
            emotion_label = class_names[np.argmax(predictions)]
            emotions.append({'x': int(x), 'y': int(y), 'w': int(w), 'h': int(h), 'emotion': emotion_label})

        return jsonify({'emotions': emotions})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

