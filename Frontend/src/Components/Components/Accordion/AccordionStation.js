import clsx from 'clsx';
import styles from '~/pages/PriceTicket/PriceTicket.module.scss';
import { useState } from 'react';
import { Table } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowRightArrowLeft,
  faArrowRightLong,
} from '@fortawesome/free-solid-svg-icons';

function AccordionItem({ content = {}, myKey, onClick }, ref) {
  const [isActive, setisActive] = useState(false);

  const handleShow = () => {
    setisActive(!isActive);
  };
  return (
    <div onClick={onClick}>
      <div className={clsx(styles.lotrinh)} id={myKey} onClick={handleShow}>
        <span
          className={`${
            isActive ? clsx(styles.tuyenduonghandle) : clsx(styles.tuyenduong)
          }`}
        >
          <span className={clsx(styles.station, 'fs-5')}>{content.diemdi}</span>
          <span className={clsx(styles.icon)}>
            <FontAwesomeIcon icon={faArrowRightArrowLeft}></FontAwesomeIcon>{' '}
          </span>
          <span className={clsx(styles.station, 'fs-5')}>{content.diemden}</span>
        </span>
        <span className={clsx(styles.arrows)}>
          <span className="fw-bold">Chi tiết</span>
          {isActive ? (
            <FontAwesomeIcon icon={faArrowDown} />
          ) : (
            <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
          )}
        </span>
      </div>
      {isActive === true && content.loai === 'tàu' ? (
        <Table className={clsx(styles.tablecustomer)}>
          <tbody>
            {content.giavehanhkhach.map((value, index) => {
              return (
                <tr key={index}>
                  <td colSpan={2}>{value.label}</td>
                  <td className="fw-bold text-end ">
                    {value.gia.toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    }) || ''}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        ''
      )}
      {isActive === true && content.loai === 'phà' ? (
        <div className="mt-4">
          <div>
            <h6 className="text-uppercase fw-bold ">hành khách</h6>
            <Table border className={clsx(styles.tablecustomer)}>
              <tbody>
                {content.giavehanhkhach.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td colSpan={2}>{value.label}</td>
                      <td className="fw-bold text-end ">
                        {value.gia.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        }) || ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div>
            <h6 className="text-uppercase fw-bold">Ô tô - xe máy </h6>
            <Table border className={clsx(styles.tablecustomer)}>
              <tbody>
                {content.giavexe.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td colSpan={2}>{value.label}</td>
                      <td className="fw-bold text-end ">
                        {value.gia.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        }) || ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div>
            <h6 className="text-uppercase fw-bold">XE TẢI </h6>
            <Table border className={clsx(styles.tablecustomer)}>
              <tbody>
                {content.giavexetai.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td colSpan={2}>{value.label}</td>
                      <td className="fw-bold text-end ">
                        {value.gia.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        }) || ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div>
            <h6 className="text-uppercase fw-bold">XE Container </h6>
            <Table border className={clsx(styles.tablecustomer)}>
              <tbody>
                {content.giavecontainer.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td colSpan={2}>{value.label}</td>
                      <td className="fw-bold text-end ">
                        {value.gia.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        }) || ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default AccordionItem;
