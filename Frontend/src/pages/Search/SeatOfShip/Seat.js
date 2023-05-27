import clsx from 'clsx';
import styles from './index.module.scss';
function Seats(props) {
  return (
    <div className={clsx(styles.section)}>
      {props.values.map((seat) => {
        const isSold = props.seatSold.includes(seat);
        const isBooked = props.bookedSeats.includes(seat);
        let seatClass;
        if (isSold) seatClass = styles.sold;
        if (isBooked) seatClass = styles.selected;

        return (
          <div
            key={seat}
            className={clsx(styles.seat, seatClass)}
            onClick={props.addSeat}
          >
            {seat}
          </div>
        );
      })}
    </div>
  );
}

export default Seats;
