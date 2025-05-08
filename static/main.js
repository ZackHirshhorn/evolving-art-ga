document.addEventListener("DOMContentLoaded", () => {
    const images = JSON.parse('{{ images | tojson | safe }}');
    const gallery = document.getElementById("gallery");

    images.forEach((imgData, index) => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 64;
        const ctx = canvas.getContext("2d");
        const imageData = ctx.createImageData(64, 64);
        for (let i = 0; i < imgData.length; i += 3) {
            const j = (i / 3) * 4;
            imageData.data[j] = imgData[i];
            imageData.data[j + 1] = imgData[i + 1];
            imageData.data[j + 2] = imgData[i + 2];
            imageData.data[j + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
        canvas.addEventListener("click", () => {
            fetch("/vote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ selectedIndex: index })
            });
            alert("Thanks! Image #" + index + " voted.");
        });
        gallery.appendChild(canvas);
    });
});
