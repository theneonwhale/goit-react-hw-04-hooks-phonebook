import { useState } from 'react';
import s from './ContactForm.module.css';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contact = { name, number };

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(contact);

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.item}>
        <p className={s.title}>Name</p>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter name here..."
          className={s.input}
        />
      </label>
      <label className={s.item}>
        <p className={s.title}>Number</p>
        <input
          type="text"
          name="number"
          value={number}
          onChange={handleChange}
          placeholder="Enter number here..."
          className={s.input}
        />
      </label>
      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
}
