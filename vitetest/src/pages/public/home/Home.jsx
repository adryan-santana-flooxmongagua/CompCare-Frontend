import React from 'react';
import heroImage from '../../../assets/imgs/img.jpg';
import './Home.css';

const Home = () => {
  return (
    <main>
      {/* Hero */}
      <section className="home-hero-container">
        <div className="home-hero-text">
          <h1>Conectando <span className="home-highlight">corações</span> aos <span className="home-highlight">hospitais</span></h1>
          <p>Voluntarie-se e transforme vidas com a CompCare</p>
          <a href="/vagas" className="home-hero-button">Ver vagas disponíveis</a>
          <p className="home-hero-sub">
            Acreditamos que pequenos gestos geram grandes impactos. Seja o elo entre quem precisa e quem quer ajudar.
          </p>
        </div>
        <div className="home-hero-image">
          <img src={heroImage} alt="CompCare apresentação" />
        </div>
      </section>

      {/* Benefícios */}
      <section className="home-benefits">
        <h2>Por que ser voluntário pela CompCare?</h2>
        <div className="home-benefits-list">
          <div className="home-benefit">
            <i className="fa-solid fa-heart-pulse"></i>
            <p>Ajude hospitais com real necessidade</p>
          </div>
          <div className="home-benefit">
            <i className="fa-solid fa-people-group"></i>
            <p>Conecte-se com outras pessoas engajadas</p>
          </div>
          <div className="home-benefit">
            <i className="fa-solid fa-award"></i>
            <p>Ganhe reconhecimento por seu impacto</p>
          </div>
        </div>
      </section>

      {/* Chamada para ação */}
      <section className="home-cta">
        <h2>Quer fazer parte dessa mudança?</h2>
        <p>Junte-se à CompCare e ajude a construir um futuro mais humano e solidário para todos.</p>
        <a href="/vagas" className="home-cta-button">Quero ajudar agora</a>
      </section>
    </main>
  );
};

export default Home;
