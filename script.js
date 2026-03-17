const firebaseConfig = {
  apiKey: "AIzaSyALJUV1EAmwFvDdVmG3wK8KUATcOS8_-dI",
  authDomain: "mam-distribuidora-6043f.firebaseapp.com",
  projectId: "mam-distribuidora-6043f",
  storageBucket: "mam-distribuidora-6043f.firebasestorage.app",
  messagingSenderId: "467923017917",
  appId: "1:467923017917:web:7361ecf8cff2cbfed197d4"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

async function realizarLancamentoMAM() {
    const btn = document.getElementById('btnEnviar');
    const titulo = document.getElementById('titulo').value;
    const artista = document.getElementById('artista').value;
    const genero = document.getElementById('genero').value;
    const audioFile = document.getElementById('audioFile').files[0];
    const capaFile = document.getElementById('capaFile').files[0];

    if (!titulo || !artista || !audioFile || !capaFile) {
        return alert("Preenche tudo, Matias!");
    }

    try {
        btn.disabled = true;
        btn.innerText = "A enviar para a MAM...";

        const audioRef = storage.ref(`musicas/${Date.now()}_${audioFile.name}`);
        await audioRef.put(audioFile);
        const audioUrl = await audioRef.getDownloadURL();

        const capaRef = storage.ref(`capas/${Date.now()}_${capaFile.name}`);
        await capaRef.put(capaFile);
        const capaUrl = await capaRef.getDownloadURL();

        await db.collection("lancamentos").add({
            titulo: titulo,
            artista: artista,
            genero: genero,
            audioUrl: audioUrl,
            capaUrl: capaUrl,
            status: "Pendente",
            data: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Sucesso! Música enviada.");
        location.reload();
    } catch (e) {
        alert("Erro: " + e.message);
        btn.disabled = false;
    }
}
