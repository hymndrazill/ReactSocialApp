import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './login.scss';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [error, seterror] = useState(null);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (e) {
      seterror(e.response.data);
    }
  };

  return (
    <div className='login'>
      <div className='card'>
        <div className='left'>
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Reprehenderit quidem possimus perspiciatis aliquid eius facilis iure
            ullam nisi eveniet delectus dolor voluptas facere
          </p>
          <span>Don't You have an account?</span>
          <Link to='/register'>
            <button>Register</button>
          </Link>
        </div>
        <div className='right'>
          <h1>Login</h1>
          <form>
            <input
              onChange={handleChange}
              type='text'
              placeholder='username'
              name='username'
            />
            <input
              onChange={handleChange}
              type='password'
              placeholder='password'
              name='password'
            />
            {error && error}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
