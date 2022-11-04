export const FormElements = (main, section) => {
  main.innerHTML = "";
  main.innerHTML = `
    <section id="formElements">
    <div class="heading">
      <h2>Form Element</h2>
    </div>
    <div class="body">
      <p>
        NoSms stands for Noroff Social media Site. Its an online social platform 
        for users to register them self and intract with each other.
      </p>
      <p>
        Multiple forms are included in the site. Following are the type of design that must be followed while designing the forms.
      </p>
   
    </div>
  </section>
  <section class="mainInfo">
    <div class="botique">
      <h3>Input Form Field</h3>
      <div class="botiqueForm">
        <input type="text" placeholder="Text here.">
        <code>
        <pre>
          input {
            margin: 1rem;
            font-size: 1.8rem;
            font-family: SourceSansPro;
            color: #231f20;
            border: 0.1rem solid #000000;
            padding: 1rem 2rem;
            border-radius: 3rem;
          }
        </pre>
        </code>
      </div>
     
    </div>

    <div class="botique">
    <h3>Text Area</h3>
    <div class="botiqueForm">
      <textarea>Text here. </textarea>
      <code>
      <pre>
        textarea {
            margin: 1rem;
            font-size: 1.8rem;
            font-family: SourceSansPro;
            color: #231f20;
            border: 0.1rem solid #000000;
            border-radius: 3rem;
            padding: 2rem 2rem;
            height: 8rem;
        }        
      </pre>
      </code>
    </div>
  </div>
  </section>
    `;
};
