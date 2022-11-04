export const Logo = (main, section) => {
  main.innerHTML = "";
  main.innerHTML = `
    <section id="logos">
    <div class="heading">
      <h2>Logo</h2>
    </div>
    <div class="body">
      <p>
        NoSms is the name of our platform and it stands for Noroff Social Media Site.
        The color in brand logo is Bullet Shell is of a high brightness and a medium saturation, 
        reflect the very popular, modern yet elegant style of international boutique hotels. 
        A symbol of belonging is our strong wordmark and our most recognizable brand assets.
      </p>
      <p>
        The preferred approach is to use the text logo by itself, unlocked
        from the wordmark. This allows flexibility to present the NoSms with
        greater prominence while maintaining a considered, open and modern
        presentation.
      </p>
    </div>
  </section>
  <section class="mainInfo" >

    <div class="botique">
        <h3>Word Mark</h3>
        <div class="botiqueColors">
          <div class="color2" style="background:#4F21CF;">Purple Heart <br /> <br /> #4F21CF</div>
          <div class="color1" style="background:#ffffff;">White <br /> <br /> #ffffff</div>
        </div>
        <div class="botiqueLogo">
          <img src="./../../assets/icons/logo1.png" alt="Botique" />
        </div>
        
        <div class="botiqueLogo" style="background:#4F21CF;">
          <img src="./../../assets/icons/logo.png" alt="Botique" />
        </div>
        <br />
        <h3>Word Mark with tagline</h3>
        <div class="botiqueColors">
          <div class="color2" style="background:#4F21CF;">Purple Heart <br /> <br /> #4F21CF</div>
          <div class="color1" style="background:#ffffff;">White <br /> <br /> #ffffff</div>
        </div>
        <div class="botiqueLogo">
          <img src="./../../assets/icons/logo1_text.png" alt="Botique" />
        </div>
     
        <div class="botiqueLogo" style="background:#4F21CF;">
          <img src="./../../assets/icons/logo_text.png" alt="Botique" />
        </div>
     
    </div>
  </section>
    `;
};
