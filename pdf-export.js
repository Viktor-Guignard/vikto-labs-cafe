/* Export PDF — un clic, aucun dialogue.

   Le PDF est fabriqué par pdf-vector.js : le navigateur calcule la mise
   en page (comme à l'écran), on relève les positions obtenues et on
   écrit le même texte, avec la même police, au même endroit.

   Pourquoi plus de capture d'écran : html2canvas re-mesure lui-même
   chaque fragment de texte, et Safari fausse ces mesures — les mots se
   collent, puis l'espacement des lettres devient irrégulier. La capture
   reste accessible en secours via window.__exportPdfImage().

   Gain au passage : texte vectoriel (net à toute échelle, sélectionnable
   par l'imprimeur) et fichier bien plus léger. */

const EXPORT_VERSION = 'v23';

function exportFilename(suffix) {
  const d = new Date();
  const p = n => n < 10 ? '0' + n : '' + n;
  return `carte-cafe${suffix || ''}_${EXPORT_VERSION}_${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}h${p(d.getMinutes())}.pdf`;
}

async function exportPdf() {
  const btn = document.getElementById('exportPdfBtn');
  const sheets = document.querySelectorAll('.sheet');
  if (sheets.length === 0) return;

  document.querySelectorAll('[contenteditable="true"]').forEach(el => el.blur());

  const overflowing = document.querySelectorAll('.sheet.overflowing').length;
  if (overflowing > 0 && !confirm('⚠️ ' + overflowing + ' planche(s) débordent : le contenu en trop sera coupé dans le PDF. Exporter quand même ?')) {
    return;
  }

  btn.disabled = true;
  const originalLabel = btn.textContent;
  btn.textContent = '⏳ Génération…';

  try {
    const pdf = await window.CartePdfVector.exportVectorPdf({
      onStep: s => { btn.textContent = '⏳ ' + s + '…'; },
    });
    const name = exportFilename();
    pdf.save(name);
    window.__CARTE_HELPERS__.toast('PDF téléchargé : ' + name);
  } catch (err) {
    console.error(err);
    window.__CARTE_HELPERS__.toast('Erreur PDF — nouvelle tentative en mode image…');
    try { await window.__exportPdfImage(); }
    catch (e2) { console.error(e2); window.__CARTE_HELPERS__.toast('Export PDF impossible.'); }
  } finally {
    btn.disabled = false;
    btn.textContent = originalLabel;
  }
}

/* ---------- Secours : ancienne capture image ---------- */

window.__exportPdfImage = async function () {
  const sheets = document.querySelectorAll('.sheet');
  const { jsPDF } = window.jspdf;
  const PX_TO_MM = 25.4 / 96;
  document.body.classList.add('exporting');
  let pdf = null;
  try {
    try { await document.fonts.ready; } catch (_) { }
    document.body.offsetHeight;
    await new Promise(r => setTimeout(r, 300));
    for (let i = 0; i < sheets.length; i++) {
      const el = sheets[i];
      const wmm = el.offsetWidth * PX_TO_MM;
      const hmm = el.offsetHeight * PX_TO_MM;
      const canvas = await html2canvas(el, {
        scale: 2.5, backgroundColor: null, useCORS: true,
        width: el.offsetWidth, height: el.offsetHeight,
        windowWidth: Math.max(document.documentElement.clientWidth, el.offsetWidth + 40),
        windowHeight: Math.max(document.documentElement.clientHeight, el.offsetHeight + 40),
        scrollX: 0, scrollY: 0,
      });
      if (!pdf) pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [wmm, hmm] });
      else pdf.addPage([wmm, hmm], 'landscape');
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.93), 'JPEG', 0, 0, wmm, hmm);
    }
    pdf.save(exportFilename('_image'));
  } finally {
    document.body.classList.remove('exporting');
  }
};

document.getElementById('exportPdfBtn').addEventListener('click', exportPdf);
