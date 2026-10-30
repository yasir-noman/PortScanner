# Port Scanner

A web-based, ultra-fast Port Scanner built with Python and Flask. It features a hacker-style terminal interface and scans the top 1000 TCP ports using multithreading for maximum speed.

Features:
- Top 1000 Ports: Scans ports from 1 to 1000.
- Ultra-Fast Scanning: Uses Python's ThreadPoolExecutor (200 threads) for rapid scanning.
- Live Progress Bar: Shows real-time scanning progress.
- Hacker Terminal UI: Deep black theme with neon green text (Matrix style).
- Resolves Hostnames: Automatically converts domain names (e.g., scanme.nmap.org) to IP addresses.

Technologies Used:
- Backend: Python 3, Flask, Socket, ThreadPoolExecutor
- Frontend: HTML5, CSS3, Vanilla JavaScript

How to Install and Run:
1. Open terminal in the project folder.
2. Install dependencies: pip install -r requirements.txt
3. Run the application: python app.py
4. Open browser and go to: http://127.0.0.1:5000

Disclaimer:
This tool is created for educational purposes only. Do not scan servers or IP addresses without explicit permission. Scanning unauthorized networks is illegal.

Developed by YASIR ARAFAT NOMAN