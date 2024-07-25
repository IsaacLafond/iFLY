import LanguageSelector from "./LanguageSelector";
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";

function Navlinks() {
    const [t, ] = useTranslation("global")

    return (
      <nav className="navbar">
        <div className="d-flex align-items-center">
          <LanguageSelector />
          <Link className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover ms-5" to="/destinations">{t("navlinks.popular")}</Link>
          <Link className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover mx-5" to="/reviews">{t("navlinks.reviews")}</Link>
          <Link className="btn btn-primary d-flex align-items-center rounded-pill" to="/book">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-airplane-fill" viewBox="0 0 16 16" role='image' aria-label='Aiplane Icon'>
                  <title>Aiplane Icon</title>
                  <desc>Filled outline of an airplane as seen from above</desc>
                  <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849"/>
              </svg>
              <span className="ms-2">{t("navlinks.plan")}</span>
          </Link>
        </div>
      </nav>
    );
}

export default Navlinks;