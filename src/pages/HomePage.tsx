import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';
import { useUserStore } from '../store/userStore';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import type { UserStatus } from '../types/types';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { userStatuses, setUserStatus } = useUserStore();
  const navigate = useNavigate();

  const getUserStatus = (userId: number): UserStatus => {
    return userStatuses[userId] || 'active';
  };

  const activeUsers = users?.filter(user => getUserStatus(user.id) === 'active') || [];
  const archivedUsers = users?.filter(user => getUserStatus(user.id) === 'archived') || [];

  if (isLoading) return <Loader />;
  if (error) return <div>Ошибка загрузки пользователей</div>;

  return (
    <div className={styles.homePage}>
      <div className={styles.container}>
      <section>
        <h2>Активные</h2>
        <div className={styles.userList}>
          {activeUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={() => navigate(`/edit/${user.id}`)}
              onArchive={() => setUserStatus(user.id, 'archived')}
              onHide={() => setUserStatus(user.id, 'hidden')}
            />
          ))}
        </div>
      </section>
      {archivedUsers.length > 0 && (
        <section>
          <h2>Архив</h2>
          <div className={styles.userList}>
            {archivedUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={() => navigate(`/edit/${user.id}`)}
                onArchive={() => {}} // не используется для архивированных
                onHide={() => {}} // не используется
                onActivate={() => setUserStatus(user.id, 'active')}
                isArchived
              />
            ))}
          </div>
        </section>
      )}
    </div>
    </div>
    
  );
};

export default HomePage;