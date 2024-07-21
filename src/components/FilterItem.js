function FilterItem({name, filters, setFilters}) {
    return (
        <div className="btn rounded-pill bg-white border-dark-subtle d-flex align-items-center m-1">
            { name }
            <button type="button" className="btn-close" aria-label="Close" onClick={() => {
                setFilters(filters.filter(filter => {
                    return filter !== name
                }))
            }}></button>
        </div>
    );
}

export default FilterItem