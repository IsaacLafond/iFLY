function Tag({ name }) {
    return (
        <p className="btn rounded-pill border-dark-subtle me-1 mb-1" style={{cursor: 'default'}}>{ name }</p>
    );
}

export default Tag