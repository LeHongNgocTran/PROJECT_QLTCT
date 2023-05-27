import { useState } from 'react';
function StepToOther({ title1, title2, to = false, back = false }, props) {
  const [active, setActive] = useState({
    to: true,
    back: false,
  });
  //   const [luotdi, setLuotDi] = useState(true);
  //   const [luotve, setLuotVe] = useState(false);
  const handleluotdi = () => {
    setActive((e) => {
      e.to = true;
      e.back = false;
    });
    document.getElementById('luotdi').disabled = true;
  };
  const handleluotve = () => {
    setActive((e) => {
      e.to = false;
      e.back = to;
    });
    document.getElementById('luotve').disabled = true;
  };
  return (
    <div className="mt-4">
      <div className="d-flex flex-row">
        <p
          onClick={handleluotdi}
          id="luotdi"
          className={
            active.to === true
              ? 'bg-white me-2 text-uppercase border border-2 border-warning w-25 text-center py-1 shadow-sm fw-bold'
              : 'bg-warning me-2 text-uppercase border border-2 border-warning w-25 text-center py-1 shadow-sm fw-bold'
          }
          style={{ cursor: 'pointer' }}
        >
          {title1}
        </p>
        <p
          id="luotve"
          onClick={handleluotve}
          className={
            active.back === true
              ? 'bg-white me-2 text-uppercase border border-2 border-warning w-25 text-center py-1 shadow-sm fw-bold'
              : 'bg-warning me-2 text-uppercase border border-2 border-warning w-25 text-center py-1 shadow-sm fw-bold'
          }
          style={{ cursor: 'pointer' }}
        >
          {title2}
        </p>
      </div>
      {active.to === true && to === true && props.children}
      {active.back === true && back === true && props.children}
    </div>
  );
}

export default StepToOther;
