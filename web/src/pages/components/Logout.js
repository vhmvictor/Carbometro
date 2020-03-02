import { history } from '../../history'

const Logout = () => {
    localStorage.removeItem('app-token');
    history.push('/login');
  };

export default Logout;