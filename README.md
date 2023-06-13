gcloud builds submit --tag gcr.io/beginners-project-69/perform_ocr

gcloud run deploy --image gcr.io/beginners-project-69/perform_ocr --platform managed

BASE URL = https://perform-ocr-wf2dwnbrwq-et.a.run.app

gcloud builds submit --tag gcr.io/beginners-project-69/your-image-name
