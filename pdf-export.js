/* Export PDF : chaque .pdf-page = une page A4 exacte (210×297 mm), sans fond perdu ni traits de coupe. */

async function exportPdf(){
  const btn = document.getElementById('exportPdfBtn');
  const pages = document.querySelectorAll('.pdf-page');
  if(pages.length === 0) return;

  document.querySelectorAll('[contenteditable="true"]').forEach(el => el.blur());

  const overflowing = document.querySelectorAll('.pdf-page.overflowing').length;
  if(overflowing > 0 && !confirm('⚠️ ' + overflowing + ' page(s) débordent du format A4 : le contenu en trop sera coupé dans le PDF. Exporter quand même ?')){
    return;
  }

  btn.disabled = true;
  const originalLabel = btn.textContent;
  btn.textContent = '⏳ Génération…';
  document.body.classList.add('exporting');

  try{
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' });

    for(let i=0;i<pages.length;i++){
      const canvas = await html2canvas(pages[i], {
        scale: 2.5,
        backgroundColor: null, // respecter le fond choisi (blanc/crème/ivoire)
        useCORS: true,
        width: pages[i].offsetWidth,
        height: pages[i].offsetHeight,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.93);
      if(i > 0) pdf.addPage('a4', 'portrait');
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    }

    const d = new Date();
    const pad = n => n<10 ? '0'+n : ''+n;
    const filename = `carte_${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}h${pad(d.getMinutes())}.pdf`;
    pdf.save(filename);
    window.__CARTE_HELPERS__.toast('PDF exporté : ' + filename);
  } catch(err){
    console.error(err);
    window.__CARTE_HELPERS__.toast('Erreur export PDF.');
  } finally {
    btn.disabled = false;
    btn.textContent = originalLabel;
    document.body.classList.remove('exporting');
  }
}

document.getElementById('exportPdfBtn').addEventListener('click', exportPdf);
