import { useDispatch, useSelector } from 'react-redux';
import { TearDown } from '../../store/modal';
import { HideModal } from '../../store/UX';

export default function Auth ({ onSubmit, children }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  if (user) {
    dispatch(TearDown());
    dispatch(HideModal());
  }

  return (
    <form
      onSubmit={onSubmit}
      className='auth-form'
    >
      {children}
    </form>
  );
}
