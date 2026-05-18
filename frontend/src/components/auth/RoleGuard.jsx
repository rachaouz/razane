// Garantit que les éléments restreints ne sont ni visibles ni présents dans le DOM.
import { useAuth, ROLES } from "../../context/AuthContext";
export default function RoleGuard({ allowedRoles = [], fallback = null, children }) {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) return fallback;
  if (!allowedRoles.includes(role)) return fallback;

  return children;
}

// ─── Export des ROLES pour usage pratique dans les consommateurs ──────────
export { ROLES };