import { Shell } from "@/components/app/Shell";
import { PageHeader } from "@/components/app/Premium";
import { Rs485Studio } from "@/components/playground/Rs485Studio";

export const metadata = {
  title: "RS485 Communication Studio | ADITYA OS",
  description: "Educational RS485 and Modbus RTU-style communication simulation.",
};

export default function Rs485Page() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Playground / RS485"
        title="RS485 Communication Studio"
        description="A simulation that separates RS485 physical communication from illustrative Modbus RTU-style framing."
      />
      <Rs485Studio />
    </Shell>
  );
}
