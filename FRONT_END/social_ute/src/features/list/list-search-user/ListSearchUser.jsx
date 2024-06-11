import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupCard from './GroupCard';
import UserCard from './UserCard';

const ListSearchUser = ({ resultSearch }) => {
  const navigate = useNavigate();
  const { users, groups } = resultSearch;

  const handleNavigate = useCallback(
    (id, path) => {
      navigate(`${path}/${id}`);
    }, [navigate]
  );

  const renderList = useCallback((list, Component, path) => {
    if (!list?.length) return null;
    return list.map((item) => <Component key={item._id} item={item} onClick={() => handleNavigate(item._id, path)} />);
  }, [handleNavigate])

  const renderNoResults = useMemo(() => {
    if (users?.length === 0 && groups?.length === 0) return <p>Không tìm thấy kết quả phù hợp.</p>;

  }, [users, groups])

  return (
    <div className="grid grid-cols-1 gap-2 w-full px-4 items-start justify-start overflow-auto">
      {renderList(users, UserCard, 'home-guest')}
      {renderList(groups, GroupCard, '/welcome/groupDetails')}
      {renderNoResults}
    </div>
  );
};

export default ListSearchUser;
