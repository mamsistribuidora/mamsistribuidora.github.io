// CONFIGURAÇÃO MAM DISTRIBUIDORA
const firebaseConfig = {
  apiKey: "AIzaSyALJUV1EAmwFvDdVmG3wK8KUATcOS8_-dI",
  authDomain: "mam-distribuidora-6043f.firebaseapp.com",
  projectId: "mam-distribuidora-6043f",
  storageBucket: "mam-distribuidora-6043f.firebasestorage.app",
  messagingSenderId: "467923017917",
  appId: "1:467923017917:web:7361ecf8cff2cbfed197d4"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// FUNÇÃO PARA CARREGAR TODOS OS ESTILOS NO TEU SELECT AUTOMATICAMENTE
window.onload = function() {
    const selectGenero = document.getElementById('genero');
    if(selectGenero) {
        selectGenero.innerHTML = `
            <option value="">Selecionar Estilo...</option>
            <optgroup label="África / Urbano">
                <option value="Kuduro">Kuduro</option>
                <option value="Kizomba">Kizomba</option>
                <option value="Semba">Semba</option>
                <option value="Afro House">Afro House</option>
                <option value="Amapiano">Amapiano</option>
                <option value="Hip Hop">Hip Hop / Rap</option>
            </optgroup>
            <optgroup label="Global">
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Gospel">Gospel</option>
                <option value="Jazz">Jazz</option>
                <option value="Electronic">Eletrónica</option>
            </optgroup>`;
    }
};

// FUNÇÃO DE UPLOAD REAL
async function realizarLancamentoMAM() {
    const btn = document.getElementById('btnEnviar');
    const titulo = document.getElementById('titulo').value;
    const artista = document.getElementById('artista').value;
    const genero = document.getElementById('genero').value;
    const audioFile = document.getElementById('audioFile').files[0];
    const capaFile = document.getElementById('capaFile').files[0];

    if (!audioFile || !capaFile || !titulo || !artista) {
        return alert("Preencha todos os dados, Matias!");
    }

    try {
        btn.disabled = true;
        btn.innerText = "A Enviar...";

        const audioRef = storage.ref(`lancamentos/audios/${Date.now()}_${audioFile.name}`);
        await audioRef.put(audioFile);
        const audioUrl = await audioRef.getDownloadURL();

        const capaRef = storage.ref(`lancamentos/capas/${Date.now()}_${capaFile.name}`);
        await capaRef.put(capaFile);
        const capaUrl = await capaRef.getDownloadURL();

        await db.collection("lancamentos").add({
            titulo: titulo,
            artista: artista,
            genero: genero,
            audioUrl: audioUrl,
            capaUrl: capaUrl,
            status: "Em Análise",
            data: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Sucesso! Música enviada para a MAM.");
        window.location.reload();
    } catch (error) {
        alert("Erro: " + error.message);
        btn.disabled = false;
    }
}
