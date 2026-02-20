const fs = require("fs");
const path = require("path");

const folderPath = "./assets/My Portfolio";
const outputFile = "./data/images.json";

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error("Gagal membaca folder:", err);
        return;
    }

    const images = files
        .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
        .map(file => {
            const stats = fs.statSync(path.join(folderPath, file));
            return {
                name: file,
                modified: stats.mtimeMs
            };
        })
        .sort((a, b) => b.modified - a.modified); // 🔥 terbaru dulu

    fs.writeFileSync(outputFile, JSON.stringify(images, null, 2));

    console.log("images.json berhasil dibuat & sudah diurutkan!");
});