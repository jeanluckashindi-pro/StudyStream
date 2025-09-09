import { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { useTranslation } from "react-i18next";

const ConnectionNotification = () => {
  const { t } = useTranslation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setNotificationType("connected");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setNotificationType("disconnected");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showNotification) return null;

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div
        style={{ padding: "10px" }}
        className={`flex items-center gap-3  py-3 rounded-lg shadow-lg border backdrop-blur-sm ${
          notificationType === "connected"
            ? "bg-green-500/95 text-white border-green-400"
            : "bg-red-500/95 text-white border-red-400"
        }`}
      >
        {notificationType === "connected" ? (
          <Wifi className="w-5 h-5" />
        ) : (
          <WifiOff className="w-5 h-5" />
        )}
        <span className="font-medium text-sm">
          {notificationType === "connected"
            ? `${t("connectionStatus.connected")} ${t("auth.platformName")}`
            : `${t("connectionStatus.disconnected")} ${t("auth.platformName")}`}
        </span>
      </div>
    </div>
  );
};

const Demo = () => {
  return (
    <div className="justify-center p-4">
      <ConnectionNotification />
    </div>
  );
};

export default Demo;
