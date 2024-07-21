function Title({ title }) {
    return (
        <div>
            <h1>{title}</h1>
            <hr style={{
                width:"65px",
                borderTop: "5px solid rgb(33, 37, 41)",
                color: "rgb(33, 37, 41)",
                opacity: "1"
            }}/>
        </div>
    );
}

export default Title