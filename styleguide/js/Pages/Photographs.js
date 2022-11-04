export const Photographs = (main, section) => {
  main.innerHTML = "";
  main.innerHTML = `
    <section id="photographs">
    <div class="heading">
      <h2>photographs</h2>
    </div>
    <div class="body">
      <p>
      NoSms stands for Noroff Social media Site. Its an online social platform 
      for users to register them self and intract with each other.
      </p>
      <p>
      Images are the one of the best ways to express so much without having to
      write lines and line of the story or an event. Posts, Caraousel, and avatar
      includes images of different sizes and effects used on them are shown below. 
      </p>
    </div>
  </section>
  <section class="mainInfo">
    <div class="botique">
      <h3>Default</h3>
      <div class="botiqueGrid">
        <img src="./../../assets/images/default.png" alt="Botique"  column="400px" />
      </div>
      <h3>Hover</h3>
      <div class="botiqueGrid">
        <img src="./../../assets/images/hover.png" alt="Botique"  column="400px" />
      </div>
      
    </div>
  </section>
    `;
};
