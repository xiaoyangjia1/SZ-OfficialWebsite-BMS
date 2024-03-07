import html2canvas from "html2canvas";
import JSPDF from "jspdf";
export function downloadPDF(id: string) {
  let el: HTMLElement = document.getElementById(id) as HTMLElement;
  html2canvas(el, { logging: false }).then((canvas) => {
    let pdf = new JSPDF("p", "mm", "a4");
    const ctx = canvas.getContext("2d");
    let a4w = 170,
      a4h = 257;
    let imgHeight = Math.floor((a4h * canvas.width) / a4w);
    let renderHeight = 0;
    while (renderHeight < canvas.height) {
      let page = document.createElement("canvas");
      page.width = canvas.width;
      page.height = Math.min(imgHeight, canvas.height - renderHeight);
      page
        .getContext("2d")
        ?.putImageData(
          ctx?.getImageData(
            0,
            renderHeight,
            canvas.width,
            Math.min(imgHeight, canvas.height - renderHeight)
          ),
          0,
          0
        );
      pdf.addImage(
        page.toDataURL("image/jpeg", 1.0),
        "JEPG",
        10,
        10,
        a4w,
        Math.min(a4h, (a4w * page.height) / page.width)
      );
      renderHeight += imgHeight;
      if (renderHeight < canvas.height) {
        pdf.addPage();
      }
    }
    pdf.save("test.pdf");
  });
}
