/* Export PDF : chaque .sheet = une planche paysage (3 volets), aux proportions du dépliant. */

async function exportPdf(){
  const btn = document.getElementById('exportPdfBtn');
  const sheets = document.querySelectorAll('.sheet');
  if(sheets.length === 0) return;

  document.querySelectorAll('[contenteditable="true"]').forEach(el => el.blur());

  const overflowing = document.querySelectorAll('.sheet.overflowing').length;
  if(overflowing > 0 && !confirm('⚠️ ' + overflowing + ' planche(s) débordent : le contenu en trop sera coupé dans le PDF. Exporter quand même ?')){
    return;
  }

  btn.disabled = true;
  const originalLabel = btn.textContent;
  btn.textContent = '⏳ Génération…';
  document.body.classList.add('exporting');

  try{
    const { jsPDF } = window.jspdf;
    const PX_TO_MM = 25.4 / 96;

    let pdf = null;
    for(let i=0;i<sheets.length;i++){
      const el = sheets[i];
      const wmm = el.offsetWidth * PX_TO_MM;
      const hmm = el.offsetHeight * PX_TO_MM;
      const canvas = await html2canvas(el, {
        scale: 2.5,
        backgroundColor: null,
        useCORS: true,
        width: el.offsetWidth,
        height: el.offsetHeight,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.93);
      if(i === 0){
        pdf = new jsPDF({ orientation:'landscape', unit:'mm', format:[wmm, hmm] });
      } else {
        pdf.addPage([wmm, hmm], 'landscape');
      }
      pdf.addImage(imgData, 'JPEG', 0, 0, wmm, hmm);
    }

    const d = new Date();
    const pad = n => n<10 ? '0'+n : ''+n;
    const filename = `carte_ds_${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}h${pad(d.getMinutes())}.pdf`;
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
