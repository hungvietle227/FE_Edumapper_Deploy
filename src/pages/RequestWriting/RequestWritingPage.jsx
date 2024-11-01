import Navbar from "../../components/layouts/Navbar/Navbar";
import Sidebar from "../../components/layouts/Sidebar/Sidebar";
import ViewRequestWriting from "../../components/partial/RequestWriting/ViewRequestWriting";
export default function RequestWritingPage() {
  return (
    <div style={{ height: "90vh", position: "relative", top: "0" }}>
      <div
        style={{
          position: "fixed",
          top: "0",
          height: "100%",
          bottom: "0",
          width: "260px",
          left: "0",
          zIndex: "1030",
          borderRight: "1px solid #ddd",
          backgroundColor: "#212120",
        }}
      >
        <Sidebar />
      </div>
      <div
        className="fixed top-0 left-64 z-10"
        style={{ width: "calc(100% - 260px)", float: "right" }}
      >
        <Navbar />
      </div>
      <div
        style={{
          overflowAnchor: "none",
          float: "right",
          backgroundColor: "#f4f3ef",
          position: "relative",
          width: "calc(100% - 260px)",
          height: "100%",
          maxHeight: "100%",
          marginTop: "96px",
        }}
        className="p-4 overflow-y-auto"
      >
        <ViewRequestWriting />
      </div>
    </div>
  );
}
