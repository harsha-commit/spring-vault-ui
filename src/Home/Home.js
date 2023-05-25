import React from "react";
import "./Home.css";
import bird from "../images/bird.png";
import account from "../images/account.png";
import transfer from "../images/transfer.png";
import secure from "../images/secure.png";
import support from "../images/support.png";

const Home = () => {
  return (
    <div className="landing-page">
      <main>
        <section
          style={{
            paddingTop: "10%",
            paddingBottom: "17%",
          }}
        >
          <div className="content">
            <div className="text">
              <h1>Welcome to Spring Vault Bank 🏦❤️</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus commodo velit sed iaculis consequat. Duis posuere
                metus a nunc pellentesque, in commodo odio lobortis.
              </p>
            </div>
            <div className="image">
              <img src={bird} alt="Right" />
            </div>
          </div>
        </section>
        <hr style={{ marginBottom: "60px" }} />
        <section>
          <div className="content">
            <div className="image">
              <h1>Open an Account Today</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus commodo velit sed iaculis consequat. Duis posuere
                metus a nunc pellentesque, in commodo odio lobortis. Praesent
                sollicitudin fringilla risus ac fermentum.
              </p>
            </div>
            <div className="text">
              <img src={account} alt="Left" />
            </div>
          </div>
        </section>
        <section>
          <div className="content">
            <div className="text">
              <h1>Secure and Convenient Banking</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus commodo velit sed iaculis consequat. Duis posuere
                metus a nunc pellentesque, in commodo odio lobortis. Praesent
                sollicitudin fringilla risus ac fermentum.
              </p>
            </div>
            <div className="image">
              <img src={secure} alt="Right" />
            </div>
          </div>
        </section>
        <section>
          <div className="content">
            <div className="image">
              <h1>Fund Transfers</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus commodo velit sed iaculis consequat. Duis posuere
                metus a nunc pellentesque, in commodo odio lobortis. Praesent
                sollicitudin fringilla risus ac fermentum.
              </p>
            </div>
            <div className="text">
              <img src={transfer} alt="Left" />
            </div>
          </div>
        </section>
        <section>
          <div className="content">
            <div className="text">
              <h1>Customer Support</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus commodo velit sed iaculis consequat. Duis posuere
                metus a nunc pellentesque, in commodo odio lobortis. Praesent
                sollicitudin fringilla risus ac fermentum.
              </p>
            </div>
            <div className="image">
              <img src={support} alt="Right" />
            </div>
          </div>
        </section>
      </main>
      <footer>
        <p>
          &copy; {new Date().getFullYear()} Spring Vault Bank. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
