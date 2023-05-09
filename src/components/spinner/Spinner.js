
const Spinner = (props) => {
    return (
        <div {...props} className="spinner-border mx-auto" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Spinner;