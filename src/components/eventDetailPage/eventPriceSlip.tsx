import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';
import './eventPriceSlip.scss';

import EventTicketPriceRow from '../eventTicket/EventTicketPriceRow';

interface IEventPriceSlip {
    data: IEventShowcaseEvent;
}

const EventPriceSlip = (props: IEventPriceSlip): JSX.Element => {
    const { data: { id, title, normalTicket, vipTicket, totalPrice } } = props;

    return (
        <div className="eventPriceSlip">
            <div className="eventPriceSlip-eventTitle">
                {title}
            </div>
            <div className="eventPriceSlip-content">
                <EventTicketPriceRow 
                    ticketData={normalTicket}
                    eventId={id}
                />
                <EventTicketPriceRow 
                    ticketData={vipTicket}
                    eventId={id}
                />
            </div>
            <div className="eventPriceSlip-totalPriceContainer">
                <span className="eventPriceSlip-text">Total:</span>
                <span className="eventPriceSlip-price">{`${totalPrice}$`}</span>
            </div>
            <button 
                className={`
                    eventPriceSlip-buyNowButton 
                    ${totalPrice <= 0 ? 'eventPriceSlip-buyNowButton--disabled' : ''
                }`}
                onClick={() => console.log('clicked')}
                disabled={totalPrice <= 0}
            >
                Buy Now
            </button>
        </div>
    );
}

export default EventPriceSlip;