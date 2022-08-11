import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
const DiscographyPage = () => {
  const { id } = useParams();
  useEffect(() => {
    const getDiscographyInfo = async () => {
      const { data: discographyInfo } = await api.getArtistInfo(id as string, '/albums/?include_groups=album,single&limit=50');
      console.log(discographyInfo);
    };
    getDiscographyInfo();
  });
  return (
        <p>discography page {id}</p>
  );
};

export default DiscographyPage;
