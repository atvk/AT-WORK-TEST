import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../api/users";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, type UserFormValidation } from "../utils/validation";
import { useState } from "react";
import Toast from "../components/Toast";
import Loader from "../components/Loader";
import styles from "./EditPage.module.scss";
import BackButton from "../components/BackButton";
import SaveButton from "../components/SaveButton";
import FormInput from "../components/FormImput";

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [showToast, setShowToast] = useState(false);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(Number(id)),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValidation>({
    resolver: zodResolver(userFormSchema),
    values: user
      ? {
          name: user.name,
          username: user.username,
          email: user.email,
          city: user.address.city,
          phone: user.phone.replace(/\D/g, ""),
          companyName: user.company.name,
        }
      : undefined,
  });

  const onSubmit = () => {
    setShowToast(true);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Ошибка загрузки пользователя</div>;
  if (!user) return <div>Пользователь не найден</div>;

  const avatarUrl = "/avatar.jpg"; // или из API, если есть

  return (
    <div className={styles.pageEdit}>
      {/* Кнопка "Назад" на всю ширину */}
      <div className={styles.backWrapper}>
        <BackButton />
      </div>

      {/* Две колонки */}
      <div className={styles.twoColumns}>
        {/* Левая колонка: фото + информация */}
        <div className={styles.leftColumn}>
          <div className={styles.photoBlock}>
            <img src={avatarUrl} alt={user.username} className={styles.photo} />
          </div>
          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>Данные профиля</h3>
            <p className={styles.infoText}>Рабочее пространство</p>
            <p className={styles.infoText}>Приватность</p>
            <p className={styles.infoText}>Безопасность</p>
          </div>
        </div>

        {/* Правая колонка: форма */}
        <div className={styles.rightColumn}>
          <div className={styles.formCard}>
            <h1 className={styles.formTitle}>Данные профиля</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.formInputWrapper}>
                <FormInput
                  label="Имя"
                  register={register("name")}
                  error={errors.name}
                />
                <FormInput
                  label="Никнейм"
                  register={register("username")}
                  error={errors.username}
                />
                <FormInput
                  label="Почта"
                  register={register("email")}
                  error={errors.email}
                />
                <FormInput
                  label="Город"
                  register={register("city")}
                  error={errors.city}
                />
                <FormInput
                  label="Телефон"
                  register={register("phone")}
                  error={errors.phone}
                />
                <FormInput
                  label="Название компании"
                  register={register("companyName")}
                  error={errors.companyName}
                />
              </div>
              <div className={styles.saveButtonWrapper}>
                <SaveButton />
              </div>
            </form>
          </div>
        </div>
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
