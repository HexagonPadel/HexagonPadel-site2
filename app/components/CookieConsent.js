import { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";

export default function CookieBanner({ setCookieAccepted }) {
  const [cookieVisible, setCookieVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setCookieVisible(true);
    } else if (cookieConsent === "true") {
      setCookieAccepted(true);
    }
  }, [setCookieAccepted]);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setCookieAccepted(true);
    setCookieVisible(false);
  };

  return (
    <div>
      {cookieVisible && (
        <CookieConsent
          onAccept={handleAccept}
          buttonText="Accepter"
          declineButtonText="Refuser"
          enableDeclineButton
          style={{ background: "#2B373B", color: "white" }}
          buttonStyle={{
            background: "#4CAF50",
            color: "white",
            fontSize: "13px",
            fontWeight: "bold",
          }}
          declineButtonStyle={{
            background: "#f44336",
            color: "white",
            fontSize: "13px",
            fontWeight: "bold",
          }}
          expires={365}
        >
          Nous utilisons des cookies pour améliorer votre expérience. En continuant à naviguer sur ce site, vous acceptez notre politique de confidentialité.
        </CookieConsent>
      )}
    </div>
  );
}