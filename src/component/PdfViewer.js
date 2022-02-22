import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import ViewInvoice from "../moduls/ViewInvoice";

export function PdfViewer({ fileUrl, height = "88vh" }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js">
      <div
        style={{
          height: "750px",
          width: "900px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Viewer
          fileUrl={`/view`}
          plugins={[defaultLayoutPluginInstance]}
        ></Viewer>
      </div>
    </Worker>
  );
}
