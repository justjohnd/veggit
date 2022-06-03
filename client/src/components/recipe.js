import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Recipe(props) {
  return (
    <div class="container">
      <div className="row">
        {props.recordArray.map((currentrecord) => {
          return (
            <div key={uuidv4()} className="recipe-home col-6 col-md-4 col-lg-3">
              <Link to={"/show/" + currentrecord._id}>
                <div className="image-wrapper">
                  <img
                    className="recipe-image mb-2"
                    src={
                      currentrecord.image !== null &&
                      currentrecord.image.slice(0, 4) === "http"
                        ? currentrecord.image
                        : "./images/" + currentrecord.image
                    }
                    alt={currentrecord.title}
                  />
                </div>
                <div className="px-1 title">{currentrecord.title}</div>
              </Link>
              {props.privateScreen ? (
                <div className="px-1">
                  <Link to={"/edit/" + currentrecord._id}>Edit</Link> |
                  <a
                    className="link"
                    onClick={() => {
                      props.deleteRecord(currentrecord._id);
                      window.location.reload();
                    }}
                  >
                    Delete
                  </a>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Recipe;
