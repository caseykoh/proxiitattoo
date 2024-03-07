import "./StorySection.css";

const StorySection = () => {
  return (
    <>
      <section className="story-section">
        <h3>What if this was your clone's dream?</h3>
        <p>
          When you wake up, do you remember where you were?
          <br />
          When you sleep, do you know where you go?
          <br />
          When you sleep, do you know where you go?
        </p>
      </section>
      <section className="photobook-entry">
        <img src="https://i.pinimg.com/564x/f1/3d/e1/f13de1066feb82251685071ba97a0cd6.jpg" />
        <div className="photobook-entry-description">
          <table>
            <tbody>
              <tr>
                <td></td>
                <td>Created with graphite on paper.</td>
              </tr>
              <tr>
                <td>[Intro]</td>
                <td>"Where the Wind Blows"</td>
              </tr>
              <tr>
                <td>[Chorus]</td>
                <td>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquid similique quam blanditiis corrupti mollitia commodi
                  quo minima velit sequi, sunt fugit corporis non neque aliquam,
                  earum rem illo, debitis cum.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default StorySection;
