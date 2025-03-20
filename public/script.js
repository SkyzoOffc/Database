async function addNumber() {
    const phone = document.getElementById("phone").value;
    if (!phone) return alert("Masukkan nomor WhatsApp!");

    const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
    });

    const data = await response.json();
    alert(data.message);
    location.reload();
}

async function fetchNumbers() {
    const response = await fetch("/api");
    const numbers = await response.json();
    const list = document.getElementById("numberList");
    list.innerHTML = "";

    numbers.forEach(num => {
        const li = document.createElement("li");
        li.textContent = num.phone;
        list.appendChild(li);
    });
}

fetchNumbers();
