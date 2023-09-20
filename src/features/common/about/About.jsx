import "./about.css";
function About() {
  return (
    <div className="about">
      <div className="about-container">
        <h1>Welcome to the TacticalApp v1.0!!!</h1>
        <p>
          Pick a <span>team</span> from the <span>'Select Team' menu</span>. The
          following options only apply to the team selected here.
        </p>
        <p>
          Choose the desired <span>formation</span> for the team.
        </p>
        <p>
          Select a <span>color</span> team from the menu by clicking on it.
        </p>
        <p>
          To change a <span>player's</span> name or number,{" "}
          <span>double-click</span> on it. While it <span>blinks</span> you will
          be able to <span>change it</span>. Once you're finished, press{" "}
          <span>Enter</span>.
        </p>

        <small>
          The present project scope is to practice a React-Redux-Vite
          application.
        </small>
      </div>
    </div>
  );
}

export default About;
