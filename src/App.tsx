import useMasintonForm from './packages/masinton-form';

const formData: MasintonForm = {
  username: {
    value: '',
    error: false,
    errorMessage: '',
  },
  password: {
    value: '',
    error: false,
    errorMessage: '',
  },
};

const validation: MasintonValidation = {
  username: [
    {
      rule: /\S/,
      errorMessage: 'Username tidak boleh kosong',
    },
  ],
  password: [
    {
      rule: /\S/,
      errorMessage: 'Password tidak boleh kosong',
    },
  ],
};


const Page = () => {
  const { masintonForm, masintonChange, masintonValidation } = useMasintonForm(formData, validation);
  const {
    username,
    password,
  } = masintonForm;

  function handleSubmit() {
    if (masintonValidation()) {
      alert(`login`)
    }
  }

  return (
    <>
      <label htmlFor="username"> Username: </label>
      <input type="text" name="username" value={username.value} onChange={e => masintonChange('username', e.target.value)} />
      <div>{username.errorMessage}</div>
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" value={password.value} onChange={e => masintonChange('password', e.target.value)} />
      <div>{password.errorMessage}</div>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default Page