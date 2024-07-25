import Navbar from "../components/Navbar";
import Title from "../components/Title";
import Footer from "../components/Footer";
import DestinationCard from "../components/DestinationCard";
import FilterItem from "../components/FilterItem";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function DestinationPage() {
    const [t, ] = useTranslation("global")
    const [filters, setFilters] = useState([])

    const destinations = [
        { name: t("destinations.lotw.name"), src: "https://paddlingmagazine-images.s3.amazonaws.com/2021/01/02110448/lake-of-the-woods.jpg", description: t("destinations.lotw.description"), tags: [
            {name:t("destinations.tags.fishing"), filterName:"fishing"},
            {name: t("destinations.tags.hunting"), filterName:"hunting"},
            {name: t("destinations.tags.camping"), filterName:"camping"},
            {name: t("destinations.tags.lodge"), filterName:"lodge"},
            {name: t("destinations.tags.campsite"), filterName:"campsite"},
            {name: t("destinations.tags.crownland"), filterName:"crownland"},
            {name: t("destinations.tags.hotel"), filterName:"hotel"},
            {name: t("destinations.tags.spring"), filterName:"spring"},
            {name: t("destinations.tags.summer"), filterName:"summer"},
            {name: t("destinations.tags.fall"), filterName:"fall"},
            {name: t("destinations.tags.winter"), filterName:"winter"}
        ]},
        { name: t("destinations.gsl.name"), src: "https://adventures.com/media/212468/yellowknife-night-panorama-canada.jpg?anchor=center&mode=crop&width=970&height=645&rnd=133217086330000000&format=jpg&quality=80", description: t("destinations.gsl.description"), tags: [
            {name: t("destinations.tags.fishing"), filterName:"fishing"},
            {name: t("destinations.tags.hunting"), filterName:"hunting"},
            {name: t("destinations.tags.camping"), filterName:"camping"},
            {name: t("destinations.tags.hiking"), filterName:"hiking"},
            {name: t("destinations.tags.lodge"), filterName:"lodge"},
            {name: t("destinations.tags.crownland"), filterName:"crownland"},
            {name: t("destinations.tags.summer"), filterName:"summer"},
            {name: t("destinations.tags.winter"), filterName:"winter"}
        ]},
        { name: t("destinations.algoma.name"), src: "https://www.algomacountry.com/wp-content/uploads/2015/09/nature-outdoors-photo6.jpg", description: t("destinations.algoma.description"), tags: [
            {name: t("destinations.tags.fishing"), filterName:"fishing"},
            {name: t("destinations.tags.camping"), filterName:"camping"},
            {name: t("destinations.tags.hiking"), filterName:"hiking"},
            {name: t("destinations.tags.lodge"), filterName:"lodge"},
            {name: t("destinations.tags.campsite"), filterName:"campsite"},
            {name: t("destinations.tags.crownland"), filterName:"crownland"},
            {name: t("destinations.tags.spring"), filterName:"spring"},
            {name: t("destinations.tags.summer"), filterName:"summer"},
            {name: t("destinations.tags.fall"), filterName:"fall"}
        ]},
        { name: t("destinations.algonquin.name"), src: "https://paddlingmagazine-images.s3.amazonaws.com/2021/02/23102204/Hero_10001774.jpg", description: t("destinations.algonquin.description"), tags: [
            {name: t("destinations.tags.fishing"), filterName:"fishing"},
            {name: t("destinations.tags.camping"), filterName:"camping"},
            {name: t("destinations.tags.hiking"), filterName:"hiking"},
            {name: t("destinations.tags.campsite"), filterName:"campsite"},
            {name: t("destinations.tags.spring"), filterName:"spring"},
            {name: t("destinations.tags.summer"), filterName:"summer"},
            {name: t("destinations.tags.fall"), filterName:"fall"}
        ]},
        { name: t("destinations.goin.name"), src: "https://tamarac.ca/medias/siteweb-photos/peche/reservoir-gouin/chalets/40/chalet-reservoir-gouin-40-1.jpg", description: t("destinations.goin.description"), tags: [
            {name: t("destinations.tags.fishing"), filterName:"fishing"},
            {name: t("destinations.tags.hunting"), filterName:"hunting"},
            {name: t("destinations.tags.camping"), filterName:"camping"},
            {name: t("destinations.tags.lodge"), filterName:"lodge"},
            {name: t("destinations.tags.crownland"), filterName:"crownland"},
            {name: t("destinations.tags.spring"), filterName:"spring"},
            {name: t("destinations.tags.summer"), filterName:"summer"},
            {name: t("destinations.tags.fall"), filterName:"fall"}
        ]},
        { name: t("destinations.ws.name"), src: "https://www.explorethewhiteshell.com/wp-content/uploads/2019/06/High_lake_tree_EmilyChristie-0136-640x400.jpg", description: t("destinations.ws.description"), tags: [
            {name: t("destinations.tags.fishing"), filterName:"fishing"},
            {name: t("destinations.tags.camping"), filterName:"camping"},
            {name: t("destinations.tags.hiking"), filterName:"hiking"},
            {name: t("destinations.tags.campsite"), filterName:"campsite"},
            {name: t("destinations.tags.spring"), filterName:"spring"},
            {name: t("destinations.tags.summer"), filterName:"summer"},
            {name: t("destinations.tags.fall"), filterName:"fall"}
        ]}
    ]

    return (
        <div className="wavetop">
            <Navbar />
            <div className="padded mt-3 min-vh-100">
                <Title title={t("destinations.title")} />
                <div className="d-flex flex-wrap align-items-center mb-2">
                    <button className="btn btn-primary d-flex align-items-center m-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill me-1" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
                        </svg>
                        {t("destinations.filter")}
                    </button>
                    {filters.map(filter => (
                        <FilterItem name={ t("destinations.tags."+filter) } filterName={ filter } filters={ filters } setFilters={ setFilters } />
                    ))}
                </div>
                {destinations.filter(destination => {
                    const tagNames = destination.tags.map(tag => tag.filterName)
                    return filters.every(filterName => tagNames.includes(filterName))
                }).map((destination) => (
                    <DestinationCard name={destination.name} src={destination.src} description={destination.description} tags={destination.tags} />
                ))}
            </div>
            <Footer />

            {/* Offcanvas */}
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">{t("destinations.offcanvas.title")}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <form onSubmit={e => {
                    e.preventDefault()
                    let newFilters = []
                    let checks = document.getElementsByName('filters')
                    for (let i = 0; i < checks.length; i++) {
                        const elem = checks[i]
                        if (elem.checked) {
                            newFilters.push(elem.id)
                        }
                    }
                    setFilters(newFilters)
                    window.bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasExample")).hide()
                }}>
                    <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                            {t("destinations.offcanvas.section1")}
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                        <div className="accordion-body d-flex flex-wrap">
                            <input type="checkbox" className="btn-check" id="fishing" autoComplete="off" name="filters" />
                            <label className="btn btn-outline-primary rounded-pill border-dark-subtle text-dark m-1" htmlFor="fishing">{t("destinations.tags.fishing")}</label>
                            <input type="checkbox" className="btn-check" id="hunting" autoComplete="off" name="filters" />
                            <label className="btn btn-outline-primary rounded-pill border-dark-subtle text-dark m-1" htmlFor="hunting">{t("destinations.tags.hunting")}</label>
                            <input type="checkbox" className="btn-check" id="camping" autoComplete="off" name="filters" />
                            <label className="btn btn-outline-primary rounded-pill border-dark-subtle text-dark m-1" htmlFor="camping">{t("destinations.tags.camping")}</label>
                            <input type="checkbox" className="btn-check" id="hiking" autoComplete="off" name="filters" />
                            <label className="btn btn-outline-primary rounded-pill border-dark-subtle text-dark m-1" htmlFor="hiking">{t("destinations.tags.hiking")}</label>
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            {t("destinations.offcanvas.section2")}
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body d-flex flex-wrap">
                            <input type="checkbox" className="btn-check" id="lodge" autoComplete="off" name="filters" />
                            <label className="btn btn-outline-primary rounded-pill border-dark-subtle text-dark m-1" htmlFor="lodge">{t("destinations.tags.lodge")}</label>
                            <input type="checkbox" className="btn-check" id="campsite" autoComplete="off" name="filters" />
                            <label className="btn btn-outline-primary rounded-pill border-dark-subtle text-dark m-1" htmlFor="campsite">{t("destinations.tags.campsite")}</label>
                            <input type="checkbox" className="btn-check" id="crownland" autoComplete="off" name="filters" />
                            <label className="btn btn-outline-primary rounded-pill border-dark-subtle text-dark m-1" htmlFor="crownland">{t("destinations.tags.crownland")}</label>
                            <input type="checkbox" className="btn-check" id="hotel" autoComplete="off" name="filters" />
                            <label className="btn btn-outline-primary rounded-pill border-dark-subtle text-dark m-1" htmlFor="hotel">{t("destinations.tags.hotel")}</label>
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            {t("destinations.offcanvas.section3")}
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                        <div className="accordion-body d-flex flex-wrap">
                            <input type="checkbox" className="btn-check" id="spring" autoComplete="off" name="filters" />
                            <label className="btn btn-outline-primary rounded-pill border-dark-subtle text-dark m-1" htmlFor="spring">{t("destinations.tags.spring")}</label>
                            <input type="checkbox" className="btn-check" id="summer" autoComplete="off" name="filters" />
                            <label className="btn btn-outline-primary rounded-pill border-dark-subtle text-dark m-1" htmlFor="summer">{t("destinations.tags.summer")}</label>
                            <input type="checkbox" className="btn-check" id="fall" autoComplete="off" name="filters" />
                            <label className="btn btn-outline-primary rounded-pill border-dark-subtle text-dark m-1" htmlFor="fall">{t("destinations.tags.fall")}</label>
                            <input type="checkbox" className="btn-check" id="winter" autoComplete="off" name="filters" />
                            <label className="btn btn-outline-primary rounded-pill border-dark-subtle text-dark m-1" htmlFor="winter">{t("destinations.tags.winter")}</label>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="d-flex flex-column flex-grow-1">
                        <button type="submit" className="btn btn-primary mt-3 mx-auto">{t("destinations.offcanvas.button")}</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}

export default DestinationPage