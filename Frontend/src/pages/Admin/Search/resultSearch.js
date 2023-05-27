import clsx from 'clsx';
import styles from './resultSearch.module.scss';

import { useState } from 'react';

import { Box, Step, StepLabel, Stepper } from '@mui/material';

import { Fragment } from 'react';
import Payment from './ThongTinHanhTrinh';
import TableInfor from './TableInfor/index';
import SeatOfShip from './SeatOfShip/index';

function ResultSearch({ result, quantity }) {
  const steps = ['Kết quả tìm kiếm', 'Chọn ghế ngồi', 'Điều khoản'];

  const [info, setInfo] = useState({});

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
  // console.log(info);
  const content = [
    <TableInfor next={handleNext} result={result} data={info} setData={setInfo} />,
    <SeatOfShip
      prev={handleBack}
      next={handleNext}
      data={info}
      thongtinhanhkhach={result.data.thongtinhanhkhach}
    />,
  ];

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
              <Payment
                next={handleNext}
                prev={handleBack}
                thongtinhanhkhach={result.data.thongtinhanhkhach}
                setData={setInfo}
                data={result}
                inforTau={info}
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
