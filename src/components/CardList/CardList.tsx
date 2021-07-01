import React, { Fragment } from 'react';
import cl from 'clsx';
import Skeleton from 'react-loading-skeleton';
import s from './CardList.module.scss';
import { CARD_COUNT, IHome, CardSize } from '../../const';
import Card from '../Card/Card';

interface ICardList {
  cardList: IHome[];
  className?: string;
}

const CardList = ({ cardList, className }: ICardList) => (
  <ul className={cl(s.list, className)}>
    {cardList.length > 0
      ? cardList.map((card) => (
          <li className={cl(s.card)} key={card.id}>
            <Card props={card} />
          </li>
        ))
      : new Array(CARD_COUNT).fill('').map((_item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={`item${i}`}>
            <Skeleton width={CardSize.width} height={CardSize.height} />
          </Fragment>
        ))}
  </ul>
);

export default CardList;
