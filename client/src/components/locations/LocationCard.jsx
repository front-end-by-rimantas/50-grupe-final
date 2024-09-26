import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/react.svg';
import { GlobalContext } from '../../context/GlobalContext';

/* eslint-disable react/prop-types */
export function LocationCard({ id, img, name, country }) {
    const { isLoggedIn } = useContext(GlobalContext);
    const navigate = useNavigate();
    const isLiked = false;

    function addLike() {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            console.log('Add like:', id);
        }
    }

    function removeLike() {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            console.log('Remove like:', id);
        }
    }

    return (
        <div className="col">
            <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
                style={{ backgroundImage: `url(${img})` }}>
                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                    <div>
                        {isLiked
                            ? <button onClick={removeLike}>Remove from list</button>
                            : <button onClick={addLike}>Add to list</button>}
                    </div>
                    <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{name}</h3>
                    <ul className="d-flex list-unstyled mt-auto">
                        <li className="me-auto">
                            <img src={logo} alt="Logo" width="32" height="32" className="rounded-circle border border-white" />
                        </li>
                        <li className="d-flex align-items-center me-3">
                            <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill"></use></svg>
                            <small>{country}</small>
                        </li>
                        <li className="d-flex align-items-center">
                            <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3"></use></svg>
                            <small>3d</small>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}