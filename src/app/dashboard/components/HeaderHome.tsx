"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, Settings, X } from "lucide-react";
import OptiAcadButton from "@/components/OptiAcadButton";
const HeaderHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showNotifications, setShowNotifications] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const sampleSuggestions = [
    "Football - Ligue 1",
    "Basketball - NBA",
    "Tennis - Roland Garros",
    "Football - Champions League",
    "Rugby - Top 14",
    "Handball - Championnat",
    "Volleyball - Ligue A",
    "Football - Premier League",
    "Basketball - EuroLeague",
    "Tennis - Wimbledon",
    "Football - Serie A",
    "Hockey - NHL",
  ];

  const sampleNotifications = [
    {
      id: 1,
      title: "Match en direct",
      message: "PSG vs OM commence dans 15 minutes",
      time: "Il y a 2 min",
      type: "live",
      read: false,
    },
    {
      id: 2,
      title: "Résultat",
      message: "Real Madrid 3-1 Barcelona",
      time: "Il y a 1h",
      type: "result",
      read: false,
    },
    {
      id: 3,
      title: "Transfer",
      message: "Mbappé signe au Real Madrid",
      time: "Il y a 3h",
      type: "news",
      read: true,
    },
    {
      id: 4,
      title: "Rappel",
      message: "France vs Allemagne à 21h",
      time: "Il y a 5h",
      type: "reminder",
      read: true,
    },
  ];

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredSuggestions = sampleSuggestions.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setActiveSuggestion(-1);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeSuggestion >= 0) {
        handleSuggestionClick(suggestions[activeSuggestion]);
      } else if (searchTerm.trim()) {
        setShowSuggestions(false);
        inputRef.current?.blur();
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveSuggestion(-1);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      setActiveSuggestion(-1);
    }, 200);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClick = (notificationId: number) => {
    console.log("Notification clicked:", notificationId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showNotifications]);

  return (
    <>
      <style jsx>{`
        @keyframes bounce-notification {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }

        .notification-badge {
          animation: bounce-notification 2s infinite;
        }
      `}</style>

      <div className="flex justify-end w-full gap-4 p-2 items-center">
        <div className="left"></div>
        <div
          className="right flex items-center gap-4"
          style={{ width: "calc(50% - 200px)" }}
        >
          {/* Champ de recherche */}
          <div className="relative flex-1">
            <div className="relative">
              <input
                ref={inputRef}
                type="search"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="pr-12 pl-4 py-3 border border-gray-300  w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
              />
              <Search
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer transition-colors hover:text-blue-500"
                size={20}
              />
              {searchTerm && (
                <X
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                  size={16}
                />
              )}
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-1  shadow-lg z-50 overflow-hidden"
                style={{
                  backgroundColor: "var(--card)",
                  borderRadius: "0  0 8px 8px",
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    ref={(el) => (suggestionRefs.current[index] = el)}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{
                      padding: "10px 12px",
                      cursor: "pointer",
                      borderBottom:
                        index < suggestions.length - 1
                          ? "1px solid var(--bg-border)"
                          : "none",
                      backgroundColor:
                        index === activeSuggestion
                          ? "var(--card)"
                          : "transparent",
                    }}
                    className={`px-4  cursor-pointer transition-colors flex items-center gap-3 ${
                      index === activeSuggestion
                        ? "bg-card text-blue-700"
                        : "hover:bg-background"
                    }`}
                  >
                    <Search size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div
            ref={notificationRef}
            className="relative border border-gray-300 rounded-full p-1 hover:border-blue-300 transition-colors cursor-pointer group"
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--card)",
            }}
            onClick={toggleNotifications}
          >
            <Bell
              className="w-6 h-6 p-2 rounded-full cursor-pointer transition-colors group-hover:text-blue-600"
              style={{ color: "var(--gray-400)" }}
            />
            <div
              className="notification-badge absolute -top-0 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
              style={{ border: "2px solid var(--background)" }}
            ></div>

            {/* Panneau des notifications */}
            {showNotifications && (
              <div
                className="absolute top-full right-0 w-100 shadow-lg z-50 overflow-hidden rounded-lg"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--bg-border)",
                  marginTop: "10px",
                }}
              >
                {/* Header du panneau */}
                <div
                  className="border-b px-4"
                  style={{
                    padding: "12px",
                  }}
                >
                  <h3
                    className="font-semibold text-sm"
                    style={{
                      fontFamily: "var(--font-josefin-sans)",
                      fontSize: "25px",
                    }}
                  >
                    Notifications
                  </h3>
                </div>

                {/* Liste des notifications */}
                <div className="max-h-96 overflow-y-auto">
                  {sampleNotifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`px-4 py-3 cursor-pointer transition-colors hover:bg-background ${
                        !notification.read ? "border-l-4 border-blue-500" : ""
                      }`}
                      style={{
                        borderBottom:
                          index < sampleNotifications.length - 1
                            ? "1px solid var(--bg-border)"
                            : "none",
                      }}
                    >
                      <div
                        className="flex items-start gap-3"
                        style={{ padding: "8px" }}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            notification.read ? "bg-gray-300" : "bg-blue-500"
                          }`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4
                              className={`text-sm font-medium truncate ${
                                !notification.read ? "font-semibold" : ""
                              }`}
                            >
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="my-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                  style={{ margin: "10px 0" }}
                ></div>
                {/* Footer du panneau */}
                <div
                  className="px-4 py-2 border-t text-center w-full"
                  style={{
                    borderColor: "var(--bg-border)",
                    margin: "5px auto",
                  }}
                >
                  <OptiAcadButton>Voir toutes les notifications</OptiAcadButton>
                </div>
              </div>
            )}
          </div>

          {/* Paramètres */}
          <div
            className="relative border border-gray-300 rounded-full p-1 hover:border-blue-300 transition-colors cursor-pointer group"
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--card)",
            }}
          >
            <Settings className="w-6 h-6 text-gray-600 cursor-pointer transition-colors group-hover:text-blue-600 group-hover:rotate-45" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderHome;
