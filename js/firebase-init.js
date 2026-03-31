// Firebase SDK の初期化
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, OAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, onValue, set, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { firebaseConfig, TENANT_ID } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Microsoft 認証プロバイダー設定
const provider = new OAuthProvider('microsoft.com');
provider.setCustomParameters({
    tenant: TENANT_ID,
    prompt: 'select_account'
});

// React(Babel)側から利用できるようにwindowオブジェクトに公開
window.FirebaseServices = {
    auth,
    db,
    signInWithMicrosoft: () => signInWithPopup(auth, provider),
    logout: () => signOut(auth),
    onAuthStateChanged,
    ref,
    onValue,
    set,
    update
};

// Firebase 準備完了を React 側に通知
window.dispatchEvent(new CustomEvent('firebase-ready'));
