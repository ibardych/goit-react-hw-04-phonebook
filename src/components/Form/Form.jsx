import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { Button } from 'components/Styled';
import { FormContainer } from './Form.styled';
import Input from './Input';

const defaultFields = { name: '', number: '' };

const Form = ({ onSubmit }) => {
  const [fields, setFields] = useState(defaultFields);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFields(fields => ({ ...fields, [name]: value }));
  };

  const submitHandler = e => {
    onSubmit(e, fields);
    setFields({ ...defaultFields });
  };

  return (
    <FormContainer onSubmit={submitHandler}>
      <Input
        label="Name"
        type="text"
        name="name"
        value={fields.name}
        onChange={handleInputChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <Input
        label="Number"
        type="tel"
        name="number"
        value={fields.number}
        onChange={handleInputChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <Button type="submit">Add contact</Button>
    </FormContainer>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
