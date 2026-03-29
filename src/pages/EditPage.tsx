import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../api/users";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, type UserFormValidation } from "../utils/validation";
import { useState, useEffect } from "react";
import Popup from "../components/Popup";
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
    formState: { errors, isValid },
    reset,
    trigger,
  } = useForm<UserFormValidation>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange", // валидация при каждом изменении
    defaultValues: {
      name: "",
      username: "",
      email: "",
      city: "",
      phone: "",
      companyName: "",
    },
  });

  useEffect(() => {
    if (user) {
      const formValues = {
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.address.city,
        phone: user.phone.replace(/\D/g, ""),
        companyName: user.company.name,
      };
      reset(formValues);
      trigger(); // запустить валидацию после заполнения
    }
  }, [user, reset, trigger]);

  const onSubmit = (data: UserFormValidation) => {
    console.log("Сохранено:", data);
    setShowToast(true);
    // Здесь можно отправить данные на сервер
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Ошибка загрузки пользователя</div>;
  if (!user) return <div>Пользователь не найден</div>;

  const avatarUrl = "/avatar.jpg";

  return (
    <div className={styles.pageEdit}>
      <div className={styles.backWrapper}>
        <BackButton />
      </div>

      <div className={styles.twoColumns}>
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
                {/* Передаём disabled если форма не валидна */}
                <SaveButton disabled={!isValid} />
              </div>
            </form>
          </div>
        </div>
      </div>

      {showToast && (
        <Popup
          message="Изменения сохранены!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default EditPage;
