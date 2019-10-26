
async function generatePdf(element, filename) {
    const html2canvas = (await import("html2canvas"));
    const jsPdf = (await import("jspdf"));
    const FILE_WIDTH = 595;
    // 生成canvas
    const canvas = await html2canvas(element, {
        scrollX: 0,
        scrollY: 0
    });

    const imageHeight = (canvas.height / canvas.width) * FILE_WIDTH;

    // canvas 转 Pdf
    const doc = new jsPdf(imageHeight > FILE_WIDTH ? "p" : "l", "pt", [
        imageHeight,
        FILE_WIDTH
    ]);
    doc.addImage(
        canvas.toDataURL("image/jpeg", 1.0),
        "JPEG",
        0,
        0,
        FILE_WIDTH,
        imageHeight
    );
    doc.save(filename);
}

const target = document.getElementById('target');
const generateButton = document.getElementById('generate-button');

async function onGenerateClick(e) {
    const old = e.target.innerHTML;
    e.target.innerHTML = 'Loading...'
    await generatePdf(target, 'export')
    e.target.innerHTML = old;
}

generateButton.addEventListener('click', onGenerateClick)