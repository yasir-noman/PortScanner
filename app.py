import socket
from concurrent.futures import ThreadPoolExecutor
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def scan_single_port(ip, port):
    """Function to scan a specific port"""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(0.5) 
            result = s.connect_ex((ip, port))
            if result == 0:
                try:
                    service = socket.getservbyport(port)
                except:
                    service = "Unknown"
                return {"port": port, "status": "OPEN", "service": service}
    except Exception:
        pass
    return None

@app.route("/")
def index():
    return render_template("index.html")

@app.post("/api/scan")
def api_scan():
    data = request.get_json(silent=True) or {}
    target = data.get("target", "").strip()

    if not target:
        return jsonify({"error": "Target IP or Domain is required"}), 400

    try:
        ip = socket.gethostbyname(target)
    except socket.gaierror:
        return jsonify({"error": "Could not resolve hostname"}), 400

    open_ports = []
    

    ports_to_scan = range(1, 1001)
    

    with ThreadPoolExecutor(max_workers=200) as executor:
        results = executor.map(lambda p: scan_single_port(ip, p), ports_to_scan)
        
        for res in results:
            if res:
                open_ports.append(res)


    open_ports = sorted(open_ports, key=lambda x: x["port"])

    return jsonify({
        "target": target,
        "ip": ip,
        "scanned_ports": 1000,
        "open_ports": open_ports
    })

if __name__ == "__main__":
    app.run(debug=True)
