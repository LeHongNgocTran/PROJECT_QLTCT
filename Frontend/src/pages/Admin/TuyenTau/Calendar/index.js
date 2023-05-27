import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { Tau } from '~/service';
import moment from 'moment';
import Datetime from 'react-datetime';
import {
  Box,
  Breadcrumbs,
  Button,
  FormControlLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
  FormControl,
  FormLabel,
} from '@mui/material';
import { Add, ArrowBack, Close } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const style = {
  backgroundColor: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  outline: 0,
};

function CalendarTau() {
  const user = useSelector((state) => state.permission.users);
  const [show, setShow] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  const handleShowEvent = () => setShowEvent(!showEvent);

  const matau = useParams(null);
  const navigate = useNavigate();

  const [currentEvents, setCurrentEvents] = useState([]);
  const [Events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const matuyentau = sessionStorage.getItem('matuyentau');
  const [loaichuyen, setChuyen] = useState('');

  const [day, setDay] = useState({
    startTime: null,
    dayEnd: null,
    title: null,
  });

  const title = matau.matau;

  const handleDateClick = async (selected) => {
    if (user.permission === 1) {
      const calendarApi = selected.view.calendar;
      calendarApi.unselect();
      calendarApi.addEvent({
        id: title,
        data,
        start: selected.start,
        end: selected.end,
      });
      setShow(true);
      setDay({
        startTime: selected.start,
        endStart: selected.end,
        dayEnd: selected.endStr,
        title: selected.startStr,
      });
    } else {
      alert('Bạn không có quyền thực hiện chức năng này');
    }
  };

  const handleSubmit = async () => {
    if (loaichuyen === '') {
      alert('Vui lòng chọn loại chuyến');
    } else {
      await Tau.createTimeTau({
        loaichuyen: loaichuyen,
        matau: title,
        matuyentau: matuyentau,
        day: moment(day.startTime).format('L'),
        timeStart: moment(day.startTime).format('LT'),
        timeEnd: moment(day.endTime).format('LT'),
        dayEnd: day.dayEnd,
        title: day.title,
      });
      setShow(false);
      setRefresh((prev) => prev + 1);
    }
  };

  const handleEventClick = async (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`,
      )
    ) {
      await Tau.deleteTimeTau(selected.event.id);
      setRefresh((prev) => prev - 1);
      selected.event.remove();
    }
  };

  const handleUpdateEvent = async (selected) => {
    // console.log(selected);
    await Tau.updateTimeTauById({
      loaichuyen: loaichuyen,
      day: moment(selected.event.start).format('L'),
      timeStart: moment(selected.event.start).format('LT'),
      timeEnd: moment(selected.event.end).format('LT'),
      dayEnd: selected.event.endStr,
      title: selected.event.startStr,
      oldtitle: selected.oldEvent.startStr,
    });
    setRefresh((prev) => prev + 1);
    setShow(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const documents = await Tau.getAllTimeTauById(matau.matau, {
        matuyentau: matuyentau,
      });
      setCurrentEvents(documents);
    };
    fetchData().catch(console.error);
  }, [refresh]);

  useEffect(() => {
    setEvents(
      currentEvents.map((e) => ({
        id: e.title,
        title: e.loaichuyen + ' ' + matuyentau,
        start: e.title,
        end: e.dayEnd,
        allDay: 0,
      })),
    );
  }, [currentEvents]);

  return (
    <div className={clsx(styles.wrapper)}>
      <>
        <div
          className="bg-white d-flex flex-row m-0 text-center"
          style={{ height: '50px' }}
        >
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'gray',
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBack />
          </Button>
          <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: '13px' }}>
            <Link className="text-muted py-3 mb-3 " to="/">
              Home
            </Link>
            <Link className="text-muted py-3" to="/quanlytuyentau">
              Danh sách tuyến tàu
            </Link>
            <Link className="text-muted py-3" to="#">
              Chi tiết lịch trình
            </Link>
            <Link className="text-muted py-3" to="#">
              {matuyentau}
            </Link>
            <Typography color="text.primary"> {matau.matau}</Typography>
          </Breadcrumbs>
        </div>
        {user.permission === 1 && (
          <Button
            variant="contained"
            className="mt-3"
            onClick={() => {
              setShowEvent(true);
            }}
          >
            <Add /> Thêm lịch trình
          </Button>
        )}
      </>
      <div className="bg-white my-3 px-2 pt-3">
        <FullCalendar
          height="78vh"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={{
            left: 'today prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          initialView="timeGridWeek"
          editable={user.permission === 1 ? true : false}
          selectable={user.permission === 1 ? true : false}
          selectMirror={user.permission === 1 ? true : false}
          dayMaxEvents={true}
          select={user.permission === 1 && handleDateClick}
          eventClick={user.permission === 1 && handleEventClick}
          eventsSet={(events) => {
            setData(events);
          }}
          eventChange={user.permission === 1 && handleUpdateEvent}
          events={Events}
        />
      </div>
      <Modal
        open={show}
        onClose={handleShow}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            className="d-flex flex-row"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            <p className="flex-fill fw-bold text-uppercase mt-2">Chọn tuyến đi: </p>
            <Tooltip title="Đóng" onClick={handleShow}>
              <IconButton>
                <Close />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl className="d-flex flex-row ">
              <FormLabel id="demo-row-radio-buttons-group-label" className=" mt-2 me-3">
                Chọn tuyến đi:{' '}
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  onChange={(e) => setChuyen(e.target.value)}
                  value="Xuất phát"
                  control={<Radio />}
                  label="Xuất phát"
                />
                <FormControlLabel
                  onChange={(e) => setChuyen(e.target.value)}
                  value="Trở về"
                  control={<Radio />}
                  label="Trở về"
                />
                <FormControlLabel
                  value="disabled"
                  disabled
                  control={<Radio />}
                  label="other"
                />
              </RadioGroup>
            </FormControl>
          </Typography>
          <Typography
            className="d-flex  flex-row justify-content-end pt-2"
            id="modal-modal-footer"
            variant="h6"
            component="h2"
          >
            <Button
              variant="outlined"
              className="me-3"
              onClick={() => {
                handleEventClick();
                handleShow();
              }}
            >
              Đóng
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleSubmit();
                handleShow();
              }}
            >
              Lưu
            </Button>
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={showEvent}
        onClose={handleShowEvent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            className="d-flex flex-row"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            <h4 className="flex-fill fw-bold text-uppercase mt-2">Chọn tuyến đi: </h4>
            <Tooltip title="Đóng" onClick={handleShowEvent}>
              <IconButton>
                <Close />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl className="d-flex flex-row ">
              <FormLabel id="demo-row-radio-buttons-group-label" className=" mt-2 me-3">
                Chọn tuyến đi:{' '}
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  onChange={(e) => setChuyen(e.target.value)}
                  value="Xuất phát"
                  control={<Radio />}
                  label="Xuất phát"
                />
                <FormControlLabel
                  onChange={(e) => setChuyen(e.target.value)}
                  value="Trở về"
                  control={<Radio />}
                  label="Trở về"
                />
                <FormControlLabel
                  value="disabled"
                  disabled
                  control={<Radio />}
                  label="other"
                />
              </RadioGroup>
            </FormControl>
            <label className="text-muted mb-3">Thời gian khởi hành:</label>
            <Datetime
              className="mb-3"
              value={day.startTime}
              name="endTime"
              onChange={(e) =>
                setDay((prev) => ({
                  ...prev,
                  title: e,
                  startTime: new Date(e),
                }))
              }
            />
          </Typography>
          <Typography
            className="d-flex  flex-row justify-content-end pt-2"
            id="modal-modal-footer"
            variant="h6"
            component="h2"
          >
            <Button
              variant="outlined"
              className="me-3"
              onClick={() => {
                handleShowEvent();
              }}
            >
              Đóng
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                console.log(day);
                handleSubmit();
                handleShowEvent();
              }}
            >
              Lưu
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default CalendarTau;
