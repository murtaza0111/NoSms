import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { checkToken } from "../settings/utils/CheckSession";

const About = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "/about")) {
      }
    })();
  }, [navigate]);
  return (
    <>
      <Nav isActive={"about"} />
      <Header isActive={"about"} />
      <main className="about">
        <section className="about__main">
          <article className="about__main__info">
            <p>
              NoSms stands for Noroff Social media Site. It's an online social
              media platform for users to register themselves and interact with
              other studednts from Noroff.
            </p>
            <p>
              Register yourself through signup form and then signin to your
              account and create posts, send requests and receive requests from
              other users.
            </p>
            <p>
              You can manage your acccount through admin panel.
            </p>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
