import Tag from "./Tag";

function DestinationCard({ name, src, description, tags}) {
    return (
        <div className="card shadow d-flex flex-row overflow-hidden mb-3">
            <img style={{objectFit:"cover"}} width="40%" src={src} alt="destination thumbnail" />
            <div className="my-4 mx-4 d-flex flex-column flex-grow-1">
                <h3 className="fw-bold">{ name }</h3>
                <p className="mt-3">{ description }</p>
                <div className="d-flex flex-wrap mt-auto">
                    {tags.map((tag) => (
                        <Tag name={tag.name} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DestinationCard