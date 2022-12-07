import './post.scss';
import { useState } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import moment from 'moment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
const Post = ({ post }) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [menu, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.profilePic)
  const { isLoading, error, data } = useQuery(['likes', post.id], () =>
    makeRequest.get('/likes/?postId=' + post.id).then((res) => {
      return res.data;
    })
  );
  const queryClient = useQueryClient();
  // Mutations for liking action
  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete('/likes/?postId='+post.id,);
        return makeRequest.post('/likes', { postId: post.id });
      
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['likes'] });
      },
    }
  );
  // mutation for delete action
  const deleteMutation = useMutation(
    (postId) => {
        return makeRequest.delete('/posts/'+postId );
      
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      },
    }
  );
    const handleDelete = () => {
      deleteMutation.mutate(post.id)
    }




  const handleLike = (e) => {
    e.preventDefault();
    mutation.mutate(data?.includes(currentUser.id));
  };
  return (
    <div className='post'>
      <div className='container'>
        {isLoading ? "loading":<>
        <div className='user'>
          <div className='userInfo'>
            <img src={"/upload/"+currentUser.profilePic} alt='' />
            <div className='details'>
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className='name'>{post.name}</span>
              </Link>
              <span className='date'>{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={()=>setMenuOpen(!menu)}/>
          {menu &&  post.userId === currentUser.id &&<button onClick={handleDelete}>X</button>}
        </div>
        <div className='content'>
          <p>{post.desc}</p>
          <img src={'./upload/' + post.img} alt='' />
        </div>
        <div className='info'>
          <div className='item'>
            {error ? error :
            isLoading ? (
              '...'
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: 'red' }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} likes
          </div>
          <div className='item' onClick={() => setCommentsOpen(!commentsOpen)}>
            <TextsmsOutlinedIcon />
            10 Comments.
          </div>
          <div className='item'>
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentsOpen && <Comments postId={post.id} />}
        </>}
      </div>
    </div>
  );
};

export default Post;
