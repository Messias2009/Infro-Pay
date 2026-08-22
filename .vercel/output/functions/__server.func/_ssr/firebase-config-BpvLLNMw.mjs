import { a as getApp, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { f as doc, p as getFirestore, r as getDocFromServer } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { r as getAuth } from "../_libs/firebase__auth.mjs";
import { n as getStorage } from "../_libs/firebase__storage.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-config-BpvLLNMw.js
var firebase_applet_config_default = {
	projectId: "gen-lang-client-0979472076",
	appId: "1:876389544369:web:b7af27bc07d7ba81200d90",
	apiKey: "AIzaSyD0VedePzQNc-AlZiQ2kOLzhXoQZAxHUWs",
	authDomain: "gen-lang-client-0979472076.firebaseapp.com",
	firestoreDatabaseId: "ai-studio-infropay-77847e41-0a97-4647-9559-2e9717b11572",
	storageBucket: "gen-lang-client-0979472076.firebasestorage.app",
	messagingSenderId: "876389544369",
	measurementId: "",
	oAuthClientId: "876389544369-bnpc2ffs0pctsd3thuod1kdeaetqjpst.apps.googleusercontent.com",
	recaptchaSiteKey: ""
};
var firebaseConfig = {
	apiKey: firebase_applet_config_default.apiKey,
	authDomain: firebase_applet_config_default.authDomain,
	projectId: firebase_applet_config_default.projectId,
	storageBucket: firebase_applet_config_default.storageBucket,
	messagingSenderId: firebase_applet_config_default.messagingSenderId,
	appId: firebase_applet_config_default.appId
};
var app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
var auth = getAuth(app);
var firestore = getFirestore(app, firebase_applet_config_default.firestoreDatabaseId && firebase_applet_config_default.firestoreDatabaseId !== "(default)" ? firebase_applet_config_default.firestoreDatabaseId : void 0);
var db = firestore;
var storage = getStorage(app);
async function testFirestoreConnection() {
	if (typeof window === "undefined") return;
	try {
		await getDocFromServer(doc(firestore, "test", "connection"));
	} catch (error) {
		if (error instanceof Error && error.message.includes("the client is offline")) console.warn("Firestore client is offline or configuration requires review.");
	}
}
var OperationType = /* @__PURE__ */ function(OperationType) {
	OperationType["CREATE"] = "create";
	OperationType["UPDATE"] = "update";
	OperationType["DELETE"] = "delete";
	OperationType["LIST"] = "list";
	OperationType["GET"] = "get";
	OperationType["WRITE"] = "write";
	return OperationType;
}({});
function handleFirestoreError(error, operationType, path) {
	const errInfo = {
		error: error instanceof Error ? error.message : String(error),
		authInfo: {
			userId: auth.currentUser?.uid,
			email: auth.currentUser?.email,
			emailVerified: auth.currentUser?.emailVerified,
			isAnonymous: auth.currentUser?.isAnonymous,
			tenantId: auth.currentUser?.tenantId,
			providerInfo: auth.currentUser?.providerData?.map((provider) => ({
				providerId: provider.providerId,
				email: provider.email
			})) || []
		},
		operationType,
		path
	};
	console.error("Firestore Error: ", JSON.stringify(errInfo));
	throw new Error(JSON.stringify(errInfo));
}
//#endregion
export { handleFirestoreError as a, firestore as i, auth as n, storage as o, db as r, testFirestoreConnection as s, OperationType as t };
