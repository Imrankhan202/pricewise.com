import React, { useRef } from "react";
import "./Testimonial.css";
import next_icon from "../../assets/next-icon.png";
import back_icon from "../../assets/back-icon.png";
import user_2 from "../../assets/user-2.png";
import user_3 from "../../assets/user-3.png";
import user_4 from "../../assets/user-4.jpg";

const Testimonial = () => {
  const slider = useRef();
  let tx = 0;

  const slideForward = () => {
    if (tx > -50) {
      tx -= 34;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };
  const slideBackward = () => {
    if (tx < 0) {
      tx += 34;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  return (
    <div className="testimonials" id="testimonials">
      <img className="next-btn" src={next_icon} alt="" onClick={slideForward} />
      <img
        className="back-btn"
        src={back_icon}
        alt=""
        onClick={slideBackward}
      />
      <div className="slider">
        <ul ref={slider}>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_2} alt="" />
                <div>
                  <h3>Imran Khan</h3>
                  <span>NUML, Islamabad</span>
                </div>
              </div>
              <p>
                Imran Khan brings creativity and precision to the team with his
                expertise in UI/UX design and frontend development. He
                specializes in crafting visually appealing interfaces that offer
                smooth, intuitive user experiences. His attention to detail
                ensures that every design element aligns with user expectations
                and modern design trends.
              </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_3} alt="" />
                <div>
                  <h3>Naqib Ullah</h3>
                  <span>NUML, Islamabad</span>
                </div>
              </div>
              <p>
                Naqib Ullah adds versatility to the team with strong skills in
                UI/UX design, frontend development, and Python programming. He
                combines a designer’s eye with a developer’s logic, enabling him
                to create user-friendly interfaces backed by functional,
                efficient code. His knowledge of Python also allows him to
                contribute to backend logic and data handling when needed.
              </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_4} alt="" />
                <div>
                  <h3>Kamran Ullah</h3>
                  <span>NUML, Islamabad</span>
                </div>
              </div>
              <p>
                Kamran Ullah is a full-stack developer proficient in the MERN
                stack, with additional expertise in Java and SQL. His strength
                lies in building scalable, high-performance web applications
                from the ground up. Kamran ensures that both the frontend and
                backend systems work seamlessly together while maintaining clean
                code and robust database management.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Testimonial;
