from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
import os
import sqlite3
from datetime import datetime

app = Flask(__name__)
app.secret_key = "change-this"

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

UPLOAD_FOLDER = os.path.join(
    BASE_DIR,
    "static",
    "uploads",
    "eulogies"
)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png"}
MAX_FILE_SIZE = 5 * 1024 * 1024 #5MB

def allowed_file(file):
    return (
        "." in file.filename and
        file.filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )

def get_valid_int(value, default=None):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default
    
def get_db():
    conn = sqlite3.connect("memorial.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def index():
    conn = get_db()
    cursor = conn.cursor()

    # Fetch eulogies
    cursor.execute("""
        SELECT id, author_name, relationship, message, created_at
        FROM eulogies
        ORDER BY created_at DESC
    """)
    rows = cursor.fetchall()

    eulogies = []

    for row in rows:
        # Fetch photos for this eulogy
        cursor.execute("""
            SELECT image_url
            FROM eulogy_photos
            WHERE eulogy_id = ?
        """, (row["id"],))
        photos = [p["image_url"] for p in cursor.fetchall()]

        eulogies.append({
            "name": row["author_name"],
            "relationship": row["relationship"],
            "date": row["created_at"],
            "message": row["message"],
            "photos": photos,
            "votes": 0  # placeholder (votes route comes later)
        })

    conn.close()

    return render_template("index.html", eulogies=eulogies)


@app.route("/submit-eulogy", methods=["POST"])
def submit_eulogy():
    print("FILES RECEIVED:", request.files)
    print("PHOTOS LIST:", request.files.getlist("photos"))
    author_name = request.form.get("name")
    relationship = request.form.get("relationship")
    email = request.form.get("email")
    number = get_valid_int(request.form.get("number")) 
    message = request.form.get("message")

    photos = request.files.getlist("photos")
    print("PHOTOS RECEIVED:", len(photos))

    if not author_name or not relationship or not message:
        flash("Required fields are missing.")
        return redirect(url_for("index"))
    
    if len(photos) > 5:
        flash("You can upload a maximum of 5 images.")
        return redirect(url_for("index"))
    
    for photo in photos:
        if photo.filename:
            if not allowed_file(photo):
                flash("Only JPG and PNG images are allowed.")
                return redirect(url_for("index"))

            photo.seek(0, os.SEEK_END)
            size = photo.tell()
            photo.seek(0)

            if size > MAX_FILE_SIZE:
                flash("Each image must be under 5MB.")
                return redirect(url_for("index"))
    
    
    conn = get_db()
    cursor = conn.cursor()

    # insert eulogy
    try:
        cursor.execute("""
        INSERT INTO eulogies (author_name, relationship, email, number, message)
            VALUES (?, ?, ?, ?, ?) 
                    
        """, (author_name, relationship, email, number, message)

        )

        eulogy_id = cursor.lastrowid
   
        # Handle photo uploads
        for photo in photos:
            if photo and photo.filename:
                filename = secure_filename(photo.filename)
                timeStamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
                filename = f"{eulogy_id}_{timeStamp}_{filename}"

                file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
                photo.save(file_path)

                image_url = f"/static/uploads/eulogies/{filename}"

                cursor.execute("""
                    INSERT INTO eulogy_photos (eulogy_id, image_url)
                    VALUES (?, ?)
                """, (eulogy_id, image_url))
   
        conn.commit()
    finally:
        conn.close()

    flash("Thank you for sharing your tribute.")
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True)
