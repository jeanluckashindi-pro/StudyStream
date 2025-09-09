
export const AnimatedBackground = ({ particleCount = 20, particleColor = "bg-blue-500/20" }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, [particleCount]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute w-2 h-2 ${particleColor} rounded-full animate-pulse`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// Classes CSS pour les backgrounds
export const backgroundStyles = {
  // Background principal avec dégradé
  primary: "absolute inset-0 bg-gradient-to-br from-background via-card to-background",
  
  // Background avec effet de profondeur
  depth: "absolute inset-0 bg-gradient-to-br from-transparent via-card/20 to-card/30",
  
  // Grille de fond
  grid: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10",
  
  // Container principal
  container: "min-h-screen relative overflow-hidden",
  
  // Content avec z-index
  content: "relative z-10 min-h-screen flex items-center justify-center p-4",
  
  // Variantes de dégradés
  gradients: {
    primary: "bg-gradient-to-br from-background via-card to-background",
    secondary: "bg-gradient-to-br from-card via-background to-muted",
    accent: "bg-gradient-to-br from-primary/5 via-background to-secondary/5",
    dark: "bg-gradient-to-br from-background via-muted to-card",
    light: "bg-gradient-to-br from-card to-background",
    diagonal: "bg-gradient-to-tr from-background via-card to-primary/10",
    radial: "bg-gradient-radial from-background via-card/50 to-background",
  },
  
  // Overlays
  overlays: {
    subtle: "absolute inset-0 bg-gradient-to-br from-transparent via-card/10 to-card/20",
    medium: "absolute inset-0 bg-gradient-to-br from-transparent via-card/20 to-card/30",
    strong: "absolute inset-0 bg-gradient-to-br from-card/20 via-card/30 to-card/40",
  },
  
  // Grilles alternatives
  grids: {
    default: "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10",
    dots: "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxLjUiIGZpbGw9IiMzMzMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZG90cykiLz48L3N2Zz4=')] opacity-10",
    fine: "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZmluZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNmaW5lKSIvPjwvc3ZnPg==')] opacity-5",
  }
};

// Composant Background complet réutilisable
export const PlatformBackground = ({ 
  variant = "primary", 
  withGrid = true, 
  gridType = "default",
  withParticles = false, 
  withOverlay = true,
  overlayType = "subtle",
  children,
  className = ""
}) => {
  return (
    <div className={`${backgroundStyles.container} ${className}`}>
      {/* Background principal */}
      <div className={backgroundStyles.gradients[variant]} />
      
      {/* Particules animées */}
      {withParticles && <AnimatedBackground />}
      
      {/* Grille de fond */}
      {withGrid && (
        <div className={`absolute inset-0 ${backgroundStyles.grids[gridType]}`}>
          {withOverlay && (
            <div className={backgroundStyles.overlays[overlayType]} />
          )}
        </div>
      )}
      
      {/* Contenu */}
      <div className={backgroundStyles.content}>
        {children}
      </div>
    </div>
  );
};

// Hook pour les styles de background
export const useBackgroundStyles = () => {
  const applyBackground = (variant = "primary", options = {}) => {
    const {
      withGrid = true,
      gridType = "default",
      withOverlay = true,
      overlayType = "subtle"
    } = options;

    return {
      container: backgroundStyles.container,
      background: backgroundStyles.gradients[variant],
      grid: withGrid ? backgroundStyles.grids[gridType] : "",
      overlay: withOverlay ? backgroundStyles.overlays[overlayType] : "",
      content: backgroundStyles.content
    };
  };

  return { applyBackground, backgroundStyles };
};

// Constantes pour une utilisation facile
export const BG_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary", 
  ACCENT: "accent",
  DARK: "dark",
  LIGHT: "light",
  DIAGONAL: "diagonal",
  RADIAL: "radial"
};

export const GRID_TYPES = {
  DEFAULT: "default",
  DOTS: "dots", 
  FINE: "fine"
};

export const OVERLAY_TYPES = {
  SUBTLE: "subtle",
  MEDIUM: "medium",
  STRONG: "strong"
};