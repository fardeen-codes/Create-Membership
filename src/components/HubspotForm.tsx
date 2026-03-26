// import { useEffect, useRef } from "react";

// export default function HubspotForm() {
//   const formRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "//js.hsforms.net/forms/embed/v2.js";
//     script.async = true;

//     script.onload = () => {
//       if ((window as any).hbspt) {
//         (window as any).hbspt.forms.create({
//           portalId: "23459474",
//           formId: "0e8f138e-5b4d-4fa5-a0e4-4d949c02fe5f",
//           region: "na2",
//           target: "#hubspotForm"
//         });
//       }
//     };

//     document.body.appendChild(script);
//   }, []);

//   return <div id="hubspotForm" ref={formRef}></div>;
// }

import { useEffect } from "react";

interface HubspotFormProps {
  onSubmit?: () => void;
}

export default function HubspotForm({ onSubmit }: HubspotFormProps) {
  useEffect(() => {
    if ((window as any).hbspt) {
      (window as any).hbspt.forms.create({
        portalId: "23459474",
        formId: "0e8f138e-5b4d-4fa5-a0e4-4d949c02fe5f",
        region: "na2",
        target: "#hubspotForm",
        onFormSubmit: onSubmit
      });
    }
  }, [onSubmit]);

  return <div id="hubspotForm"></div>;
}