import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function NavBar () {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  return (
    <nav>
      {user
        ? (
          <>
            <Link to='/'>
              Home
            </Link>
            <Link to='/users/me/'>
              My Profile
            </Link>
            <button>
              Log Out
            </button>
          </>
          )
        : (
          <>
            <button>
              Log In
            </button>
            <button>
              Sign Up
            </button>
          </>
          )}
    </nav>
  );
}
