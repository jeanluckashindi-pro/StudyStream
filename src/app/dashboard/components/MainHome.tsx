import React from "react";
import OptiAcadButton from "@/components/OptiAcadButton";
import MegaMenu from "./Home/MegaMenu";
const MainHome = () => {
  return (
    <>
      <div className="">
        <div className="Top-main flex w-full">
          <div className="left-side block  w-full">
            <div
              className="Top-child flex w-full justify-around items-center"
              style={{ marginTop: "10px" }}
            >
              <div className="flex items-center" style={{ gap: "10px" }}>
                <h1>Text</h1>
                <button
                  style={{
                    fontFamily: "var(--font-josefin-sans), sans-serif",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    position: "relative",
                    padding: "8px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    borderRadius: "4px",
                    border: "1px solid var(--card)",
                  }}
                  className=" hover:bg-card"
                >
                  3 asset
                </button>
                <button
                  style={{
                    fontFamily: "var(--font-josefin-sans), sans-serif",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    position: "relative",
                    padding: "8px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    borderRadius: "4px",
                    border: "1px solid var(--card)",
                  }}
                  className=" hover:bg-card"
                >
                  3 asset
                </button>
                <button
                  style={{
                    fontFamily: "var(--font-josefin-sans), sans-serif",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    position: "relative",
                    padding: "8px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    borderRadius: "4px",
                    border: "1px solid var(--card)",
                  }}
                  className=" hover:bg-card"
                >
                  3 asset
                </button>
              </div>
              <div className="Right-side">
                <MegaMenu />
              </div>
            </div>
          </div>
        </div>
        <div
          className="Bottom-main flex w-full"
          style={{ margin: "10px", gap: "10px" }}
        >
          <div className="Bottom-child" style={{ width: "70%" }}>
            <div className="dri grid grid-flow-col auto-cols-auto gap-2 relative">
              <div
                className="bg-card p-4 rounded-2xl"
                style={{
                  height: "400px",
                  background: "var(--background-2)",
                  padding: "10px",
                }}
              >
                <div className="header flex justify-between items-center">
                  <div className="flex justify-start gap-2 items-center">
                    <div
                      style={{ width: "60px", height: "60px" }}
                      className="flex items-center justify-center cursor-pointer rounded-2xl bg-card"
                    >
                      icone
                    </div>
                    <div>
                      <h1 className="bold">Title</h1>
                      <span className="text-sm opacity-55">Description</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div
                      style={{ width: "60px", height: "60px" }}
                      className="flex items-center justify-center cursor-pointer rounded-full bg-card"
                    >
                      icone
                    </div>
                  </div>
                </div>
                <div
                  className="main-class w-full h-full flex-col justify-start items-center flex"
                  style={{ marginTop: "20px" }}
                >
                  <span
                    className="text-sm opacity-55"
                    style={{ marginBottom: "10px" }}
                  >
                    Description
                  </span>
                  <p
                    className="Number"
                    style={{
                      fontFamily: "var(--font-josefin-sans)",
                      fontSize: "50px",
                    }}
                  >
                    268%
                  </p>
                  <OptiAcadButton width="full">
                    les personnel Presnet
                  </OptiAcadButton>
                </div>
                <div
                  className="Footer-class w-full h-15"
                  style={{
                    borderTop: "2px dashed var(--background)",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                  }}
                ></div>
              </div>
              <div
                className="bg-card p-4 rounded-2xl"
                style={{
                  height: "400px",
                  background: "var(--background-2)",
                  padding: "10px",
                }}
              >
                <div className="header flex justify-between items-center">
                  <div className="flex justify-start gap-2 items-center">
                    <div
                      style={{ width: "60px", height: "60px" }}
                      className="flex items-center justify-center cursor-pointer rounded-2xl bg-card"
                    >
                      icone
                    </div>
                    <div>
                      <h1 className="bold">Title</h1>
                      <span className="text-sm opacity-55">Description</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div
                      style={{ width: "60px", height: "60px" }}
                      className="flex items-center justify-center cursor-pointer rounded-full bg-card"
                    >
                      icone
                    </div>
                  </div>
                </div>
                <div
                  className="main-class w-full h-full flex-col justify-start items-center flex"
                  style={{ marginTop: "20px" }}
                >
                  <span
                    className="text-sm opacity-55"
                    style={{ marginBottom: "10px" }}
                  >
                    Description
                  </span>
                  <p
                    className="Number"
                    style={{
                      fontFamily: "var(--font-josefin-sans)",
                      fontSize: "50px",
                    }}
                  >
                    268%
                  </p>
                  <OptiAcadButton width="full">
                    Toute le staff administratiqf
                  </OptiAcadButton>
                </div>
                <div
                  className="Footer-class w-full h-15"
                  style={{
                    borderTop: "2px dashed var(--background)",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                  }}
                ></div>
              </div>
              <div
                className="bg-card p-4 rounded-2xl"
                style={{
                  height: "400px",
                  background: "var(--background-2)",
                  padding: "10px",
                }}
              >
                <div className="header flex justify-between items-center">
                  <div className="flex justify-start gap-2 items-center">
                    <div
                      style={{ width: "60px", height: "60px" }}
                      className="flex items-center justify-center cursor-pointer rounded-2xl bg-card"
                    >
                      icone
                    </div>
                    <div>
                      <h1 className="bold">Title</h1>
                      <span className="text-sm opacity-55">Description</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div
                      style={{ width: "60px", height: "60px" }}
                      className="flex items-center justify-center cursor-pointer rounded-full bg-card"
                    >
                      icone
                    </div>
                  </div>
                </div>
                <div
                  className="main-class w-full h-full flex-col justify-start items-center flex"
                  style={{ marginTop: "20px" }}
                >
                  <span
                    className="text-sm opacity-55"
                    style={{ marginBottom: "10px" }}
                  >
                    Description
                  </span>
                  <p
                    className="Number"
                    style={{
                      fontFamily: "var(--font-josefin-sans)",
                      fontSize: "50px",
                    }}
                  >
                    268%
                  </p>
                  <OptiAcadButton width="full">Personle Absenes</OptiAcadButton>
                </div>
                <div
                  className="Footer-class w-full h-15"
                  style={{
                    borderTop: "2px dashed var(--background)",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div style={{ width: "30%" }}>
            <div
              className="bg-background p-4 rounded-2xl"
              style={{ height: "400px" }}
            >
              1
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainHome;
