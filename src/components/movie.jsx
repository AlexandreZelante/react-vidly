import React, { Component } from "react";
import Like from "./common/like";

class Movie extends Component {
    render() {
        const {
            _id,
            title,
            genre,
            stock,
            rate,
            onDelete,
            liked,
            handleLike
        } = this.props;

        return (
            <tr>
                <td>{title}</td>
                <td>{genre}</td>
                <td>{stock}</td>
                <td>{rate}</td>
                <td>
                    <Like liked={liked} onClick={handleLike} />
                </td>
                <td>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(_id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default Movie;
