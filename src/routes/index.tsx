import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About, Contact, Footer, Process, Services, Toolkit, Work } from "@/components/Sections";

const title = "Pritesh Lad — Freelance Software Engineer & Web Developer";
const description =
  "Freelance software engineer in Pune, India. I build portfolio websites, business websites, landing pages and full-stack platforms for founders and small businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Work />
        <About />
        <Services />
        <Process />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
