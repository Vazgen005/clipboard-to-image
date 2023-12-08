const mainDiv = document.querySelector(".main");

const repository = location.hostname.split(".")[0];

window.addEventListener("paste", e => {
	const item = Array.from(e.clipboardData.items).find(x => /^image\//.test(x.type));
	if (!item) {
		mainDiv.textContent = "No image found in clipboard";
        return;
    }
	const blob = item.getAsFile();
	const img = new Image();
	img.src = URL.createObjectURL(blob);
	

	img.onload = () => {
		mainDiv.innerHTML = "";
		mainDiv.appendChild(img);
	};
});



if ("serviceWorker" in navigator) {
	// if (/(?<=\.).+/.exec(location.hostname)[0] === "github.io"){
	// 	navigator.serviceWorker.register("clipboard-to-image/scripts/serviceworker.js").then(
	// 		registration => console.log("Registered a Service Worker ", registration),
	// 		error => console.error("Could not register a Service Worker ", error),
	// 	);
	// 	return;
	// }
	navigator.serviceWorker.register(`serviceworker.js`).then(
		registration => console.log("Registered a Service Worker ", registration),
		error => console.error("Could not register a Service Worker ", error),
	);
} else {
	console.error("Service Workers are not supported in this browser.");
}