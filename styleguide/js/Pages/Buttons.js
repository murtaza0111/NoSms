export const Buttons = (main, section) => {
  main.innerHTML = "";
  main.innerHTML = `
    <section id="coreElements">
    <div class="heading">
      <h2>Buttons</h2>
    </div>
    <div class="body">
    <p>
    NoSms stands for Noroff Social media Site. Its an online social platform 
    for users to register them self and intract with each other. Add posts 
    and see others posts and also share their point of view by liking feature.
    The users can also send and receive friends requests.
  </p>
  <p>
    The preferred approach is to use the text logo by itself, unlocked
    from the wordmark. This allows flexibility to present the Botique with
    greater prominence while maintaining a considered, open and modern
    presentation.
  </p>
    </div>
  </section>
  <section class="mainInfo">
    <div class="botique">
      <h3>Primary</h3>
      <div class="botiqueGrid">
        <img src="./../../assets/images/primary.png" alt="primary"  column="400px" />
      </div>
      <h3>Secondary</h3>
      <div class="botiqueGrid">
        <img src="./../../assets/images/secondary.png" alt="secondary"  column="400px" />
      </div>
      
      <h3>Other</h3>
      <div class="botiqueGrid">
        <img src="./../../assets/images/others.png" alt="others"  column="400px" />
      </div>
    </div>
  </section>
  
    `;
};
