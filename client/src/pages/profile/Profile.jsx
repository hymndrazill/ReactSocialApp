import './profile.scss';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from '../../components/posts/Posts';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';
import Update from '../../components/update/Update';

const Profile = () => {
  const userId = parseInt(useLocation().pathname.split('/')[2]);
  const { currentUser } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);

  const { isLoading, error, data } = useQuery(['user'], () =>
    makeRequest.get('/users/find/' + userId).then((res) => {
      return res.data;
    })
  );
  const { isLoading: relationshipIsLoading, data: relationshipData } = useQuery(
    ['relationship'],
    () =>
      makeRequest.get('/relationships?followedUserId=' + userId).then((res) => {
        return res.data;
      })
  );
  const queryClient = useQueryClient();
  // Mutations
  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete('/relationships?userId=' + userId);
      return makeRequest.post('/relationships', { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['relationship'] });
      },
    }
  );

  const handleFollow = (e) => {
    mutation.mutate(relationshipData?.includes(currentUser.id));
  };
  return (
    <div className='profile'>
      {isLoading ? (
        'loading'
      ) : (
        <>
          <div className='images'>
            <img className='cover' src={"/upload/"+data?.coverPic} alt='' />
            <img className='profile' src={"/upload/"+data?.profilePic} alt='' />
          </div>
          <div className='profileContainer'>
            <div className='userInfo'>
              <div className='left'>
                <a href='https://facebook.com'>
                  <FacebookTwoToneIcon fontSize='medium' />
                </a>
                <a href='https://instagram.com'>
                  <InstagramIcon fontSize='medium' />
                </a>
                <a href='https://twitter.com'>
                  <TwitterIcon fontSize='medium' />
                </a>
                <a href='https://linkedin.com'>
                  <LinkedInIcon fontSize='medium' />
                </a>
                <a href='https://pinterest.com'>
                  <PinterestIcon fontSize='medium' />
                </a>
              </div>
              <div className='center'>
                <span> {data?.name}</span>
                <div className='info'>
                  <div className='item'>
                    <PlaceIcon />
                    <span> {data?.city} </span>
                  </div>
                  <div className='item'>
                    <LanguageIcon />
                    <span>{data?.website} </span>
                  </div>
                </div>
                {userId === currentUser.id ? (
                  <button onClick={()=> setOpenUpdate(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? 'Following'
                      : 'Follow'}{' '}
                  </button>
                )}
              </div>
              <div className='right'>
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
          </div>
          <Posts user={data} userId= {userId}/>
        </>
      )}
           {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}

    </div>

  );
};

export default Profile;
