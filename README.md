Di dalam frontend ada beberapa package seperti fontawesome dan tailwind CSS
Untuk backend hanya perlu diactivate venv (virtual environment) kemudian dijalankan server.py

Masuk ke masing-masing foldernya di dalam VSCode dengan cara:
  - Masuk ke foldernya melalui file explorer
  - Ganti pathnya jadi cmd di bagian atas
  - Jalanin / ketik  'code .'

FrontEnd:
  - npm install
  - npm run dev

Flask:
  - python -m venv venv (yang ini gk ush karena udh ada venv)
  - venv\Scripts\activate (windows)
  - pip install -r requirements.txt
  - source venv/bin/activate (macOS)
  - python server.py
