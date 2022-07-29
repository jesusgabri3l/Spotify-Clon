import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { UserStoreImpl } from '../../store/UserStore';
import api from '../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import Me from './Me';
import Login from './Login';
import Loader from '../../components/layouts/Loader';

interface Props {
  UserStore: UserStoreImpl;
}

const Home = observer(({ UserStore }: Props) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const from = location.state?.from?.pathname || '/';

    const getMeData = async (): Promise<void> => {
      try {
        setLoading(true);
        const { data: user } = await api.getCurrentInfo();
        UserStore.setUser(user);
        setIsLogged(true);
        if (from) navigate(from, { replace: true });
      } catch (err) {
        console.error(err);
        setIsLogged(false);
      } finally {
        setLoading(false);
      }
    };

    if (UserStore.user.id) {
      setIsLogged(true);
      setLoading(false);
    } else if (UserStore.auth.accessToken && !UserStore.user.id) {
      getMeData();
    } else if (!UserStore.auth.accessToken) {
      setIsLogged(false);
      setLoading(false);
    }
  }, [UserStore.user.id]);
  const renderComponent = () => {
    if (isLogged) return <Me user={UserStore.user} />;
    return <Login />;
  };
  return (
    <>
      {
        loading ? <Loader /> : renderComponent()
      }
    </>
  );
});

export default Home;
