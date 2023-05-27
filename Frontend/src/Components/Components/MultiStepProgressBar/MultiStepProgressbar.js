import 'react-step-progress-bar/styles.css';
import clsx from 'clsx';
import styles from './MultiStepProgressbar.module.scss';
import { ProgressBar, Step } from 'react-step-progress-bar';

function StepProgressBar(props) {
  return (
    <ProgressBar
      percent={((props.step - 1) * 100) / 4}
      filledBackground="#ffc93c"
      unfilledBackground="black"
    >
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={accomplished ? clsx(styles.completed) : clsx(styles.step)}>
            1
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={accomplished ? clsx(styles.completed) : clsx(styles.step)}>
            2
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={accomplished ? clsx(styles.completed) : clsx(styles.step)}>
            3
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={accomplished ? clsx(styles.completed) : clsx(styles.step)}>
            4
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={accomplished ? clsx(styles.completed) : clsx(styles.step)}>
            5
          </div>
        )}
      </Step>
    </ProgressBar>
  );
}

export default StepProgressBar;
