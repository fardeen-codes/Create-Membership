import { useEffect, useRef } from "react";

export default function HubspotForm() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.async = true;

    script.onload = () => {
      if ((window as any).hbspt) {
        (window as any).hbspt.forms.create({
          portalId: "23459474",
          formId: "449363fe-55d3-4798-af0b-84e39b3df521",
          region: "na2",
          target: "#hubspotForm"
        });
      }
    };

    document.body.appendChild(script);
  }, []);

  return <div id="hubspotForm" ref={formRef}></div>;
}