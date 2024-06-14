import { NavLink } from "react-router-dom";
import "./TourSection.css";

function TourSection() {
  return (
    <>
      <section className="tour-section">
        <div className="tour-table-container">
          <div className="tab-header">
            <p>proxii tour</p>
            <div className="waitlist-button">
              <NavLink
                to="https://form.jotform.com/233556816876067"
                target="_blank"
                className="waitlist-link"
              >
                join waitlist
              </NavLink>
            </div>
          </div>
          <div className="table-div">
            <table className="tour-table">
              {/* <thead>
              <tr>
                <th>CITY</th>
                <th>DATES</th>
              </tr>
            </thead> */}
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td>____</td>
                </tr>
                <tr>
                  <td>Toronto</td>
                  <td>
                    <a href="https://www.instagram.com/000000000000_studio/">
                      @0Studio
                    </a>
                  </td>
                  <td>03-04/2024</td>
                </tr>
                <tr>
                  <td>Vancouver</td>
                  <td>TBD</td>
                  <td>05/18-19/2024</td>
                </tr>
                <tr>
                  <td>Tokyo</td>
                  <td>TBD</td>
                  <td>05/2024</td>
                </tr>
                <tr>
                  <td>Montreal</td>
                  <td>?</td>
                  <td>?</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default TourSection;
