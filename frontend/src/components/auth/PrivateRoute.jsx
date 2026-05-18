// Si l'utilisateur n'est pas authentifié, ou n'a pas le rôle requis,
// il est redirigé vers une route sûre sans jamais voir le contenu protégé.

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute({
  children,
  requiredRole = null,
  redirectTo   = "/home",
  fallback     = null,
}) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  // 1. Non authentifié → redirection vers auth avec mémorisation de la page demandée
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // 2. Rôle requis spécifié mais non satisfait
  if (requiredRole !== null && role !== requiredRole) {
    // Si un fallback est fourni (ex : message "Accès refusé"), on l'affiche.
    // Sinon on redirige vers la route sûre.
    if (fallback) return fallback;
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}