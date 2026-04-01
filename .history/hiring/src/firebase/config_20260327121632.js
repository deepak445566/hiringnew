import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const createAdminUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      "admin@gmail.com",
      "admin123"
    );
    console.log("✅ Admin user created successfully!");
    console.log("Email:", userCredential.user.email);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log("⚠️ Admin user already exists!");
    } else {
      console.error("❌ Error creating admin:", error.message);
    }
  }
};

createAdminUser();