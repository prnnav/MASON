from flask import Flask, request, send_file
from TTS.api import TTS
import tempfile

app = Flask(__name__)

tts = TTS(model_name="tts_models/en/vctk/vits")

@app.route("/speak", methods=["POST"])
def speak():
    data = request.json
    text = data.get("text", "")

    tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
    tts.tts_to_file(text=text, file_path=tmp_file.name)

    return send_file(tmp_file.name, mimetype="audio/wav")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
