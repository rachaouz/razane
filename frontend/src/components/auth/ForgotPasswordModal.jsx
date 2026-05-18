import { COLORS }            from "../../constants"; 
import { useForgotPassword } from "../../hooks/useAuthForm";
import StyledInput           from "./StyledInput";
import ModalShell            from "../chat/settings/ModalShell";
import Button                from "../ui/button";

const G = COLORS.green;

export default function ForgotPasswordModal({ onClose }) {
  const { email, setEmail, sent, loading, error, handleReset } = useForgotPassword();

  return (
    <ModalShell
      onClose={onClose}
      darkMode={true}
      accentColor={G}
      titleIcon="🔑"
      title="MOT DE PASSE OUBLIÉ"
      maxWidth="380px"
      zIndex={50}
    >
      <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace", lineHeight: 1.6, marginBottom: "24px" }}>
        {sent ? "Demande envoyée. L'administrateur vous contactera." : "Entrez votre email. L'administrateur vous enverra votre nouveau mot de passe."}
      </div>

      {!sent ? (
        <>
          <StyledInput
            label="Email Address" type="email"
            value={email} onChange={e => setEmail(e.target.value)}
            placeholder="analyst@socilis.com"
          />
          <Button variant="green" onClick={handleReset} loading={loading}>
            ENVOYER LA DEMANDE
          </Button>
          {error && (
            <div style={{ marginTop: "10px", color: "#ff8080", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem" }}>
              ⚠ {error}
            </div>
          )}
        </>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", marginBottom: "20px", background: "rgba(127,216,50,0.05)", border: "1px solid rgba(127,216,50,0.2)", borderRadius: "6px" }}>
            <span style={{ color: G }}>✓</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: G }}>Email envoyé avec succès</span>
          </div>
          <Button variant="green" onClick={onClose}>
            FERMER
          </Button>
        </>
      )}
    </ModalShell>
  );
}