import React, { useEffect, useState } from 'react';
import cl from 'clsx';
import { Link } from 'react-router-dom';
import s from './HomePage.module.scss';
import { Routes, IHome, MIN_SEARCH } from '../../const';
import { createAPI } from '../../api/api';
import { APIRoute, BACKEND_URL } from '../../api/const';
import CardList from '../../components/CardList/CardList';

const api = createAPI(BACKEND_URL);

const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputOldLength, setInputOldLength] = useState<number>(0);
  const [inputNewLength, setInputNewLength] = useState<number>(0);
  const [homes, setHomes] = useState<IHome[]>([]);
  const [cardList, setCardList] = useState<IHome[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget;
    setInputValue(value);

    if (inputNewLength === 0 && inputOldLength === 0) {
      setInputOldLength(value.length);
      setInputNewLength(value.length);
      return;
    }
    setInputOldLength(inputNewLength);
    setInputNewLength(value.length);
  };

  const getHomes = () => {
    api
      .get(APIRoute.HOMES)
      .then((res) => {
        setHomes(res.data as IHome[]);
        setCardList(res.data as IHome[]);
      })
      .catch((err) => setIsError(true));
  };

  useEffect(() => {
    getHomes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cardList.length === 0 && inputNewLength && inputNewLength > 0 && !isError) {
      setIsNotFound(true);
    } else setIsNotFound(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardList.length]);

  useEffect(() => {
    if (inputOldLength > MIN_SEARCH && inputNewLength <= MIN_SEARCH && homes.length !== cardList.length) {
      getHomes();
    }
    if (inputNewLength > MIN_SEARCH) {
      setCardList(homes.filter((home) => home.title.includes(inputValue, 0)));
    }
    if (inputNewLength === 0) {
      setInputOldLength(0);
      setInputNewLength(0);
      getHomes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputNewLength]);

  return (
    <div className={cl(s.homePage)}>
      <h1 className={cl(s.header)}>Our Latest Developments</h1>
      <div className={cl(s.filter)}>
        <label htmlFor="search">
          Filter
          <input
            className={cl(s.filterInput)}
            type="text"
            id="search"
            autoComplete="off"
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
      </div>
      {!isError && !isNotFound && cardList && <CardList cardList={cardList} />}
      {isError && (
        <p className={cl(s.messageText)}>
          Не удалось загрузить данные. Попробуйте, пожалуйста, еще раз через некоторое время
        </p>
      )}
      {isNotFound && <p className={cl(s.message_text)}>Ничего не найдено. Попробуйте изменить параметры запроса</p>}
      <Link className={cl(s.link)} to={Routes.ERROR404}>
        See more homes
      </Link>
    </div>
  );
};

export default HomePage;
