const scanBtn = document.getElementById("scan-btn");
const targetInput = document.getElementById("target-input");
const outputArea = document.getElementById("output-area");
const resHeader = document.getElementById("res-header");
const tableBody = document.getElementById("table-body");
const noPorts = document.getElementById("no-ports");
const errorMsg = document.getElementById("error-msg");
const progressContainer = document.getElementById("progress-container");
const progressFill = document.getElementById("progress-fill");

scanBtn.addEventListener("click", async () => {
  const target = targetInput.value.trim();
  if (!target) {
    alert("Please enter a target IP or domain!");
    return;
  }

 
  outputArea.classList.add("hidden");
  errorMsg.classList.add("hidden");
  progressContainer.classList.remove("hidden");
  tableBody.innerHTML = "";
  scanBtn.disabled = true;
  scanBtn.textContent = "[ SCANNING... ]";
  progressFill.style.width = "0%";


  let progress = 0;
  const progressInterval = setInterval(() => {
    if (progress < 90) {
      progress += Math.random() * 10;
      progressFill.style.width = `${progress}%`;
    }
  }, 300);

  try {
    const res = await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target: target })
    });
    
    const data = await res.json();
    

    clearInterval(progressInterval);
    progressFill.style.width = "100%";
    
    setTimeout(() => {
      progressContainer.classList.add("hidden");
    }, 500); 

    if (!res.ok) {
      errorMsg.textContent = `[-] Error: ${data.error}`;
      errorMsg.classList.remove("hidden");
      return;
    }

  
    setTimeout(() => {
      outputArea.classList.remove("hidden");
      resHeader.textContent = `[+] Scan complete for ${data.target} (${data.ip}). Scanned ${data.scanned_ports} ports.`;
      
      if (data.open_ports.length === 0) {
        noPorts.style.display = "block";
      } else {
        noPorts.style.display = "none";
        data.open_ports.forEach(p => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${p.port}</td>
            <td style="color:#00ff00; font-weight:bold;">${p.status}</td>
            <td>${p.service}</td>
          `;
          tableBody.appendChild(tr);
        });
      }
    }, 600);

  } catch (err) {
    clearInterval(progressInterval);
    progressContainer.classList.add("hidden");
    errorMsg.textContent = "[-] Network error occurred.";
    errorMsg.classList.remove("hidden");
  } finally {
    scanBtn.disabled = false;
    scanBtn.textContent = "[ EXECUTE SCAN ]";
  }
});
