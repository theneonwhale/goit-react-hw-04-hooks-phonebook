import PropTypes from 'prop-types';
import s from './ContactList.module.css';

export default function ContactListItem({
  name = 'anonymous',
  number = 'unknown',
  id,
  onDeleteContact,
}) {
  return (
    <li className={s.item}>
      <p className={s.contact}>
        {name}: {number}
      </p>
      <button onClick={() => onDeleteContact(id)} className={s.button}>
        Remove
      </button>
    </li>
  );
}

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
