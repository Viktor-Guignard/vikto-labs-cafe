/* =========================================================
   Stockage des versions directement dans le repo GitHub.
   - LECTURE : API publique GitHub, aucun réglage nécessaire.
   - ÉCRITURE : jeton GitHub « fine-grained » limité à ce seul repo,
     collé une fois (bouton ⚙️) OU activé via le « lien magique »
     (#jeton=… dans l'URL, mémorisé puis retiré de la barre d'adresse).
   ========================================================= */

const GH = {
  owner: 'Viktor-Guignard',
  repo: 'vikto-labs-cafe',
  branch: 'main',
  dir: 'versions',
  tokenKey: 'carte_ds_gh_token',
};

const API = `https://api.github.com/repos/${GH.owner}/${GH.repo}/contents/${GH.dir}`;

function getToken(){ return localStorage.getItem(GH.tokenKey) || ''; }
function hasToken(){ return !!getToken(); }

function utf8ToB64(str){
  return btoa(String.fromCharCode(...new TextEncoder().encode(str)));
}
function b64ToUtf8(b64){
  const bin = atob(b64.replace(/\n/g,''));
  return new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0)));
}

function pad(n){ return n<10 ? '0'+n : ''+n; }
function timestampName(){
  const d = new Date();
  return `carte_${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}h${pad(d.getMinutes())}`;
}

/* Liste les versions (public, sans jeton). Renvoie [{name, path}] trié récent → ancien. */
async function listVersions(){
  const res = await fetch(`${API}?ref=${GH.branch}&t=${Date.now()}`, {
    headers: { 'Accept': 'application/vnd.github+json' }
  });
  if(res.status === 404) return [];          // dossier pas encore créé
  if(!res.ok) throw new Error('GitHub API ' + res.status);
  const items = await res.json();
  return items
    .filter(it => it.type === 'file' && it.name.endsWith('.json'))
    .map(it => ({ name: it.name.replace(/\.json$/,''), path: it.path, sha: it.sha }))
    .sort((a,b) => b.name.localeCompare(a.name));  // noms horodatés zéro-paddés → tri chrono
}

/* Charge une version (public). Renvoie {style, blocks} — rétro-compatible avec l'ancien format (tableau nu). */
async function loadVersion(path){
  const res = await fetch(`https://api.github.com/repos/${GH.owner}/${GH.repo}/contents/${path}?ref=${GH.branch}&t=${Date.now()}`, {
    headers: { 'Accept': 'application/vnd.github+json' }
  });
  if(!res.ok) throw new Error('GitHub API ' + res.status);
  const json = await res.json();
  const data = JSON.parse(b64ToUtf8(json.content));
  if(Array.isArray(data)) return { style: null, blocks: data };
  return { style: data.style || null, blocks: data.blocks || [] };
}

async function putFile(name, bodyStr, token){
  return fetch(`${API}/${name}.json`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Version ' + name,
      content: utf8ToB64(bodyStr),
      branch: GH.branch,
    })
  });
}

/* Enregistre une nouvelle version (jeton requis). Renvoie le nom créé. */
async function saveVersion(doc, style){
  const token = getToken();
  if(!token) throw new Error('NO_TOKEN');
  const body = JSON.stringify({ style, blocks: doc }, null, 1);
  const name = timestampName();
  let res = await putFile(name, body, token);
  if(res.status === 401 || res.status === 403) throw new Error('BAD_TOKEN');
  if(res.status === 422){
    // fichier déjà existant (2 sauvegardes dans la même minute) → suffixe secondes
    const name2 = name + 's' + pad(new Date().getSeconds());
    res = await putFile(name2, body, token);
    if(!res.ok) throw new Error('GitHub API ' + res.status);
    return name2;
  }
  if(!res.ok) throw new Error('GitHub API ' + res.status);
  return name;
}

