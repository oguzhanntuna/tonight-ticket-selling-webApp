import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import './EventTicketInfoSide.scss';

import * as CartActions from '../../store/actions/cart';
import { EventShowcaseEvent } from '../../models/eventShowcase/event';
import { FavoriteEvent } from '../../models/favoriteEvent/favoriteEvent';
import { CartEvent } from '../../models/cartEvent/cartEvent';
import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/eventShowcase';
import { IFavoriteEvent } from '../../models/interfaces/favoriteEvent/favoriteEvent';
import { ICartEvent } from '../../models/interfaces/cartEvent/cartEvent';
import { IPurchasedTicket } from '../../models/interfaces/purchasedTicket/purchasedTicket';

import detailIcon from '../../assets/icons/document-text-outline.svg';
import FavoriteIcon from '../favoriteIcon/favoriteIcon';
import deleteIcon from '../../assets/icons/delete.svg';
import { PurchasedTicket } from '../../models/purchasedTicket/purchasedTicket';

interface IEventTicketFrontSideProps {
    eventData: IEventShowcaseEvent | IFavoriteEvent | ICartEvent | IPurchasedTicket;
    toggleTicketSide: () => void;
}

const EventTicketFrontside = (props: IEventTicketFrontSideProps): JSX.Element => {
    const { eventData, toggleTicketSide } = props;
    const { removeEvent } = CartActions;
    
    const dispatch = useDispatch();
    const location = useLocation(); 
    const navigate = useNavigate();
    
    const goToEventDetail = (): void => {
        const { url } = eventData;
        let { pathname } = location;

        if (eventData instanceof EventShowcaseEvent || eventData instanceof FavoriteEvent || eventData instanceof CartEvent) {
            const { moduleType } = eventData;

            if (pathname === '/') {
                if (moduleType === 'this-week') {
                    pathname = 'this-week';
                }

                if (moduleType === 'recently-added') {
                    pathname = 'recently-added';
                }

                if (moduleType === 'buy-now') {
                    pathname = 'buy-now';
                }

                if (moduleType === 'favorites') {
                    pathname = 'favorites';
                }

                if (moduleType === 'cart') {
                    pathname = 'cart';
                }
            }
        }

        navigate(`${pathname}/${url}`);
    }

    return (
        <div className="eventTicketInfoSide">
            <div 
                className="eventTicketInfoSide-image" 
                style={{ backgroundImage: `url("${eventData.imageUrl}")` }} 
            />
            <div 
                className="eventTicketInfoSide-imageOverlay" 
                onClick={() => toggleTicketSide()} 
            />
            {
                !(eventData instanceof PurchasedTicket) &&
                <div 
                    className="eventTicketInfoSide-goToDetailIcon" 
                    onClick={() => goToEventDetail()}
                >
                    <img src={detailIcon} alt="detail icon" />
                </div>
            }
            {
                (eventData instanceof EventShowcaseEvent || eventData instanceof FavoriteEvent) &&
                <FavoriteIcon 
                    eventToBeLiked={eventData}
                    showFavoritesText={false} 
                />
            }
            {
                (eventData instanceof CartEvent) &&
                <div 
                    className="eventTicketInfoSide-removeEventButton" 
                    onClick={() => dispatch(removeEvent(eventData))}>
                      <img src={deleteIcon} alt="remove" />  
                </div>
            }
            <div 
                className="eventTicketInfoSide-content" 
                onClick={() => toggleTicketSide()}
            >
                <div className="eventTicketInfoSide-location">{eventData.location}</div>
                <div className="eventTicketInfoSide-date">{eventData.date}</div>
                <div className="eventTicketInfoSide-title">{eventData.title}</div>
            </div>
        </div>
    );
}

export default EventTicketFrontside;