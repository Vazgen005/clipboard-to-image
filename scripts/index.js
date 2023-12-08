const mainDiv = document.querySelector(".main");

window.addEventListener("paste", e => {
	const item = Array.from(e.clipboardData.items).find(x => /^image\//.test(x.type));
	if (!item) {
		mainDiv.textContent = "No image found in clipboard";
        return;
    }
	const blob = item.getAsFile();
	const img = new Image();
	img.src = URL.createObjectURL(blob);
	

	img.onload = _ => {
		mainDiv.innerHTML = "";
		mainDiv.appendChild(img);
	};
});

// navigator.serviceWorker.register("scripts/serviceworker.js");

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/scripts/serviceworker.js").then(
		registration => console.log("Registered a Service Worker ", registration),
		error => console.error("Could not register a Service Worker ", error),
	);
} else {
	console.error("Service Workers are not supported in this browser.");
}