/* Supprime définitivement une version (jeton requis). */
async function deleteVersion(path, sha){
  const token = getToken();
  if(!token) throw new Error('NO_TOKEN');
  const res = await fetch(`https://api.github.com/repos/${GH.owner}/${GH.repo}/contents/${path}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Suppression de ' + path,
      sha,
      branch: GH.branch,
    })
  });
  if(res.status === 401 || res.status === 403) throw new Error('BAD_TOKEN');
  if(!res.ok) throw new Error('GitHub API ' + res.status);
}

window.CarteStorage = { hasToken, getToken, listVersions, loadVersion, saveVersion, deleteVersion };

/* ===================== Branchement UI ===================== */

const S = () => window.__CARTE_STATE__;
const H = () => window.__CARTE_HELPERS__;

const saveBtn = document.getElementById('saveVersionBtn');
const versionsBtn = document.getElementById('versionsBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsBackdrop = document.getElementById('settingsBackdrop');
const versionsBackdrop = document.getElementById('versionsBackdrop');
const versionList = document.getElementById('versionList');

/* Applique une version {style, blocks} à l'état + rendu */
function applyLoaded(data, versionName){
  S().doc = data.blocks;
  S().style = data.style || H().defaultStyle();
  S().selectedId = null;
  S().baseVersion = versionName || null;
  H().applyStyle();
  window.__CARTE_RENDER__();
  H().resetHistory();
}

/* ---------- Lien magique : #jeton=… dans l'URL ---------- */

function consumeMagicLink(){
  try{
    const h = location.hash || '';
    if(!h.startsWith('#jeton=')) return;
    const tok = decodeURIComponent(h.slice(7)).trim();
    if(!tok) return;
    localStorage.setItem(GH.tokenKey, tok);
    // retirer le jeton de la barre d'adresse (il reste dans le favori d'origine)
    try{ history.replaceState(null, '', location.pathname + location.search); }
    catch(e){ try{ location.hash = ''; }catch(e2){} }
    setTimeout(() => {
      H().updateSyncStatus();
      H().toast('Lien magique reconnu — la sauvegarde est activée sur cet ordinateur.');
    }, 300);
  }catch(e){ console.warn('lien magique :', e); }
}
consumeMagicLink();
// cas où le favori est ouvert alors que la page est déjà affichée (pas de rechargement)
window.addEventListener('hashchange', consumeMagicLink);

function magicLinkUrl(){
  return location.origin + location.pathname + '#jeton=' + encodeURIComponent(getToken());
}

function refreshMagicLinkUi(){
  const box = document.getElementById('magicLinkBox');
  box.style.display = hasToken() ? 'block' : 'none';
}

/* ---------- Réglages (jeton) ---------- */

settingsBtn.addEventListener('click', () => {
  document.getElementById('tokenInput').value = getToken();
  refreshMagicLinkUi();
  settingsBackdrop.classList.add('open');
});
document.getElementById('settingsClose').addEventListener('click', ()=> settingsBackdrop.classList.remove('open'));
settingsBackdrop.addEventListener('click', (e)=>{ if(e.target===settingsBackdrop) settingsBackdrop.classList.remove('open'); });

document.getElementById('tokenForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const val = document.getElementById('tokenInput').value.trim();
  if(val) localStorage.setItem(GH.tokenKey, val);
  else localStorage.removeItem(GH.tokenKey);
  refreshMagicLinkUi();
  H().updateSyncStatus();
  H().toast(val ? 'Jeton enregistré sur cet ordinateur.' : 'Jeton effacé.');
});

document.getElementById('copyMagicLink').addEventListener('click', async () => {
  try{
    await navigator.clipboard.writeText(magicLinkUrl());
    H().toast('Lien magique copié — mettez-le en favori sur vos autres ordinateurs.');
  }catch(e){
    // repli : sélection manuelle
    const inp = document.getElementById('magicLinkText');
    inp.style.display = 'block';
    inp.value = magicLinkUrl();
    inp.select();
    H().toast('Copiez le lien affiché ci-dessous (Ctrl/Cmd+C).');
  }
});

/* ---------- Enregistrer une version ---------- */

saveBtn.addEventListener('click', async () => {
  if(!hasToken()){
    settingsBackdrop.classList.add('open');
    refreshMagicLinkUi();
    H().toast('Collez d\'abord votre jeton GitHub (une fois par ordinateur).');
    return;
  }
  saveBtn.disabled = true;
  const original = saveBtn.textContent;
  saveBtn.textContent = 'Enregistrement…';
  try{
    // Détection de conflit : quelqu'un (l'autre poste ?) a-t-il enregistré depuis notre point de départ ?
    try{
      const latest = (await listVersions())[0];
      if(latest && latest.name !== S().baseVersion){
        const ok = confirm(
          'Attention : une version plus récente (« ' + latest.name + ' ») a été enregistrée depuis votre point de départ — probablement depuis un autre ordinateur.\n\n' +
          'Si vous continuez, VOTRE carte deviendra la version courante ; les changements de l\'autre version resteront consultables dans 🕑 Versions mais ne seront plus affichés.\n\nEnregistrer quand même ?');
        if(!ok){ return; }
      }
    }catch(e){ /* hors-ligne : on tente l'enregistrement quand même */ }

    const name = await saveVersion(S().doc, S().style);
    S().baseVersion = name;
    H().clearDraft();
    H().toast('Version enregistrée : ' + name);
  } catch(err){
    console.error(err);
    if(err.message === 'BAD_TOKEN'){
      H().toast('Jeton refusé par GitHub — vérifiez-le dans ⚙️ Réglages.');
      settingsBackdrop.classList.add('open');
    } else if(err.message === 'NO_TOKEN'){
      settingsBackdrop.classList.add('open');
    } else {
      H().toast('Erreur d\'enregistrement — réessayez.');
    }
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = original;
  }
});

/* ---------- Liste des versions ---------- */

versionsBtn.addEventListener('click', async () => {
  versionsBackdrop.classList.add('open');
  versionList.innerHTML = '<div class="empty-state">Chargement…</div>';
  try{
    const versions = await listVersions();
    if(versions.length === 0){
      versionList.innerHTML = '<div class="empty-state">Aucune version enregistrée pour l\'instant.</div>';
      return;
    }
    versionList.innerHTML = '';
    versions.forEach((v, i) => {
      const row = document.createElement('div');
      row.className = 'version-row';
      const m = v.name.match(/^carte_(\d{4})-(\d{2})-(\d{2})_(\d{2})h(\d{2})/);
      const dateStr = m ? `${m[3]}/${m[2]}/${m[1]} à ${m[4]}h${m[5]}` : '';
      row.innerHTML = `
        <div>
          <div class="vname">${v.name}${i===0 ? '<span class="tag">plus récente</span>' : ''}</div>
          <div class="vmeta">${dateStr}</div>
        </div>
        <div class="vactions">
          <button class="load">Charger</button>
          ${hasToken() ? '<button class="delete" title="Supprimer définitivement">🗑</button>' : ''}
        </div>`;
      const delBtn = row.querySelector('.delete');
      if(delBtn) delBtn.addEventListener('click', async () => {
        if(!confirm('Supprimer définitivement la version « ' + v.name + ' » ?\n\nContrairement au reste, cette action ne peut PAS être annulée.')) return;
        delBtn.disabled = true;
        try{
          await deleteVersion(v.path, v.sha);
          row.remove();
          H().toast('Version « ' + v.name + ' » supprimée.');
          // si on vient de supprimer la plus récente, rafraîchir le badge
          if(i === 0) versionsBtn.click();
        }catch(err){
          console.error(err);
          delBtn.disabled = false;
          H().toast(err.message === 'BAD_TOKEN' ? 'Jeton refusé — vérifiez ⚙️ Réglages.' : 'Erreur de suppression — réessayez.');
        }
      });
      row.querySelector('.load').addEventListener('click', async () => {
        if(S().dirty && !confirm('Des modifications non enregistrées seront remplacées par « ' + v.name + ' ». Continuer ?')) return;
        try{
          const data = await loadVersion(v.path);
          applyLoaded(data, v.name);
          H().clearDraft();
          versionsBackdrop.classList.remove('open');
          H().toast('Version « ' + v.name + ' » chargée.');
        }catch(err){
          console.error(err);
          H().toast('Erreur de chargement de cette version.');
        }
      });
      versionList.appendChild(row);
    });
  } catch(err){
    console.error(err);
    versionList.innerHTML = '<div class="empty-state">Erreur de chargement (connexion internet ?).</div>';
  }
});
document.getElementById('versionsClose').addEventListener('click', ()=> versionsBackdrop.classList.remove('open'));
versionsBackdrop.addEventListener('click', (e)=>{ if(e.target===versionsBackdrop) versionsBackdrop.classList.remove('open'); });

/* ---------- Au démarrage : reprendre où on s'était arrêté ---------- */

(async function boot(){
  H().updateSyncStatus();

  const draft = H().getDraft();
  let draftResumed = false;

  // 1) S'il y a un brouillon local non enregistré → proposer de le reprendre
  if(draft){
    const banner = document.getElementById('draftBanner');
    const when = new Date(draft.ts).toLocaleString('fr-FR');
    banner.querySelector('.msg').textContent =
      `Un brouillon non enregistré du ${when} existe sur cet ordinateur.`;
    banner.classList.add('show');
    document.getElementById('draftResume').onclick = () => {
      draftResumed = true;
      S().doc = draft.doc;
      if(draft.style) S().style = draft.style;
      S().dirty = true;
      H().applyStyle();
      window.__CARTE_RENDER__();
      H().resetHistory();
      H().updateSyncStatus();
      banner.classList.remove('show');
      H().toast('Brouillon repris — pensez à Enregistrer une version.');
    };
    document.getElementById('draftDiscard').onclick = () => {
      H().clearDraft();
      banner.classList.remove('show');
      // la dernière version cloud a déjà été chargée derrière la bannière (voir 2) ;
      // si le chargement est encore en cours, il s'appliquera tout seul.
    };
  }

  // 2) TOUJOURS charger la dernière version cloud (sauf si le brouillon a été repris entre-temps)
  try{
    const versions = await listVersions();
    if(versions.length > 0 && !draftResumed){
      const data = await loadVersion(versions[0].path);
      if(!draftResumed){
        applyLoaded(data, versions[0].name);
        H().toast('Dernière version chargée : ' + versions[0].name);
      }
    }
  }catch(err){
    console.warn('Chargement initial impossible (hors-ligne ?)', err);
  }
})();
