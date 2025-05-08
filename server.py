from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

def generate_random_image():
    return [random.randint(0, 255) for _ in range(64 * 64 * 3)]  # 64x64 RGB

@app.route("/")
def index():
    images = [generate_random_image() for _ in range(4)]
    return render_template("index.html", images=images)

@app.route("/vote", methods=["POST"])
def vote():
    data = request.json
    print("User selected image:", data["selectedIndex"])  # TODO: Save this
    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(debug=True)
