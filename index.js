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