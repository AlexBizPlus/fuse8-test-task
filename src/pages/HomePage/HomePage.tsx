import React, { useEffect, useState } from 'react';
import cl from 'clsx';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import s from './HomePage.module.scss';
import { CARD_COUNT, Routes, IHomes, CardSize, MIN_SEARCH } from '../../const';
import { createAPI } from '../../api/api';
import { APIRoute, BACKEND_URL } from '../../api/const';
import Card from '../../components/Card/Card';

const api = createAPI(BACKEND_URL);

const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [homes, setHomes] = useState<IHomes[]>([]);
  const [allHomes, setAllHomes] = useState<IHomes[]>([]);
  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget;
    setInputValue(value);
  };

  useEffect(() => {
    api.get(APIRoute.HOMES).then((res) => {
      setHomes(res.data as IHomes[]);
      setAllHomes(res.data as IHomes[]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inputValue.length > MIN_SEARCH) {
      setHomes(homes.filter((home) => home.title.includes(inputValue, 0)));
    } else {
      setHomes(allHomes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className={cl(s.homePage)}>
      <h1 className={cl(s.header)}>Our Latest Developments</h1>
      <div className={cl(s.filter)}>
        <label htmlFor="search">
          Filter
          <input
            className={cl(s.filter__input)}
            type="text"
            id="search"
            autoComplete="off"
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className={cl(s.list)}>
        {homes.length > 0
          ? homes.map((home, i) => {
              if (i < CARD_COUNT) {
                return <Card props={home} key={home.title} />;
              }
              return null;
            })
          : new Array(CARD_COUNT).fill('').map((_item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Skeleton height={CardSize.height} width={CardSize.width} key={`item${i}`} />
            ))}
      </div>
      <Link className={cl(s.link)} to={Routes.ERROR404}>
        See more homes
      </Link>
    </div>
  );
};

export default HomePage;
