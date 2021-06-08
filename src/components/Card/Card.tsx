import React, { useEffect, useState } from 'react';
import cl from 'clsx';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import s from './Card.module.scss';
import { IHomes, ImgSize, Routes } from '../../const';
import { createAPI } from '../../api/api';
import { splitPrice } from '../../utils';
import { BACKEND_URL_IMG } from '../../api/const';

interface ICard {
  props: IHomes;
}

const api = createAPI(BACKEND_URL_IMG);

const Card = ({ props }: ICard) => {
  const { id, title, address, type, price } = props;
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    api.get(`/${ImgSize.width}/${ImgSize.height}`).then((res) => setImgSrc(res.request.responseURL));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link to={`${Routes.DETAILS}/${id}`} className={cl(s.card)}>
      <h2 className={cl(s.title)}>{title}</h2>
      <span className={cl(s.text)}>{address}</span>
      <span className={cl(s.text, s.text__price)}>
        New Properties for Sale from
        <span className={cl(s.text__bold)}> £{splitPrice(price)}</span>
      </span>
      <span className={cl(s.text, s.text__small)}>Shared Ownership Available</span>

      <div className={cl(s.img)}>
        {imgSrc ? (
          <>
            <img src={imgSrc} width={ImgSize.width} height={ImgSize.height} alt="house" />
            <div
              className={cl(
                s.type,
                { [s.type__sea]: type === 'IndependentLiving' },
                { [s.type__orange]: type === 'SupportAvailable' },
              )}>
              {type === 'SupportAvailable' ? 'Restaurant & Support available' : 'Independent living'}
            </div>
          </>
        ) : (
          <Skeleton width={ImgSize.width} height={ImgSize.height} />
        )}
      </div>
    </Link>
  );
};

export default Card;
