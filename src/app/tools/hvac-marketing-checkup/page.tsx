import { permanentRedirect } from "next/navigation";

export default function LegacyCheckupPage() {
  permanentRedirect("/checkup");
}
