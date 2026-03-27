import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUserById } from '../api/users';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFormSchema, type UserFormValidation } from '../utils/validation';
import { useState } from 'react';
import Button from '../components/Button'
import Toast from '../components/Toast';
import Loader from '../components/Loader';
import styles from './EditPage.module.scss';

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(Number(id)),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValidation>({
    resolver: zodResolver(userFormSchema),
    values: user ? {
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.address.city,
      phone: user.phone.replace(/\D/g, ''), // оставляем только цифры для удобства ввода
      companyName: user.company.name,
    } : undefined,
  });

  const onSubmit = () => {
    // Здесь можно было бы отправить данные на сервер, но по условию они не сохраняются после перезагрузки
    // Просто показываем попап
    setShowToast(true);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Ошибка загрузки пользователя</div>;
  if (!user) return <div>Пользователь не найден</div>;

  const avatarUrl = `https://avatars.dicebear.com/api/initials/${user.username}.svg`;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/')} className={styles.backBtn}>← Назад</button>
      <div className={styles.formContainer}>
        <div className={styles.avatarSection}>
          <img src={avatarUrl} alt={user.username} className={styles.avatar} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label>Имя</label>
            <input {...register('name')} />
            {errors.name && <span className={styles.error}>{errors.name.message}</span>}
          </div>
          <div className={styles.field}>
            <label>Никнейм</label>
            <input {...register('username')} />
            {errors.username && <span className={styles.error}>{errors.username.message}</span>}
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input {...register('email')} type="email" />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
          </div>
          <div className={styles.field}>
            <label>Город</label>
            <input {...register('city')} />
            {errors.city && <span className={styles.error}>{errors.city.message}</span>}
          </div>
          <div className={styles.field}>
            <label>Телефон</label>
            <input {...register('phone')} placeholder="Только цифры" />
            {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
          </div>
          <div className={styles.field}>
            <label>Название компании</label>
            <input {...register('companyName')} />
            {errors.companyName && <span className={styles.error}>{errors.companyName.message}</span>}
          </div>
          <Button variant="save" type="submit">Сохранить</Button>
        </form>
      </div>
      {showToast && (
        <Toast
          message="Изменения сохранены!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default EditPage;