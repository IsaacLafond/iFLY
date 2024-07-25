import Navlinks from '../components/Navlinks';
import Footer from '../components/Footer';
import Title from '../components/Title';
import planeimage from '../assets/plane.png';
import { useTranslation } from 'react-i18next';

function HomePage() {
    const [t, ] = useTranslation("global")

    return (
        <div className="wavetop">
            <div className="padded vh-100" style={{paddingTop: "50px"}}>
            <div className="container-fluid d-flex flex-row">
                <h1 className="logo me-auto">iFLY</h1>
                <div>
                    <div className="d-flex justify-content-end">
                        <Navlinks />
                    </div>
                    <div className="d-flex flex-column mt-3">
                        <b><p className="slogan">{t("home.slogan1")}<span className="cloudy slogan text-primary">{t("home.slogan-cloud")}</span>{t("home.slogan2")}</p></b>
                        <a className="btn btn-outline-primary rounded-pill mx-auto" href="#about">{t("home.learn-more")}</a>
                    </div>
                </div>
            </div>
            <img className='plane-img' src={planeimage} alt="Front view of a sleek modern jet with its landing gear deployed and boarding door open." />
        </div>

        <section id='about' className="padded mt-5">
            <Title title={t("home.about")} />
            <p style={{fontSize: "24px"}}>{t("home.description")}</p>
        </section>

        <Footer />
        </div>
    );
}

export default HomePage