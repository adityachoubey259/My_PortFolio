import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { EngineeringPlayground } from "@/components/playground/EngineeringPlayground";

export const metadata = {
  title: "Engineering Playground | Aditya Choubey",
  description: "Interactive portfolio demonstrations for inspection workflows, RS485 concepts and automation routing.",
};

export default function PlaygroundPage() {
  return (
    <>
      <Navigation />
      <main className="route-shell">
        <section className="route-hero">
          <span className="eyebrow">Engineering Playground</span>
          <h1>Working demos for software, automation and industrial thinking.</h1>
          <p>
            These demonstrations are built to explain concepts honestly. They run in the browser and do not claim live
            plant connectivity, production workflow execution or private integrations.
          </p>
        </section>
        <EngineeringPlayground />
      </main>
      <Footer />
    </>
  );
}
