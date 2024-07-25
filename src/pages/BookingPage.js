import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps"
import HintButton from "../components/HintButton"
import LanguageSelector from "../components/LanguageSelector";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function BookingPage() {
    const [t, ] = useTranslation("global")

    const origin = {lat: 45.462817, lng: -75.642569}
    const [estimate, setEstimate] = useState(0)
    const [destination, setDestination] = useState(null)

    function handleDstInput(e) {
        if (e.target.validity.valid) {
            let data = e.target.value.split(",")
            setDestination({lat: parseFloat(data[0]), lng: parseFloat(data[1])})
        }
    }

    function calculateEstimate() {
        const dstInput = document.getElementById('destination')
        const psgInput = document.getElementById('passengernum')
        const grInput = document.getElementById('weightinput')
        if (destination) {
            dstInput.value = destination ? `${destination.lat}, ${destination.lng}` : ""
            let distance = getDistanceFromLatLonInKm(origin.lat, origin.lng, destination.lat, destination.lng)
            let passengerFee = psgInput.value ? parseInt(psgInput.value) * 15 : 0
            let gearFee = 0
            if (grInput.value) {
                if (parseFloat(grInput.value) > 50) {
                    gearFee = 55
                } else {
                    gearFee = 25
                }
            }
            setEstimate(((distance * 2.5) + passengerFee + gearFee).toFixed(2))
        }
    }

    // Init the tooltips on render
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipTriggerListCopy = [...tooltipTriggerList]
        tooltipTriggerListCopy.map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl))

    }, [])

    useEffect(() => {
        calculateEstimate()
    }, [destination])

    // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }

    return (
        <div>
            <div className="d-flex">
                <div className="d-flex flex-column vh-100 overflow-scroll px-4" style={{minWidth:"350px" ,width:"35%", maxWidth:"500px"}}>
                    <div className="navbar bg-white position-sticky top-0 z-3">
                        <Link className="icon-link icon-link-hover" style={{"--bs-icon-link-transform": "translate3d(-.25rem, 0, 0)"}} to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                            </svg>
                            {t("booking.return")}
                        </Link>
                        <LanguageSelector />
                    </div>
                    <div className="mt-1">
                        <h3>{t("booking.title")}</h3>
                        <hr style={{
                            width:"65px",
                            borderTop: "5px solid rgb(33, 37, 41)",
                            color: "rgb(33, 37, 41)",
                            opacity: "1"
                        }}/>
                    </div>
                    <form className="d-flex flex-column" onSubmit={(e) => {
                        e.preventDefault()
                        alert(t("booking.alert"))
                        setEstimate(0)
                        document.getElementById("return").disabled = false
                        e.target.reset()
                    }}>
                        <label className="form-label" htmlFor="contact">{t("booking.form.contact.label")}</label>
                        <input className="form-control mb-1" type="text" id="contact" placeholder={t("booking.form.contact.placeholder")} required />
                        <label className="form-label" htmlFor="email">{t("booking.form.email.label")}</label>
                        <input type="email" id="email" className="form-control" placeholder={t("booking.form.email.placeholder")} required />
                        <hr />
                        <label className="form-label" htmlFor="destination">{t("booking.form.destination.label")}</label>
                        <div className="d-flex mb-1">
                            <input type="text" className="form-control" id="destination" onInput={handleDstInput} placeholder={t("booking.form.destination.placeholder")} pattern="^(-?([1-8]?\d(\.\d+)?|90(\.0+)?)),\s*(-?((1[0-7]\d(\.\d+)?|180(\.0+)?|([1-9]?\d(\.\d+)?))))$" required />
                            <HintButton placement="right" content={t("booking.form.destination.tooltip")} />
                        </div>
                        <label className="form-label" htmlFor="passengernum">{t("booking.form.pass-num.label")}</label>
                        <div className="d-flex mb-1">
                            <input type="number" id="passengernum" onInput={calculateEstimate} className="form-control" min={1} max={5} required />
                            <HintButton placement="right" content={t("booking.form.pass-num.tooltip")} />
                        </div>
                        <label className="form-label" htmlFor="weightinput">{t("booking.form.gear.label")}</label>
                        <div className="d-flex">
                            <div className="input-group">
                                <input type="number" id="weightinput" onInput={calculateEstimate} className="form-control" min={0} max={100} required />
                                <span className="input-group-text">lbs</span>
                            </div>
                            <HintButton placement="right" content={t("booking.form.gear.tooltip")} />
                        </div>
                        <hr />
                        <div className="d-flex justify-content-evenly">
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="radio1" name="triptype" onClick={() => document.getElementById("return").disabled = true} required/>
                                <label className="form-check-label" htmlFor="radio1">{t("booking.form.one-way")}</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="radio2" name="triptype" onClick={() => document.getElementById("return").disabled = false} />
                                <label className="form-check-label" htmlFor="radio2">{t("booking.form.round-trip")}</label>
                            </div>
                        </div>
                        <label className="form-label" htmlFor="depart">{t("booking.form.depart")}</label>
                        <input className="form-control mb-1" type="date" name="" id="depart" required />
                        <label className="form-label" htmlFor="return">{t("booking.form.return")}</label>
                        <input className="form-control" type="date" name="" id="return" required />
                        <p className="mt-3 fw-bold fs-5" >{t("booking.form.estimate")}{ estimate }$</p>
                        <button type="submit" className="btn btn-primary mx-auto mb-2">{t("booking.form.request-btn")}</button>
                    </form>
                </div>
                <div className="vh-100 w-75">
                    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={['marker', 'places']} >
                        <Map
                            mapId={'destinationMap'}
                            style={{width: '100%', height: '100%'}}
                            defaultCenter={ origin }
                            defaultZoom={13}
                            mapTypeId="hybrid"
                            gestureHandling={'greedy'}
                            onClick={e => {
                                setDestination(e.detail.latLng)
                            }}
                            disableDefaultUI={true}>

                            <AdvancedMarker
                                position={ origin }
                                title={'Departure marker'}>
                                <Pin
                                    background={'#0d6efd'}
                                    borderColor={'white'}
                                    scale={1.5}>
                                    {/* source: https://www.svgrepo.com/show/352352/plane-departure.svg */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="25px" height="25px" viewBox="0 -64 640 640"><path d="M624 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM80.55 341.27c6.28 6.84 15.1 10.72 24.33 10.71l130.54-.18a65.62 65.62 0 0 0 29.64-7.12l290.96-147.65c26.74-13.57 50.71-32.94 67.02-58.31 18.31-28.48 20.3-49.09 13.07-63.65-7.21-14.57-24.74-25.27-58.25-27.45-29.85-1.94-59.54 5.92-86.28 19.48l-98.51 49.99-218.7-82.06a17.799 17.799 0 0 0-18-1.11L90.62 67.29c-10.67 5.41-13.25 19.65-5.17 28.53l156.22 98.1-103.21 52.38-72.35-36.47a17.804 17.804 0 0 0-16.07.02L9.91 230.22c-10.44 5.3-13.19 19.12-5.57 28.08l76.21 82.97z"/></svg>
                                </Pin>
                            </AdvancedMarker>

                            {destination &&
                                <AdvancedMarker
                                    position={ destination }
                                    title={'Arrival marker'}>
                                    <Pin
                                        background={'#0d6efd'}
                                        borderColor={'white'}
                                        scale={1.5}>
                                        {/* source: https://www.svgrepo.com/show/352351/plane-arrival.svg */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="25px" height="25px" viewBox="0 -64 640 640"><path d="M624 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM44.81 205.66l88.74 80a62.607 62.607 0 0 0 25.47 13.93l287.6 78.35c26.48 7.21 54.56 8.72 81 1.36 29.67-8.27 43.44-21.21 47.25-35.71 3.83-14.5-1.73-32.71-23.37-54.96-19.28-19.82-44.35-32.79-70.83-40l-97.51-26.56L282.8 30.22c-1.51-5.81-5.95-10.35-11.66-11.91L206.05.58c-10.56-2.88-20.9 5.32-20.71 16.44l47.92 164.21-102.2-27.84-27.59-67.88c-1.93-4.89-6.01-8.57-11.02-9.93L52.72 64.75c-10.34-2.82-20.53 5-20.72 15.88l.23 101.78c.19 8.91 6.03 17.34 12.58 23.25z"/></svg>
                                    </Pin>
                                </AdvancedMarker>
                            }

                        </Map>
                    </APIProvider>
                </div>
            </div>
        </div>
    );
}

export default BookingPage