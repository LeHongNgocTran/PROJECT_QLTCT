import clsx from 'clsx';
import styles from './resultSearch.module.scss';

import { useState } from 'react';

import DetailsInfor from './DetailsInforUser/DetailsInforUser';
import { Box, Step, StepLabel, Stepper } from '@mui/material';

import { Fragment } from 'react';
import Payment from './ThongTinHanhTrinh';
import InforUser from './inforUser/inforUser1';
import TableInfor from './TableInfor/index';
import SeatOfShip from './SeatOfShip/index';

import PaymentProperty from './Payment/payment';
import { useSelector } from 'react-redux';

function ResultSearch({ result, quantity }) {
  const user = useSelector((state) => state.permission);

  const steps = [
    'Kết quả tìm kiếm',
    'Thông tin người đặt vé',
    'Thông tin khách hàng',
    'Chọn ghế ngồi',
    'Điều khoản',
    'Hoàn thành',
  ];

  const [infor, setInfor] = useState({
    loaive: result.active ? 'Khứ hồi' : 'Một chiều',
    tennguoidatve: '',
    sodienthoai: '',
    email: '',
    check: false,
    tongtien: 0,
  });

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [thongtinhanhkhach, setThongTinHanhKhach] = useState([]);

  const callBackFunction = (childData) => {
    setThongTinHanhKhach(childData);
  };

  // console.log(result);

  const content = [
    <TableInfor next={handleNext} result={result} data={infor} setData={setInfor} />,
    <InforUser prev={handleBack} next={handleNext} data={infor} setData={setInfor} />,
    <DetailsInfor
      data={infor}
      parentCallback={callBackFunction}
      thongtin={thongtinhanhkhach}
      quantity={quantity}
      next={handleNext}
      prev={handleBack}
    />,
    <SeatOfShip
      prev={handleBack}
      next={handleNext}
      data={infor}
      thongtinhanhkhach={thongtinhanhkhach}
    />,
    <Payment
      next={handleNext}
      prev={handleBack}
      result={result}
      thongtinhanhkhach={thongtinhanhkhach}
      setData={setInfor}
      data={infor}
    />,
  ];
  // console.log(data.tennguoi datve);

  return (
    <div className={clsx(styles.wrapper)}>
      <div id="container__result--search">
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length - 1 ? (
            <Fragment>
              <PaymentProperty
                setData={setInfor}
                infor={infor}
                prev={handleBack}
                thongtinhanhkhach={thongtinhanhkhach}
              />
            </Fragment>
          ) : (
            <Fragment>
              <div className="mt-3">{content[activeStep]}</div>
            </Fragment>
          )}
        </Box>
      </div>
    </div>
  );
}

export default ResultSearch;
