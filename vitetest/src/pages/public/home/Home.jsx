import React from "react";
import heroImage from "../../../assets/imgs/img.jpg";
import "./Home.css";

const Home = () => {
  return (
    <main>
      {/* Hero */}
      <section className="home-hero-container section-full">
        <div className="home-hero-text">
          <h1>
            Conectando <span className="home-highlight">corações</span> aos{" "}
            <span className="home-highlight">hospitais</span>
          </h1>
          <p>Voluntarie-se e transforme vidas com a CompCare</p>
          <a href="/vagas" className="home-hero-button">
            Ver vagas disponíveis
          </a>
          <p className="home-hero-sub">
            Acreditamos que pequenos gestos geram grandes impactos. Seja o elo
            entre quem precisa e quem quer ajudar.
          </p>
        </div>
        <div className="home-hero-image">
          <img src={heroImage} alt="CompCare apresentação" />
        </div>
      </section>

      {/* Benefícios */}
      {/* Benefícios */}
      <section className="home-benefits section-full">
        <h2>Por que ser voluntário pela CompCare?</h2>
        <div className="home-benefits-list vertical">
          <div className="home-benefit">
            <i className="fa-solid fa-hand-holding-medical"></i>
            <p>Contribua com tarefas que fazem a diferença</p>
          </div>
          <div className="home-benefit">
            <i className="fa-solid fa-people-arrows"></i>
            <p>Crie laços com quem compartilha do seu propósito</p>
          </div>
          <div className="home-benefit">
            <i className="fa-solid fa-star"></i>
            <p>Seja reconhecido pelo impacto gerado</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
