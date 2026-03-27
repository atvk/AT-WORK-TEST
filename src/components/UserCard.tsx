import { useState } from 'react';
import type { User } from '../types/types';
import ThreeDotsIcon from './ThreeDotsIcon';
import DropdownMenu from './DropdownMenu';
import styles from './UserCard.module.scss';

interface UserCardProps {
  user: User;
  onEdit: () => void;
  onArchive: () => void;
  onHide: () => void;
  onActivate?: () => void;
  isArchived?: boolean;
}

const UserCard = ({ user, onEdit, onArchive, onHide, onActivate, isArchived = false }: UserCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const avatarUrl = '/avatar.jpg'; // путь к файлу в public

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleEdit = () => {
    onEdit();
    closeMenu();
  };

  const handleArchive = () => {
    onArchive();
    closeMenu();
  };

  const handleHide = () => {
    onHide();
    closeMenu();
  };

  const handleActivate = () => {
    onActivate?.();
    closeMenu();
  };

   return (
    <div className={`${styles.card} ${isArchived ? styles.archived : ''}`}>
      <div className={styles.avatarContainer}>
        <img src={avatarUrl} alt={user.username} className={styles.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.username}>{user.username}</h3>
          <div className={styles.menuContainer}>
            <button
              className={styles.menuButton}
              onClick={toggleMenu}
              aria-label="Меню"
            >
              <ThreeDotsIcon />
            </button>
            <DropdownMenu isOpen={menuOpen} onClose={closeMenu} position="bottom">
              {!isArchived ? (
                <>
                  <button onClick={handleEdit}>Редактировать</button>
                  <button onClick={handleArchive}>Архивировать</button>
                  <button onClick={handleHide}>Скрыть</button>
                </>
              ) : (
                <button onClick={handleActivate}>Активировать</button>
              )}
            </DropdownMenu>
          </div>
        </div>
        
        <div className={styles.info} >
          <p className={styles.company}>{user.company.name}</p>
          <p className={styles.city}>{user.address.city}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;