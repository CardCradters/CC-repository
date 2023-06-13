# Use the official Python image as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Install Tesseract OCR
RUN apt-get update && \
    apt-get install -y tesseract-ocr

# Copy the requirements.txt file to the working directory
COPY requirements.txt .

# Install the application dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the application code to the container
COPY . .

# Expose the port that your application will listen on
EXPOSE 8501

# Define the command to run your application when the container starts
CMD ["uvicorn", "fixkah:app", "--host", "0.0.0.0", "--port", "8501"]
