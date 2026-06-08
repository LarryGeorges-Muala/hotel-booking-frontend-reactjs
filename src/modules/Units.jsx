import React, { useState } from 'react';
import Button from './components/Button';
import Modal from './components/Modal';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function Units (props) {

  const [toggleSlideShowModal, setToggleSlideShowModal] = useState('hide-modal');
  const [toggleSlideShowId, setToggleSlideShowId] = useState('');
  const [toggleSlideShowHeader, setToggleSlideShowHeader] = useState('');
  const [toggleSlideShowImages, setToggleSlideShowImages] = useState([]);

  function PrepCalendar(calendar) {
    let preppedCalendar = [];
    calendar.forEach(
      entry => {
        preppedCalendar.push(new Date(entry));
      }
    );
    return preppedCalendar;
  }

  function GenerateSlideShow(album) {
    return (
      <div>
        <Slide>
          {album.map((item) => (
          <div className='unit-slide-effect'>
            <div className='unit-img-container' style={{ 'backgroundImage': `url(${item.image})` }}>
            </div>
            <div className='unit-img-text-container'>
              <span className='unit-img-text-holder'>{item.name}</span>
            </div>
            <div className='unit-img-text-container'>
              <span className='unit-img-text-holder'>{item.description}</span>
            </div>
            <div className='unit-img-text-container'>
              <span className='unit-img-text-holder'>{item.category}</span>
            </div>
          </div>
              )
            )
          }
        </Slide>
      </div>
    );
  }

  return (
    <div className='section-group-container'>
      {props.units.map((item) => (
        <div key={item.id} className='unit-responsive'>
          <div className='unit-gallery'>
            <img
              className='unit-image'
              src={item.thumbnail}
              alt={item.name}
              onClick={
                () => {
                  setToggleSlideShowModal('show-modal');
                  setToggleSlideShowId(item.id);
                  setToggleSlideShowHeader(item.name);
                  setToggleSlideShowImages(item.album);
                }
              }
            />
            <div className='unit-description'>
              <span className='unit-description-name'>
                {item.name}
              </span>
              <span className='unit-description-type'>
                {item.type}
              </span>
              <span className='unit-description-rooms'>
                {item.number_of_rooms} <i className='fa fa-bed'></i> 
              </span>
              <span className='unit-description-bathrooms'>
                {item.number_of_bathrooms} <i className='fa fa-bath'></i> 
              </span>
              <span className='unit-description-occupancy'>
                {item.occupancy} <i className='fa fa-group'></i> 
              </span>
              <span className='unit-description-price'>
                <i className='fa fa-dollar'></i> {item.price} <i className='fa fa-moon-o'></i>
              </span>
              <span className='unit-description-price-breakfast'>
                <i className='fa fa-dollar'></i> {item.breakfast_price} <i className='fa fa-coffee'></i>
              </span>
            </div>
            {/* Booking Button */}
            <Button
              type='button'
              text='Book'
              className='modal-component-button'
              divClassName='modal-component-inline'
              onClick={
                () => {
                  props.setSelectedUnitId(item.id);
                  props.setSelectedUnitName(item.name);
                  props.setSelectedUnitType(item.type);
                  props.setSelectedUnitPrice(item.price);
                  props.setSelectedUnitBreakfastOption(item.breakfast);
                  props.setSelectedUnitBreakfastPrice(item.breakfast_price);
                  props.setSelectedUnitNextAvailable(item.next_available);
                  props.setBlockedCalendarEntries(
                    PrepCalendar(item.calendar)
                  );
                }
              }
            />
            {/* End Booking Button */}
          </div>
        </div>
      ))}
      {/* Modal Carousel */}
      <Modal
        id={toggleSlideShowId}
        header={toggleSlideShowHeader}
        modalErrorMessage=''
        toggleModal={toggleSlideShowModal}
        HideModalFunction={() => {setToggleSlideShowModal('hide-modal');}}
      >
        { GenerateSlideShow(toggleSlideShowImages) }
      </Modal>
      {/* End Modal Carousel */}
    </div>
  );
}

export default Units;
