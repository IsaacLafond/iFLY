import Navbar from "../components/Navbar";
import Title from "../components/Title";
import Footer from "../components/Footer";
import ReviewCard from "../components/ReviewCard";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Recent sorts highest (newest id) first
function recent(a, b) {
    if (a.id === b.id) {
        return 0;
    } else if (a.id > b.id) {
        return -1;
    } else {
        return 1;
    }
}

// Highest sorts highest rating first
function highest(a, b) {
    if (a.stars === b.stars) {
        if (a.half === false && b.half === true) {
            return 1;
        } else if (a.half === true && b.half === false) {
            return -1;
        } else {
            return 0;
        }
    } else if (a.stars < b.stars) {
        return 1;
    } else {
        return -1;
    }
}

// Lowest sorts lowest rating first
function lowest(a, b) {
    if (a.stars === b.stars) {
        if (a.half === false && b.half === true) {
            return -1;
        } else if (a.half === true && b.half === false) {
            return 1;
        } else {
            return 0;
        }
    } else if (a.stars < b.stars) {
        return -1;
    } else {
        return 1;
    }
}

function ReviewsPage() {
    const [t, ] = useTranslation("global")

    const reviewsList = [
        { id: 1, title: t("reviews.1.title"), stars: 1, half: false, description: t("reviews.1.description")},
        { id: 2, title: t("reviews.2.title"), stars: 3, half: false, description: t("reviews.2.description")},
        { id: 3, title: t("reviews.3.title"), stars: 4, half: true, description: t("reviews.3.description")},
        { id: 4, title: t("reviews.4.title"), stars: 1, half: true, description: t("reviews.4.description")},
        { id: 5, title: t("reviews.5.title"), stars: 3, half: true, description: t("reviews.5.description")},
        { id: 6, title: t("reviews.6.title"), stars: 5, half: false, description: t("reviews.6.description")},
        { id: 7, title: t("reviews.7.title"), stars: 2, half: true, description: t("reviews.7.description")},
        { id: 8, title: t("reviews.8.title"), stars: 4, half: false, description: t("reviews.8.description")},
        { id: 9, title: t("reviews.9.title"), stars: 5, half: false, description: t("reviews.9.description")}
    ]

    const [reviews, setReviews] = useState(reviewsList)

    function sortElements(elements, compare) {
        return [...elements].sort(compare)
    }
    function HandleChange() {
        let filterElem = document.getElementById("filter")
        switch (filterElem.value) {
            case "1":
                setReviews(sortElements(reviews, recent))
                break;
            case "2":
                setReviews(sortElements(reviews, highest))
                break;
            case "3":
                setReviews(sortElements(reviews, lowest))
                break;
            default:
                setReviews(sortElements(reviews))
                break;
        }
    }


    return (
        <div className="wavetop">
            <Navbar />
            <div className="padded mt-3">
                <Title title={ t("reviews.title") } />
                <div className="padded">
                    <div className="mb-3 d-flex"> { /* flex row auto margin between */}
                        <button className="btn btn-primary me-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">{t("reviews.write")}</button>
                        <select id="filter" className="form-select" name="reviewFilter" onChange={HandleChange} style={{width: "fit-content"}}>
                            <option>{t("reviews.select.sort-by")}</option>
                            <option value="1">{t("reviews.select.recent")}</option>
                            <option value="2">{t("reviews.select.highest")}</option>
                            <option value="3">{t("reviews.select.lowest")}</option>
                        </select>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between">
                        {reviews.map((review) => (
                            <ReviewCard key={review.id} title={t("reviews."+review.id.toString()+".title")} stars={review.stars} half={review.half} description={t("reviews."+review.id.toString()+".description")}/>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{t("reviews.modal.modal-title")}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    let formElements = e.target.elements
                    let newReview = {
                        id: reviews.length + 1,
                        title: formElements["reviewTitle"].value,
                        stars: parseInt(formElements["ratingInput"].value[0]),
                        half: formElements["ratingInput"].value[1]===undefined ? false : true,
                        description: formElements["reviewBody"].value
                    }
                    console.log(newReview)
                    setReviews([newReview, ...reviews])
                    e.target.reset()
                    window.bootstrap.Modal.getInstance(document.getElementById("exampleModal")).hide()
                }}>
                    <div className="modal-body">
                        <label className="form-label" htmlFor="reviewTitle">{t("reviews.modal.title")}</label>
                        <input className="form-control mb-2" id="reviewTitle" type="text" required/>
                        <label htmlFor="ratingInput">{t("reviews.modal.rating")}</label>
                        <select className="form-control form-select mb-2" id="ratingInput" defaultValue={"5"}>
                            <option value="5">5</option>
                            <option value="45">4.5</option>
                            <option value="4">4</option>
                            <option value="35">3.5</option>
                            <option value="3">3</option>
                            <option value="25">2.5</option>
                            <option value="2">2</option>
                            <option value="15">1.5</option>
                            <option value="1">1</option>
                        </select>
                        <label className="form-label" htmlFor="reviewBody">{t("reviews.modal.review")}</label>
                        <textarea className="form-control" id="reviewBody" required></textarea>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t("reviews.modal.cancel")}</button>
                        <button type="submit" className="btn btn-primary">{t("reviews.modal.post")}</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    );
}

export default ReviewsPage