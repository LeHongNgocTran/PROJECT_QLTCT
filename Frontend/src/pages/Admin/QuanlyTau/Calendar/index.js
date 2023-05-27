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
import { Breadcrumbs, Button, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

function Calendar() {
  const { id } = useParams(null);

  const navigate = useNavigate();

  const [currentEvents, setCurrentEvents] = useState([]);
  const [Events, setEvents] = useState([]);
  const [data, setData] = useState([]);

  var event = [];
  useEffect(() => {
    const fetchData = async () => {
      var col = '';
      const documents = await Tau.getAllTimeTauById(id, {});
      documents.forEach((value, index) => {
        if (value.matuyentau === 'MTTHTPQ01') {
          col = '#00c0ef';
        } else if (value.matuyentau === 'MTTRGND02') {
          col = '#dd4b39';
        } else if (value.matuyentau === 'MTTRGLS03') {
          col = '#f39c12';
        } else if (value.matuyentau === 'MTTSTCD04') {
          col = '#f32c13';
        } else {
          col = '#dd4b39';
        }
        event.push({
          value,
          backgroundColor: col,
        });
      });
      setCurrentEvents(event);
      // console.log(currentEvents);
    };
    fetchData().catch(console.error);
  }, []);
  useEffect(() => {
    setEvents(
      currentEvents.map((e) => ({
        title: e.value.matuyentau,
        start: e.value.title,
        end: e.value.dayEnd,
        allDay: 0,
        color: e.backgroundColor,
      })),
    );
  }, [currentEvents]);
  return (
    <div className={clsx(styles.wrapper)}>
      <div className="container-fluid ">
        <div
          className="bg-white d-flex flex-row m-0 text-center border-bottom "
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
            <Link className="text-muted py-3" to="/quanlytau">
              Danh sách tàu
            </Link>
            <Link className="text-muted py-3" to="#">
              Chi tiết tàu
            </Link>
            <Link className="text-muted py-3" to="#">
              Lịch trình tàu
            </Link>
            <Typography color="text.primary"> {id}</Typography>
          </Breadcrumbs>
        </div>

        <div className="bg-white pt-4 px-1 mt-3">
          <FullCalendar
            height="78vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: 'today prev,next',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            initialView="timeGridWeek"
            dayMaxEvents={true}
            eventsSet={(events) => {
              setData(events);
            }}
            eventColor="#378006"
            events={Events}
          />
        </div>
      </div>
    </div>
  );
}
export default Calendar;
