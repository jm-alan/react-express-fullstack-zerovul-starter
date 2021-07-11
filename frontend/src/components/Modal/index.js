import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

export default function Modal () {
  const show = useSelector(state => state.UX.modal);
  const mooring = useSelector(state => state.modal.mooring);
  const Current = useSelector(state => state.modal.Current);

  return mooring && show && Current && createPortal(
    <Current />,
    mooring
  );
}
