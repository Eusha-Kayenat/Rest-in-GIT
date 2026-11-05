import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomeBackdrop } from "@/components/home/HomeBackdrop";
import { RepoForm } from "@/components/home/RepoForm";
import "./styles/home.css";

export default function Home() {
  return (
    <div className="page-home">
      <main className="site-shell">
        <HomeBackdrop />
        <Header variant="home" />
        <section className="hero" aria-labelledby="hero-title">
          <div className="eyebrow">
            <span />
            Here lies your abandoned code
            <span />
          </div>
          <h1 id="hero-title">
            Every repo has
            <em>last words.</em>
          </h1>
          <p className="intro">
            Give forgotten code the farewell it deserves.
            <br />
            We&apos;ll read its history and carve the perfect epitaph.
          </p>
          <RepoForm />
        </section>
        <Footer variant="home" />
      </main>
    </div>
  );
}
