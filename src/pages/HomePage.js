import Navlinks from '../components/Navlinks';
import Footer from '../components/Footer';
import Title from '../components/Title';
import planeimage from '../assets/plane.png';

function HomePage() {
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
                        <b><p className="slogan">The <span className="cloudy slogan text-primary">sky</span> is the limit!</p></b>
                        <a className="btn btn-outline-primary rounded-pill mx-auto" href="#about">Learn More</a>
                    </div>
                </div>
            </div>
            <img className='plane-img' src={planeimage} alt="Front view of a sleek modern jet with its landing gear deployed and boarding door open." />
        </div>

        <section id='about' className="padded mt-5">
            <Title title={"About"} />
            <p style={{fontSize: "24px"}}>Based out of the Rockcliffe Airport found in Ottawa's east end, iFLY's mission is to provide you with unparalled flexibility when it comes to booking your dream outdoor adventure. The freedom of flying allows you to travel to new destinations you never thought possible or to visit your favorites in style! We'll connect you with best in class float plane pilots to provide the safest journey possible. Whether you're looking for your next big fishing trip or want are planning your next remote camping trip and anything in between, iFLY has you covered. All you have to do is head to the booking page enter your destination and amount of gear you plan on bringing and you'll be given a quoted price on the spot. Once you're satisfied we'll have our pilots review your trip and connect with you in order to finalize the details and that's it! Hopefully we'll see you in the air soon!</p>
        </section>

        <Footer />
        </div>
    );
}

export default HomePage